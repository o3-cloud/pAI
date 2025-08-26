# GitHub Actions Agents: Claude Code, Gemini, and Opencode

## Overview

GitHub Actions agents are autonomous CLI-based AI developers that run within your CI/CD pipeline. They provide an alternative to cloud-hosted SaaS products, offering greater control, flexibility, and model choice while operating asynchronously within your repository workflows.

These agents can:
- Analyze and understand code repositories
- Implement fixes for issues and bugs
- Refactor code based on specifications
- Add new features and functionality
- Review pull requests and provide feedback
- Answer questions about codebases
- Run tests and verify implementations

## Available Agents

### 1. Claude Code
**Provider**: Anthropic  
**Best For**: Polished user experience, real-time progress tracking  
**Trigger**: `@claude`

### 2. Gemini CLI
**Provider**: Google  
**Best For**: High-quality output with optional PR review features  
**Trigger**: `@gemini-cli`

### 3. opencode
**Provider**: Multi-provider (OpenAI, OpenRouter, Groq, etc.)  
**Best For**: Maximum flexibility with model and provider choice  
**Trigger**: `/oc` or `/opencode`

## Quick Setup Comparison

| Agent | Setup Experience | Model Options | User Identity | Key Strength |
|-------|------------------|---------------|---------------|--------------|
| Claude Code | Automated (`/install-github-app`) | Anthropic only | Dedicated "claude" user | Most polished UX |
| Gemini CLI | Manual (`/setup-github`) | Google only | github-actions bot | Optional PR reviews |
| opencode | Interactive (`opencode github install`) | Any model/provider | "opencode-agent" user | Ultimate flexibility |

---

## Claude Code Setup

### Installation
1. Run `/install-github-app` in Claude Code locally
2. This opens a browser window for GitHub App installation
3. Authorize the Claude GitHub App on your repository
4. Claude automatically creates a pull request with necessary workflow files
5. Review and merge the PR to complete setup

### Configuration

```yaml
name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
  pull_request_review:
    types: [submitted]
  pull_request:
    types: [opened]

jobs:
  claude:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review' && contains(github.event.review.body, '@claude')) ||
      (github.event_name == 'issues' && (contains(github.event.issue.body, '@claude') || contains(github.event.issue.title, '@claude'))) ||
      (github.event_name == 'pull_request' && (github.event.action == 'opened' || contains(github.event.pull_request.body, '@claude')))
    runs-on: ubuntu-latest
    permissions: write-all
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Claude Code
        uses: anthropics/claude-code-action@beta
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          github_token: ${{ secrets.GH_PAT }}
          allowed_tools: Bash
```

### Required Secrets
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `GH_PAT`: GitHub Personal Access Token with appropriate permissions

### Key Features
- Real-time progress tracking with interactive todo lists
- Automated workflow file creation during setup
- Dedicated "claude" user for all contributions
- Excellent error handling and debugging information

### Usage Examples
```
# In issue comments or descriptions
@claude please implement user authentication
@claude review this pull request for security issues
@claude fix the failing tests in the CI pipeline
```

---

## Gemini CLI Setup

### Installation
1. Run `/setup-github` command in Gemini CLI locally
2. This generates the workflow `.yml` file locally
3. Manually commit and push the workflow file to GitHub
4. Configure repository secrets for API keys

### Configuration (Simplified)

```yaml
name: '💬 Gemini CLI'

on:
  pull_request_review_comment:
    types: ['created']
  pull_request_review:
    types: ['submitted']
  issue_comment:
    types: ['created']

permissions:
  contents: 'write'
  id-token: 'write'
  pull-requests: 'write'
  issues: 'write'

jobs:
  gemini-cli:
    if: |
      contains(github.event.comment.body, '@gemini-cli') &&
      !contains(github.event.comment.body, '@gemini-cli /review') &&
      !contains(github.event.comment.body, '@gemini-cli /triage')
    runs-on: 'ubuntu-latest'
    steps:
      - name: 'Run Gemini'
        uses: 'google-github-actions/run-gemini-cli@v0'
        with:
          gemini_api_key: '${{ secrets.GEMINI_API_KEY }}'
```

### Required Secrets
- `GEMINI_API_KEY`: Your Google AI API key
- Additional GCP configuration may be required depending on setup

### Key Features
- High-quality output with comprehensive analysis
- Optional PR review workflow included
- Complex trusted user verification logic for security
- Currently in beta with improvements expected

### Usage Examples
```
# In issue comments
@gemini-cli implement the shopping cart feature
@gemini-cli analyze the performance bottleneck in this code
@gemini-cli suggest improvements for this architecture
```

---

## opencode Setup

### Installation
1. Run `opencode github install` command locally
2. Interactive CLI prompts you to choose:
   - Provider (OpenAI, OpenRouter, Groq, etc.)
   - Specific model (GPT-5, Claude, Qwen3 Coder, etc.)
3. Generates customized workflow `.yml` file locally
4. Commit and push the generated file
5. Configure repository secrets for chosen provider

### Configuration Example

```yaml
name: opencode

on:
  issue_comment:
    types: [created]

jobs:
  opencode:
    if: |
      contains(github.event.comment.body, ' /oc') ||
      startsWith(github.event.comment.body, '/oc') ||
      contains(github.event.comment.body, ' /opencode') ||
      startsWith(github.event.comment.body, '/opencode')
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run opencode
        uses: sst/opencode/github@latest
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        with:
          model: openai/gpt-5
```

### Required Secrets
Variable based on chosen provider:
- `OPENAI_API_KEY`: For OpenAI models
- `ANTHROPIC_API_KEY`: For Claude models
- `GROQ_API_KEY`: For Groq models
- And others depending on provider selection

### Key Features
- Outstanding flexibility with any model from any provider
- Clean, structured log output with web viewer
- Fast performance with optimized models
- Open source with transparent development
- Dedicated "opencode-agent" user identity

### Usage Examples
```
# At start of comment or within
/oc please refactor this component to use hooks
/opencode add comprehensive error handling
/oc review this pull request and suggest optimizations
```

---

## Best Practices

### Security Considerations
1. **API Keys**: Always store as encrypted repository secrets
2. **Permissions**: Use granular permissions where possible
3. **User Verification**: Implement trusted user patterns for public repos
4. **Branch Protection**: Don't allow agents to commit directly to main

### Effective Usage Patterns
1. **Be Specific**: Provide clear, detailed requests in comments
2. **Context Matters**: Include relevant background information
3. **Monitor Progress**: Watch for progress updates and job run links
4. **Iterative Refinement**: Comment on PRs to request fixes or improvements

### Workflow Design
```yaml
# Add concurrency control to prevent overlapping runs
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

# Set reasonable timeouts
jobs:
  agent:
    timeout-minutes: 30
```

### Trigger Patterns
- **Claude Code**: Use `@claude` in comments, issues, or PR descriptions
- **Gemini CLI**: Use `@gemini-cli` in comments (excludes review/triage commands)  
- **opencode**: Use `/oc` or `/opencode` at start or within comments

---

## Decision Framework

### Choose Claude Code when:
- You want the most polished, automated setup experience
- Real-time progress feedback is important
- You're comfortable with Anthropic models only
- You need excellent error handling and debugging

### Choose Gemini CLI when:
- You want high-quality output from Google's models
- PR review automation is valuable
- You can handle more manual setup
- Beta features and improvements are acceptable

### Choose opencode when:
- Model and provider flexibility is critical
- You want fast performance with optimized models
- Open source transparency is important
- You need the best cost optimization through model choice

---

## Integration with pAI System

These GitHub Actions agents complement the existing pAI architecture by providing:

1. **On-Demand Development**: Unlike scheduled agents, these respond to immediate needs
2. **Interactive Workflows**: Enable real-time collaboration within GitHub
3. **Code Quality Assurance**: Automated reviews and improvements
4. **Knowledge Transfer**: Document decisions and rationale in commits

### Recommended Workflow
1. Use scheduled pAI agents for regular maintenance and monitoring
2. Trigger GitHub Actions agents for specific development tasks
3. Combine both for comprehensive automation coverage

### Example Integration
```yaml
# Existing scheduled agent
- cron: "0 8,11,19 * * *"  # Gmail curator runs 3x daily

# Add GitHub Actions agent for code work
on:
  issue_comment:
    types: [created]
# Agent responds to @claude mentions for development tasks
```

---

## Troubleshooting

### Common Issues

**Setup Problems**:
- Verify API keys are correctly stored in repository secrets
- Check workflow file syntax and indentation
- Ensure proper repository permissions for the chosen agent

**Execution Issues**:
- Monitor GitHub Actions logs for detailed error information
- Check API rate limits and quotas
- Verify trigger patterns match your comment format

**Performance Concerns**:
- Claude Code: ~15 minutes typical execution
- opencode with fast models: few minutes
- Gemini CLI: varies based on complexity

### Getting Help
- Claude Code: Use the built-in help system or GitHub issues
- Gemini CLI: Check Google's documentation and beta feedback channels
- opencode: Visit the open source repository for community support

---

## Cost Optimization

### Model Selection Strategy
1. **Development/Testing**: Use faster, cheaper models (GPT-4o-mini, Claude Haiku)
2. **Complex Features**: Upgrade to premium models (GPT-5, Claude Opus)
3. **Code Reviews**: Balance quality needs with cost constraints

### Usage Patterns
- Be specific in requests to minimize token usage
- Use agents for appropriate complexity levels
- Monitor API usage through provider dashboards

### Provider Comparison
- **OpenAI**: Wide model selection, competitive pricing
- **Anthropic**: Excellent code understanding, higher cost
- **Google**: Good balance of cost and capability
- **Others**: Specialized models for specific use cases

This framework provides flexible, powerful automation that scales from personal projects to enterprise development workflows.