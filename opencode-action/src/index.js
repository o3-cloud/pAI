const core = require('@actions/core');
const github = require('@actions/github');
const { OpenAI } = require('openai');

/**
 * Main entry point for the @opencode GitHub Action
 */
async function run() {
  try {
    // Get inputs
    const apiKey = core.getInput('api_key', { required: true });
    const model = core.getInput('model') || 'gpt-4';
    const provider = core.getInput('provider') || 'openai';
    const maxTurns = parseInt(core.getInput('max_turns') || '3');
    const triggerPhrase = core.getInput('trigger_phrase') || '@opencode';
    const allowedTools = core.getInput('allowed_tools').split(',').map(tool => tool.trim());
    const githubToken = core.getInput('github_token', { required: true });

    // Initialize GitHub API client
    const octokit = github.getOctokit(githubToken);
    const context = github.context;

    core.info(`OpenCode Action triggered by ${context.eventName}`);
    core.info(`Repository: ${context.repo.owner}/${context.repo.repo}`);

    // Check if this event should trigger the action
    if (!shouldTrigger(context, triggerPhrase)) {
      core.info('Event does not contain trigger phrase, skipping');
      return;
    }

    // Initialize AI provider (MVP: OpenAI only)
    const aiProvider = await initializeAIProvider(provider, apiKey, model);
    
    // Process the request
    const processor = new OpenCodeProcessor(octokit, aiProvider, context, {
      maxTurns,
      allowedTools,
      triggerPhrase
    });

    await processor.process();

    core.setOutput('status', 'success');
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
    core.error(error.stack);
  }
}

/**
 * Check if the current event should trigger the action
 */
function shouldTrigger(context, triggerPhrase) {
  const { eventName, payload } = context;
  
  switch (eventName) {
    case 'issue_comment':
      return payload.comment?.body?.includes(triggerPhrase);
    case 'pull_request_review_comment':
      return payload.comment?.body?.includes(triggerPhrase);
    case 'pull_request_review':
      return payload.review?.body?.includes(triggerPhrase);
    case 'issues':
      return payload.issue?.body?.includes(triggerPhrase) || 
             payload.issue?.title?.includes(triggerPhrase);
    case 'pull_request':
      return payload.pull_request?.body?.includes(triggerPhrase);
    default:
      return false;
  }
}

/**
 * Initialize AI provider
 */
async function initializeAIProvider(provider, apiKey, model) {
  switch (provider.toLowerCase()) {
    case 'openai':
      return new OpenAI({
        apiKey: apiKey
      });
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

/**
 * Main processor for OpenCode requests
 */
class OpenCodeProcessor {
  constructor(octokit, aiProvider, context, config) {
    this.octokit = octokit;
    this.aiProvider = aiProvider;
    this.context = context;
    this.config = config;
    this.commentId = null;
    this.turnCount = 0;
  }

  async process() {
    try {
      // Create initial comment with spinner
      await this.createInitialComment();
      
      // Analyze the request context
      const contextData = await this.gatherContext();
      
      // Generate AI response
      const aiResponse = await this.generateAIResponse(contextData);
      
      // Update comment with response
      await this.updateComment(aiResponse);
      
    } catch (error) {
      await this.updateCommentWithError(error);
      throw error;
    }
  }

  async createInitialComment() {
    const initialBody = this.generateInitialComment();
    
    const response = await this.octokit.rest.issues.createComment({
      owner: this.context.repo.owner,
      repo: this.context.repo.repo,
      issue_number: this.getIssueNumber(),
      body: initialBody
    });
    
    this.commentId = response.data.id;
    core.setOutput('comment_id', this.commentId);
  }

  generateInitialComment() {
    return `### @opencode is analyzing your request <img src="https://github.com/user-attachments/assets/5ac382c7-e004-429b-8e35-7feb3e8f9c6f" width="14px" height="14px" style="vertical-align: middle; margin-left: 4px;" />

#### Progress:
- [x] Request received
- [ ] Analyzing context
- [ ] Generating response
- [ ] Complete

*Powered by ${this.config.model || 'AI'} via OpenCode*`;
  }

  async gatherContext() {
    const { eventName, payload } = this.context;
    const contextData = {
      eventType: eventName,
      repository: `${this.context.repo.owner}/${this.context.repo.repo}`,
      timestamp: new Date().toISOString()
    };

    switch (eventName) {
      case 'issue_comment':
        contextData.type = 'issue_comment';
        contextData.issue = payload.issue;
        contextData.comment = payload.comment;
        contextData.userRequest = this.extractUserRequest(payload.comment.body);
        break;
        
      case 'pull_request_review_comment':
        contextData.type = 'pr_review_comment';
        contextData.pullRequest = payload.pull_request;
        contextData.comment = payload.comment;
        contextData.userRequest = this.extractUserRequest(payload.comment.body);
        
        // Get PR diff for context
        try {
          const diff = await this.octokit.rest.pulls.get({
            owner: this.context.repo.owner,
            repo: this.context.repo.repo,
            pull_number: payload.pull_request.number,
            mediaType: {
              format: 'diff'
            }
          });
          contextData.diff = diff.data;
        } catch (error) {
          core.warning(`Could not fetch PR diff: ${error.message}`);
        }
        break;
        
      case 'issues':
        contextData.type = 'issue';
        contextData.issue = payload.issue;
        contextData.userRequest = this.extractUserRequest(payload.issue.body);
        break;
        
      case 'pull_request':
        contextData.type = 'pull_request';
        contextData.pullRequest = payload.pull_request;
        contextData.userRequest = this.extractUserRequest(payload.pull_request.body);
        break;
    }

    return contextData;
  }

  extractUserRequest(text) {
    if (!text) return '';
    
    // Find the trigger phrase and extract everything after it
    const triggerIndex = text.indexOf(this.config.triggerPhrase);
    if (triggerIndex === -1) return text;
    
    return text.substring(triggerIndex + this.config.triggerPhrase.length).trim();
  }

  async generateAIResponse(contextData) {
    await this.updateProgressStep('Analyzing context', 'Generating response');
    
    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildUserPrompt(contextData);
    
    try {
      const completion = await this.aiProvider.chat.completions.create({
        model: this.config.model || 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 2000,
        temperature: 0.7
      });
      
      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error(`AI provider error: ${error.message}`);
    }
  }

  buildSystemPrompt() {
    return `You are @opencode, an AI assistant for GitHub repositories. You help with:
- Code reviews and suggestions
- Bug analysis and fixes
- Feature implementation guidance
- Documentation improvements
- General development questions

Guidelines:
- Be helpful, concise, and actionable
- Reference specific code lines when relevant
- Suggest concrete improvements
- Consider security and best practices
- Adapt your response to the context (issue, PR, comment)

Available tools: ${this.config.allowedTools.join(', ')}
Repository: ${this.context.repo.owner}/${this.context.repo.repo}`;
  }

  buildUserPrompt(contextData) {
    let prompt = `Context Type: ${contextData.type}\n`;
    prompt += `Repository: ${contextData.repository}\n`;
    prompt += `User Request: ${contextData.userRequest}\n\n`;

    if (contextData.issue) {
      prompt += `Issue Title: ${contextData.issue.title}\n`;
      prompt += `Issue Body: ${contextData.issue.body}\n`;
    }

    if (contextData.pullRequest) {
      prompt += `PR Title: ${contextData.pullRequest.title}\n`;
      prompt += `PR Body: ${contextData.pullRequest.body}\n`;
    }

    if (contextData.diff) {
      prompt += `\nPR Diff:\n${contextData.diff.substring(0, 5000)}${contextData.diff.length > 5000 ? '...' : ''}\n`;
    }

    if (contextData.comment && contextData.comment.body !== contextData.userRequest) {
      prompt += `\nOriginal Comment: ${contextData.comment.body}\n`;
    }

    prompt += '\nPlease provide a helpful response based on this context.';
    
    return prompt;
  }

  async updateProgressStep(completedStep, nextStep) {
    const body = `### @opencode is analyzing your request <img src="https://github.com/user-attachments/assets/5ac382c7-e004-429b-8e35-7feb3e8f9c6f" width="14px" height="14px" style="vertical-align: middle; margin-left: 4px;" />

#### Progress:
- [x] Request received
- [x] ${completedStep}
- [ ] ${nextStep}
- [ ] Complete

*Powered by ${this.config.model || 'AI'} via OpenCode*`;

    await this.octokit.rest.issues.updateComment({
      owner: this.context.repo.owner,
      repo: this.context.repo.repo,
      comment_id: this.commentId,
      body: body
    });
  }

  async updateComment(aiResponse) {
    const body = `### @opencode Response

${aiResponse}

---
*Powered by ${this.config.model || 'AI'} via OpenCode* | [Report Issue](https://github.com/o3-cloud/pAI/issues)`;

    await this.octokit.rest.issues.updateComment({
      owner: this.context.repo.owner,
      repo: this.context.repo.repo,
      comment_id: this.commentId,
      body: body
    });
  }

  async updateCommentWithError(error) {
    const body = `### @opencode Error

I encountered an error while processing your request:

\`\`\`
${error.message}
\`\`\`

Please try again or [report this issue](https://github.com/o3-cloud/pAI/issues).

---
*Powered by OpenCode*`;

    try {
      await this.octokit.rest.issues.updateComment({
        owner: this.context.repo.owner,
        repo: this.context.repo.repo,
        comment_id: this.commentId,
        body: body
      });
    } catch (updateError) {
      core.error(`Failed to update comment with error: ${updateError.message}`);
    }
  }

  getIssueNumber() {
    const { eventName, payload } = this.context;
    
    switch (eventName) {
      case 'issues':
      case 'issue_comment':
        return payload.issue.number;
      case 'pull_request':
      case 'pull_request_review':
      case 'pull_request_review_comment':
        return payload.pull_request.number;
      default:
        throw new Error(`Unsupported event type: ${eventName}`);
    }
  }
}

// Run the action
run();