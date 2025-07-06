# Quick Start Guide

This guide will help you set up and run your first pAI agent in under 10 minutes.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)
- **Git** - [Download here](https://git-scm.com/)

You'll also need:
- An **OpenAI API key** - [Get one here](https://platform.openai.com/api-keys)
- A **Gmail account** (for Gmail-based agents)

## Step 1: Install Required Tools

### Install Taskfile
```bash
# On macOS
brew install go-task

# On Linux
sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b ~/.local/bin

# On Windows
choco install go-task
```

### Install Agentman
```bash
npm install -g agentman
```

## Step 2: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/o3-cloud/pAI.git
cd pAI

# Set your OpenAI API key
export OPENAI_API_KEY="your-api-key-here"

# For persistence, add to your shell profile
echo 'export OPENAI_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

## Step 3: Set Up Gmail Access (Optional)

If you want to use Gmail-based agents:

### Generate Gmail Credentials
```bash
# Create the MCP directory
mkdir -p ~/.gmail-mcp

# Run the Gmail MCP server to generate credentials
npx -y @gongrzhe/server-gmail-autoauth-mcp
```

This will:
1. Open your browser for Gmail OAuth
2. Generate a `credentials.json` file in `~/.gmail-mcp/`
3. Allow agents to access your Gmail

## Step 4: Run Your First Agent

Let's run the Gmail Curator agent:

```bash
# Navigate to the agent directory
cd @Home/gmail-curator

# Run the agent
task run
```

You should see output like:
```
task: [prompt] cat ../ME.md > prompt.txt
task: [agent] agentman run --rm -e OPENAI_API_KEY=$OPENAI_API_KEY ...
✅ Agent completed successfully
📧 Found 3 important emails
📝 Summary saved to output/
```

## Step 5: Explore Other Agents

Try running other agents:

```bash
# Newsletter processor
cd ../gmail-newsletter
task run

# Test agent for experimentation
cd ../test-agent
task run
```

## Common Commands

| Command | Description |
|---------|-------------|
| `task run` | Run the complete agent workflow |
| `task prompt` | Generate prompt.txt from ME.md |
| `task agent` | Run just the agent (after prompt) |
| `agentman --help` | Show agentman usage |

## Next Steps

1. **Customize your agents** - Edit the `ME.md` files in `@Home/` and `@Work/` contexts
2. **Create your first agent** - Follow the [Agent Development Guide](../development/creating-agents.md)
3. **Set up automation** - Configure GitHub Actions for scheduled runs
4. **Join the community** - Share your agents and get help

## Need Help?

- Check the [Troubleshooting Guide](../troubleshooting/common-issues.md)
- Read the [FAQ](../troubleshooting/faq.md)
- Review agent-specific READMEs in each agent directory

## What's Next?

You're now ready to explore the pAI ecosystem! Consider:
- Customizing existing agents for your needs
- Creating new agents for your workflows
- Setting up automated scheduling with GitHub Actions
- Exploring the MCP ecosystem for new integrations