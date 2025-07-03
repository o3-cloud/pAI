# 🔍 PR Diff Auditor Agent

This agent analyzes pull request diffs to identify potential issues, security concerns, and improvement opportunities.

## Purpose

The PR Diff Auditor automatically reviews pull requests and provides:
- **Security Analysis**: Detects potential secrets, unsafe patterns, and security vulnerabilities
- **Code Quality**: Identifies anti-patterns, technical debt, and maintainability issues
- **Infrastructure Changes**: Analyzes Terraform, Docker, and Kubernetes changes for risks
- **Best Practices**: Suggests improvements based on team standards and conventions

## Prerequisites

- GitHub repository with GitHub Actions enabled
- OpenAI API key for LLM analysis
- Appropriate repository permissions for the agent

## Environment Variables

Set the following secrets in your GitHub repository:

- `OPENAI_API_KEY`: Your OpenAI API key
- `GITHUB_TOKEN`: GitHub token (automatically provided in Actions)

## How It Works

1. **Triggered**: Runs on every pull request (opened, updated, synchronized)
2. **Analysis**: Reviews the diff for various categories of issues
3. **Feedback**: Posts a comment on the PR with findings and suggestions
4. **Continuous**: Updates analysis as the PR evolves

## Configuration

The agent can be configured through environment variables:

- `ANALYSIS_DEPTH`: `shallow` | `standard` | `deep` (default: `standard`)
- `FOCUS_AREAS`: Comma-separated list of focus areas (e.g., `security,performance,style`)
- `THRESHOLD`: `strict` | `balanced` | `lenient` (default: `balanced`)

## Integration

This agent integrates with:
- **GitHub API**: For PR analysis and commenting
- **OpenAI API**: For intelligent code analysis
- **SonarQube**: For code quality metrics (if configured)
- **Snyk**: For security vulnerability scanning (if configured)

## Example Output

```markdown
## 🔍 PR Diff Analysis

### ✅ Looks Good
- Clean code structure and organization
- Proper error handling implemented
- Tests included for new functionality

### ⚠️ Suggestions
- Consider extracting the database logic into a separate service
- Add input validation for the new API endpoint
- Update documentation for the modified configuration

### 🔒 Security
- No security issues detected

### 📊 Metrics
- Lines changed: +145, -23
- Test coverage: 85% (target: 80%)
- Complexity score: 6/10 (good)
```

## Setup

1. Copy the workflow file to `.github/workflows/pr-diff-auditor.yml`
2. Configure the required secrets in your repository
3. Customize the analysis parameters as needed
4. The agent will automatically start analyzing new PRs

## Customization

You can customize the agent's behavior by:
- Modifying the analysis prompts
- Adjusting the scoring thresholds
- Adding team-specific rules and patterns
- Integrating with additional tools and services
