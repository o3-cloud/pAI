# GitHub Automation Agent

An intelligent GitHub automation agent that handles repository management tasks including issue triage, pull request reviews, and repository health monitoring using Google's Gemini AI model.

## Purpose

This agent automates GitHub repository management for the pAI system by:

- **Issue Triage**: Automatically categorizes and labels new issues based on content analysis
- **Pull Request Review**: Provides comprehensive code reviews with security and quality insights  
- **Repository Health**: Monitors repository metrics and identifies maintenance opportunities

## Architecture

- **Model**: Google Gemini 1.5 Pro for advanced reasoning and code analysis
- **MCP Integration**: Uses GitHub MCP server for repository interactions
- **Triggering**: GitHub Actions workflows respond to repository events and schedules
- **Context**: Leverages @Work/ME.md for professional context and preferences

## Capabilities

### Issue Triage
- Analyzes issue content and applies appropriate labels
- Assesses priority based on impact and urgency
- Identifies component areas and required expertise
- Flags issues needing human attention

### Pull Request Review  
- Security analysis for credentials, vulnerabilities, and best practices
- Code quality assessment for maintainability and readability
- FastAgent pattern validation for pAI agent consistency
- Docker and MCP configuration reviews

### Repository Health
- Agent structure validation (Agentfile, Taskfile.yml, ME.md)
- Documentation coverage analysis  
- Workflow efficiency assessment
- Technical debt identification

## Usage

### Local Development
```bash
# Navigate to the agent directory
cd @Work/github-automation-agent

# Generate prompt from context
task prompt

# Run the agent locally
task agent

# Complete workflow
task run
```

### GitHub Integration
The agent is triggered automatically via GitHub Actions workflows:
- `gemini-issue-triage.yml`: Runs on issue events and hourly schedule
- `gemini-pr-review.yml`: Runs on pull request events  
- `gemini-repository-health.yml`: Runs daily for health monitoring

### Manual Triggers
- Comment `@gemini-cli /triage` on issues for manual triage
- Comment `@gemini-cli /review` on PRs for detailed code review
- Use workflow dispatch for on-demand repository health checks

## Configuration

### Required Secrets
- `GEMINI_API_KEY`: Google AI Studio API key for Gemini access
- `GITHUB_TOKEN`: GitHub token with repository permissions

### Agent Configuration
The agent uses the @Work/ME.md context file for:
- Professional preferences and coding standards
- Team workflow patterns and review criteria
- Communication style and feedback preferences  
- Technical expertise and focus areas

## Integration with pAI System

This agent complements the existing Claude Code integration by:
- **Specialization**: Handles systematic GitHub operations while Claude focuses on creative/complex tasks
- **Automation**: Provides continuous repository monitoring vs. on-demand assistance  
- **Model Diversity**: Leverages Gemini's strengths in code analysis and systematic review

## Monitoring

The agent provides:
- **Health Metrics**: Repository health scores and trend analysis
- **Action Logs**: Detailed logs of all automated actions taken
- **Issue Creation**: Automatic issue creation for critical findings
- **Progress Tracking**: Updates on triage and review completion

## Examples

### Issue Labeling
The agent automatically applies labels like:
- `bug`, `enhancement`, `documentation`, `question`
- `priority/high`, `priority/medium`, `priority/low`  
- `agent`, `workflow`, `infrastructure`, `mcp`, `docker`
- `@home`, `@work`, `github-actions`

### PR Review Feedback
Provides structured reviews with:
- 🔴 Critical security and breaking change issues
- 🟠 High priority code quality and pattern violations
- 🟡 Medium priority improvements and optimizations
- 🟢 Low priority style and refactoring suggestions

### Repository Health Reports
Generates comprehensive health reports including:
- Agent structure compliance across @Home and @Work contexts
- Docker image and dependency freshness
- Documentation coverage and accuracy
- Workflow efficiency and automation opportunities