# OpenCode AI Assistant Action

AI-powered assistant for GitHub Issues and Pull Requests with multi-provider support.

## Overview

OpenCode is a GitHub Action that brings AI assistance directly to your repository workflow. Simply mention `@opencode` in Issues or Pull Requests, and get intelligent responses for code reviews, bug analysis, feature suggestions, and more.

## Features

- 🤖 **Multi-Provider Support**: Currently supports OpenAI (MVP), with plans for Anthropic and others
- 💬 **Natural Interaction**: Responds to `@opencode` mentions in Issues and PRs
- 🔍 **Context-Aware**: Analyzes code diffs, issue descriptions, and repository context
- 📊 **Progress Tracking**: Shows real-time progress with interactive comments
- ⚙️ **Configurable**: Customizable models, tools, and behavior
- 🛡️ **Secure**: Uses GitHub secrets for API keys and tokens

## Quick Start

1. **Set up API Key**: Add your OpenAI API key as `OPENAI_API_KEY` in repository secrets

2. **Add Workflow**: Create `.github/workflows/opencode.yml`:

```yaml
name: OpenCode AI Assistant

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened]
  pull_request:
    types: [opened]

jobs:
  opencode:
    if: contains(github.event.comment.body, '@opencode') || contains(github.event.issue.body, '@opencode') || contains(github.event.pull_request.body, '@opencode')
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: o3-cloud/pAI/opencode-action@main
        with:
          api_key: ${{ secrets.OPENAI_API_KEY }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

3. **Start Using**: Mention `@opencode` in any Issue or Pull Request comment

## Usage Examples

### Code Review
```
@opencode review this PR for security issues and performance optimizations
```

### Bug Analysis
```
@opencode help me understand why this test is failing
```

### Feature Guidance
```
@opencode suggest how to implement user authentication in this codebase
```

### General Questions
```
@opencode explain how this algorithm works
```

## Configuration

### Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `api_key` | OpenAI API key | Yes | - |
| `github_token` | GitHub token | Yes | `${{ secrets.GITHUB_TOKEN }}` |
| `model` | AI model to use | No | `gpt-4` |
| `provider` | AI provider | No | `openai` |
| `max_turns` | Max conversation turns | No | `3` |
| `trigger_phrase` | Trigger phrase | No | `@opencode` |
| `allowed_tools` | Comma-separated tools | No | `code_review,suggestions` |

### Advanced Configuration

```yaml
- uses: o3-cloud/pAI/opencode-action@main
  with:
    api_key: ${{ secrets.OPENAI_API_KEY }}
    github_token: ${{ secrets.GITHUB_TOKEN }}
    model: "gpt-4-turbo-preview"
    max_turns: 5
    trigger_phrase: "/assist"
    allowed_tools: "code_review,suggestions,bug_analysis,documentation"
```

## Available Tools

- **code_review**: Analyze code for issues and improvements
- **suggestions**: Provide implementation suggestions  
- **bug_analysis**: Help debug and fix issues
- **documentation**: Assist with documentation

## Supported Events

OpenCode responds to these GitHub events when they contain the trigger phrase:

- **Issue Comments**: `@opencode` in any issue comment
- **PR Comments**: `@opencode` in pull request comments
- **PR Reviews**: `@opencode` in review comments
- **New Issues**: `@opencode` in issue title or body
- **New PRs**: `@opencode` in PR title or body

## Security

- API keys are securely handled through GitHub secrets
- No sensitive data is logged or stored
- Follows least-privilege principle for GitHub permissions
- All AI interactions are isolated per repository

## Limitations

- Currently MVP supports OpenAI only (multi-provider coming soon)
- Response quality depends on context provided
- API costs apply based on usage
- Rate limits based on provider policies

## Roadmap

- ✅ OpenAI MVP implementation
- 🔄 Multi-provider support (Anthropic, others)
- 🔄 Advanced code analysis tools
- 🔄 Repository learning and context
- 🔄 Custom prompt templates
- 🔄 Usage analytics dashboard

## Contributing

This project is part of the [pAI ecosystem](https://github.com/o3-cloud/pAI). Contributions welcome!

## Support

- [Report Issues](https://github.com/o3-cloud/pAI/issues)
- [Documentation](https://github.com/o3-cloud/pAI)
- [Community Discussions](https://github.com/o3-cloud/pAI/discussions)

## License

MIT License - see [LICENSE](../LICENSE) for details.