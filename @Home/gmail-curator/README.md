# 📬 Gmail Curator Agent

This agent monitors a Gmail inbox for important, non-newsletter emails and provides summaries.

## Prerequisites

Before running the agent, ensure you have the following installed:
- [Taskfile](https://taskfile.dev/)
- [Agentman](https://github.com/AgentO3/agentman)

You will also need to set the following environment variable:
- `OPENAI_API_KEY`: Your OpenAI API key.

## Setup

This agent requires access to your Gmail account. Follow the setup instructions in the main `README.md` to generate your `credentials.json` file and place it in `~/.gmail-mcp`.

## Running the Agent

To run the agent locally, navigate to this directory and run the following command:

```sh
task run
```

This will first update the `prompt.txt` with the contents of `ME.md` and then start the agent.
