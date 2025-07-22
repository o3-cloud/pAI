# Fabric CLI GitHub Action

A composite GitHub Action that wraps the [Fabric CLI](https://github.com/danielmiessler/fabric) for AI-powered content processing and analysis within GitHub workflows.

## Features

- 🚀 **Easy Setup**: Single action installs Fabric CLI and configures patterns
- 🎯 **200+ Patterns**: Access to Fabric's extensive pattern library
- 🔌 **Multi-Provider**: Supports OpenAI, Anthropic, and other AI providers
- 📝 **Flexible I/O**: Process text, files, URLs, and YouTube videos
- ⚡ **Fast Installation**: Single binary installation, no complex dependencies
- 🔒 **Secure**: API keys handled through GitHub secrets

## Usage

### Basic Example

```yaml
- name: Summarize Content
  uses: ./.github/actions/fabric
  with:
    pattern: summarize
    content: "Your long content here that needs summarizing..."
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
```

### File Processing

```yaml
- name: Analyze Code Changes
  uses: ./.github/actions/fabric
  with:
    pattern: analyze_code_changes
    input-file: changes.diff
    output-file: analysis.md
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
```

### URL Processing

```yaml
- name: Extract Insights from Article
  uses: ./.github/actions/fabric
  with:
    pattern: extract_wisdom
    url: "https://example.com/article"
    model: gpt-4
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
```

### YouTube Analysis

```yaml
- name: Summarize YouTube Video
  uses: ./.github/actions/fabric
  with:
    pattern: summarize
    youtube-url: "https://youtube.com/watch?v=example"
    variables: "style=bullet_points,length=short"
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
```

## Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `pattern` | ✅ | - | Fabric pattern to use (e.g., `summarize`, `extract_wisdom`) |
| `content` | ❌ | - | Direct text content to process |
| `input-file` | ❌ | - | File path to process |
| `url` | ❌ | - | URL to scrape and process |
| `youtube-url` | ❌ | - | YouTube video URL to process |
| `output-file` | ❌ | - | Output file path (defaults to stdout) |
| `model` | ❌ | `gpt-4` | AI model to use |
| `temperature` | ❌ | - | Model temperature (0.0-2.0) |
| `stream` | ❌ | `false` | Enable streaming output |
| `variables` | ❌ | - | Pattern variables (`key=value,key2=value2`) |
| `openai-api-key` | ❌ | - | OpenAI API key |
| `anthropic-api-key` | ❌ | - | Anthropic API key |
| `setup-patterns` | ❌ | `true` | Whether to update patterns from repository |

## Outputs

| Output | Description |
|--------|-------------|
| `result` | Processed content result |
| `output-file` | Path to output file if created |
| `pattern-used` | Pattern that was executed |

## Popular Patterns

### Analysis Patterns
- `analyze_claims` - Fact-check and analyze claims in content
- `analyze_paper` - Academic paper analysis
- `analyze_threat_report` - Security threat analysis
- `analyze_code_changes` - Code review and change analysis

### Extraction Patterns
- `extract_wisdom` - Extract key insights and wisdom
- `extract_ideas` - Extract innovative ideas
- `extract_insights` - Extract actionable insights
- `extract_references` - Extract citations and references

### Creation Patterns
- `create_summary` - Create structured summaries
- `create_visualization` - Generate visualization suggestions
- `create_coding_feature` - Generate code features
- `summarize` - General-purpose summarization

### Writing Patterns
- `improve_writing` - Improve writing quality
- `write_essay` - Essay writing assistance
- `explain_code` - Code explanation

## Integration with pAI Agents

### Enhanced Agent Workflow

```yaml
# Add to existing _agent.yml workflow
- name: Process Email Content
  uses: ./.github/actions/fabric
  with:
    pattern: extract_wisdom
    input-file: email_content.txt
    output-file: insights.md
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}

- name: Run Agent with Insights
  working-directory: ${{ inputs.working-directory }}
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
    FABRIC_INSIGHTS: ${{ steps.fabric.outputs.result }}
  run: task run
```

### Multi-Step Content Processing

```yaml
- name: Scrape and Analyze Article
  uses: ./.github/actions/fabric
  with:
    pattern: extract_wisdom
    url: ${{ env.ARTICLE_URL }}
    output-file: article_analysis.md
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}

- name: Create Newsletter Section
  uses: ./.github/actions/fabric
  with:
    pattern: create_summary
    input-file: article_analysis.md
    variables: "format=newsletter,style=engaging"
    output-file: newsletter_content.md
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
```

### Scheduled Content Curation

```yaml
# In gmail-curator.yml or similar
- name: Analyze Important Emails
  uses: ./.github/actions/fabric
  with:
    pattern: summarize
    input-file: important_emails.txt
    variables: "length=brief,focus=action_items"
    output-file: email_summary.md
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
```

## Environment Variables

The action supports configuration through environment variables in `~/.config/fabric/.env`:

```bash
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## Error Handling

The action includes comprehensive error handling:
- Validates that at least one input source is provided
- Checks for API key availability
- Reports pattern execution errors
- Handles file I/O errors gracefully

## Security Considerations

- API keys are handled through GitHub secrets
- Configuration files have restricted permissions (600)
- No sensitive data is logged in action outputs
- Temporary files are cleaned up automatically

## Advanced Usage

### Custom Pattern Variables

```yaml
- name: Custom Analysis
  uses: ./.github/actions/fabric
  with:
    pattern: analyze_claims
    url: "https://news-article.com"
    variables: "focus=political_bias,depth=detailed,format=report"
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
```

### Multi-Provider Fallback

```yaml
- name: Robust Content Processing
  uses: ./.github/actions/fabric
  with:
    pattern: summarize
    content: ${{ env.CONTENT }}
    model: claude-3-sonnet
    anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
    # Falls back to OpenAI if Anthropic fails
```

## Troubleshooting

### Common Issues

1. **"No input provided" error**: Ensure one of `content`, `input-file`, `url`, or `youtube-url` is specified
2. **Pattern not found**: Check pattern name spelling or run with `setup-patterns: true`
3. **API key errors**: Verify secrets are properly configured in repository settings
4. **Permission errors**: Ensure the action has necessary permissions to read/write files

### Debug Mode

Enable debug logging:

```yaml
- name: Debug Fabric Execution
  uses: ./.github/actions/fabric
  env:
    RUNNER_DEBUG: 1
  with:
    pattern: summarize
    content: "test content"
```

## License

This action is part of the pAI system and follows the same licensing terms as the parent repository.