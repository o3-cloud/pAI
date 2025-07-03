# 📊 Test Coverage Advisor Agent

This agent analyzes test coverage and provides actionable recommendations to improve code quality and reliability.

## Purpose

The Test Coverage Advisor automatically:
- **Monitors Coverage**: Tracks test coverage trends over time
- **Identifies Gaps**: Pinpoints uncovered code segments that need testing
- **Suggests Tests**: Recommends specific test cases based on code analysis
- **Reports Trends**: Provides insights into coverage improvements or regressions

## Prerequisites

- GitHub repository with test coverage reporting
- Coverage tool configured (Jest, pytest, etc.)
- OpenAI API key for intelligent analysis

## Environment Variables

Set the following secrets in your GitHub repository:

- `OPENAI_API_KEY`: Your OpenAI API key
- `GITHUB_TOKEN`: GitHub token (automatically provided in Actions)
- `COVERAGE_THRESHOLD`: Minimum coverage percentage (default: 80)

## How It Works

1. **Triggered**: Runs on PR creation/updates and scheduled intervals
2. **Analysis**: Parses coverage reports and identifies patterns
3. **Recommendations**: Generates specific testing suggestions
4. **Reporting**: Posts coverage summaries and actionable advice

## Supported Coverage Tools

- **JavaScript**: Jest, Mocha, Nyc
- **Python**: pytest-cov, coverage.py
- **Java**: JaCoCo, Cobertura
- **C#**: dotCover, OpenCover
- **Go**: Built-in coverage tools

## Configuration

Configure through environment variables:

- `COVERAGE_FORMAT`: `lcov` | `xml` | `json` (default: auto-detect)
- `FOCUS_AREAS`: `critical` | `all` | `new-code` (default: `critical`)
- `REPORT_STYLE`: `detailed` | `summary` | `actionable` (default: `actionable`)

## Integration

This agent integrates with:
- **GitHub API**: For PR analysis and status updates
- **Coverage Tools**: Parses various coverage report formats
- **OpenAI API**: For intelligent test suggestions
- **SonarQube**: For additional code quality metrics

## Example Output

```markdown
## 📊 Test Coverage Analysis

### 📈 Coverage Summary
- **Overall Coverage**: 78% (target: 80%)
- **Change in Coverage**: -2% (since last PR)
- **Critical Paths**: 65% covered

### 🚨 Priority Areas
1. **Authentication Module** (45% coverage)
   - Missing tests for error handling
   - No integration tests for OAuth flow
   
2. **Payment Processing** (60% coverage)
   - Edge cases not covered
   - Missing negative test scenarios

### 💡 Suggested Tests
- Add unit tests for `validatePayment()` edge cases
- Create integration tests for user authentication flow
- Test error handling in `processRefund()` method

### 📋 Action Items
- [ ] Cover critical authentication paths
- [ ] Add error scenario tests
- [ ] Increase integration test coverage
```

## Features

### Coverage Tracking
- Line, branch, and function coverage analysis
- Historical trend tracking
- Regression detection

### Intelligent Suggestions
- AI-powered test case recommendations
- Priority-based coverage improvements
- Context-aware testing strategies

### Reporting
- Markdown reports for PRs
- Slack notifications for coverage changes
- Dashboard-friendly metrics

## Setup Instructions

1. **Install Coverage Tool**:
   ```bash
   # JavaScript (Jest)
   npm install --save-dev jest
   
   # Python (pytest)
   pip install pytest-cov
   ```

2. **Configure Coverage Collection**:
   ```json
   // package.json (Jest)
   {
     "scripts": {
       "test": "jest --coverage"
     }
   }
   ```

3. **Add Workflow**:
   Copy the workflow file to `.github/workflows/test-coverage-advisor.yml`

4. **Set Repository Secrets**:
   - `OPENAI_API_KEY`
   - `COVERAGE_THRESHOLD` (optional)

## Customization

Customize the agent by:
- Adjusting coverage thresholds per file type
- Defining critical paths that need higher coverage
- Setting up team-specific testing guidelines
- Integrating with existing quality gates
