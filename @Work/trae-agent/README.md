# Trae-Agent Integration

This agent integrates [trae-agent](https://github.com/bytedance/trae-agent) into the pAI system for automated software engineering tasks.

## Overview

Trae-agent is an LLM-based agent designed for general-purpose software engineering tasks. It provides:

- **Multi-tool support**: File editing, bash execution, structured thinking, task completion, JSON editing
- **Trajectory recording**: Detailed logging of all agent actions for debugging and analysis
- **Lakeview**: Concise summarization of agent steps
- **Multi-LLM support**: OpenAI, Anthropic, Google Gemini, and others

## Usage

### Manual Task Execution

```bash
# Navigate to the agent directory
cd @Work/trae-agent

# Run a software engineering task
TASK="Fix the bug in main.py where the function returns None instead of an empty list" task run

# Run in interactive mode (requires local trae-agent installation)
task interactive

# Clean up generated files
task clean
```

### GitHub Actions Integration

The agent can be triggered via GitHub Actions workflow for automated software engineering tasks:

```yaml
# Trigger example
- name: Run Trae Agent
  uses: ./.github/workflows/trae-agent.yml
  with:
    task: "Review the code in src/ directory and suggest improvements"
    working_dir: "."
```

## Configuration

The agent uses `trae_config.json` for configuration:

- **Provider**: OpenAI GPT-4o (configurable)
- **Max Steps**: 20 (adjustable for complex tasks)
- **Tools**: All trae-agent tools enabled
- **Trajectory Recording**: Enabled for debugging
- **Lakeview**: Enabled for step summarization

## Environment Variables

- `OPENAI_API_KEY`: Required for OpenAI API access
- `TASK`: The software engineering task to execute

## Output

The agent generates:
- `prompt.txt`: Generated from work context (`../ME.md`)
- `task.txt`: The specific task being executed
- `trajectories/`: Detailed logs of agent actions
- Console output with step-by-step execution

## Integration with pAI

This agent follows the standard pAI pattern:
- Uses the base Docker image (`ghcr.io/o3-cloud/pai/base:latest`)
- Implements `Agentfile` for Docker-based execution
- Uses `Taskfile.yml` for task management
- Integrates with work context via `ME.md`

## Capabilities

- **Code Review**: Analyze code quality and suggest improvements
- **Bug Fixing**: Identify and fix bugs in codebases
- **Feature Implementation**: Implement new features based on requirements
- **Refactoring**: Improve code structure and maintainability
- **Testing**: Create and run tests for code verification
- **Documentation**: Generate and update code documentation

## Limitations

- Requires OpenAI API access
- Limited to 20 steps per task (configurable)
- Works best with well-structured codebases
- May require manual intervention for complex architectural decisions