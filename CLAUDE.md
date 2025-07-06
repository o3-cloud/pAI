# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a pAI (Personal AI) system - a collection of intelligent agents that automate personal and professional workflows. The system uses FastAgent framework with GitHub Actions for scheduling and MCP (Model Context Protocol) for external service integration.

## Core Architecture

### Agent Structure
Each agent follows a standard structure:
- `Agentfile`: Agent configuration using FastAgent/Docker syntax
- `Taskfile.yml`: Task definitions for development and deployment
- `agent/`: Core implementation directory
  - `agent.py`: Main FastAgent application
  - `fastagent.config.yaml`: MCP server configurations
  - `prompt.txt`: Generated from parent `ME.md` context file

### Context Organization
- `@Home/`: Personal life automation agents
- `@Work/`: Professional workflow agents
- Each context has its own `ME.md` file for personal context

## Key Technologies

- **FastAgent**: AI agent framework for defining agents with minimal boilerplate
- **Agentman**: Platform for creating and deploying AI agents
- **Taskfile**: Modern task runner for development and operational tasks
- **GitHub Actions**: Scheduled execution and CI/CD
- **MCP Protocol**: Standardized way for agents to interact with external services (Gmail, etc.)

## Common Commands

### Running Agents Locally
```bash
# Navigate to any agent directory
cd @Home/gmail-curator

# Run the complete agent workflow
task run

# Individual tasks
task prompt  # Generate prompt.txt from ME.md
task agent   # Run the agent
```

### Agent Development
```bash
# Create new agent (requires agentman)
agentman create

# Run agent with Docker
agentman run --rm -e OPENAI_API_KEY=$OPENAI_API_KEY -v ~/.gmail-mcp:/root/.gmail-mcp --from-agentfile -f Agentfile
```

## Active Agents

### Gmail Curator (@Home)
- **Purpose**: Monitors inbox for important emails and provides summaries
- **Schedule**: 3x daily (8:00 AM, 11:30 AM, 7:30 PM EST)
- **MCP Servers**: gmail
- **Model**: gpt-4.1

### Gmail Newsletter (@Home)
- **Purpose**: Processes newsletters and creates weekly digests
- **Schedule**: Weekly
- **MCP Servers**: gmail, fetch
- **Model**: gpt-4.1

## Configuration Requirements

### Environment Variables
- `OPENAI_API_KEY`: Required for all agents
- `GMAIL_AUTH_KEYS`: Gmail authentication keys
- `GMAIL_CREDS`: Gmail credentials

### MCP Server Setup
Gmail integration requires:
```yaml
mcp:
  servers:
    gmail:
      transport: stdio
      command: npx
      args:
        - -y
        - '@gongrzhe/server-gmail-autoauth-mcp'
```

## GitHub Actions Workflows

Agents are deployed as scheduled GitHub Actions using:
- Shared workflow: `.github/workflows/_agent.yml`
- Agent-specific workflows: `.github/workflows/gmail-curator.yml`
- Manual trigger support via `workflow_dispatch`

## Development Patterns

### FastAgent Agent Definition
```python
@fast.agent(
    name="agent_name",
    instruction="Agent instructions...",
    servers=["gmail", "fetch"],
    model="gpt-4.1"
)
async def main() -> None:
    # Agent implementation
```

### Taskfile Structure
```yaml
version: 3
tasks:
  prompt:
    - cat ../ME.md > prompt.txt
  agent:
    - agentman run --rm -e OPENAI_API_KEY=$OPENAI_API_KEY -v ~/.gmail-mcp:/root/.gmail-mcp --from-agentfile -f Agentfile
  run:
    - task: prompt
    - task: agent
```

## Context Management

Each agent context directory contains:
- `ME.md`: Personal context file that gets injected into agent prompts
- Agent subdirectories with specific implementations
- Context-specific README files

This architecture enables personal AI agents that understand individual context and automate workflows while maintaining security and auditability.