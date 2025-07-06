# Your First Agent: Step-by-Step Tutorial

This tutorial will guide you through setting up and running your first pAI agent from start to finish. We'll use the Gmail Curator agent as an example.

## What You'll Learn

- How to configure your personal context
- How to run an agent locally
- How to interpret agent output
- How to customize agent behavior
- How to troubleshoot common issues

## Prerequisites

Before starting, ensure you've completed the [Prerequisites Checklist](prerequisites.md).

## Step 1: Understanding Agent Structure

Let's explore the Gmail Curator agent structure:

```bash
cd @Home/gmail-curator
ls -la
```

You'll see:
```
├── Agentfile          # Agent configuration
├── README.md          # Agent documentation
├── Taskfile.yml       # Development tasks
└── agent/             # Agent implementation
    ├── agent.py       # Main agent code
    ├── fastagent.config.yaml  # MCP server config
    └── prompt.txt     # Generated from ME.md
```

## Step 2: Configure Your Personal Context

The `ME.md` file contains your personal context that guides how the agent behaves.

### Edit Your Context
```bash
# Edit the @Home context file
cd @Home
nano ME.md  # or use your preferred editor
```

### Key Sections to Customize

1. **Personal Information**: Update with your details
2. **Preferences**: Adjust how you want agents to behave
3. **Priorities**: Define what's important to you
4. **Communication Style**: Set the tone for agent interactions

### Example Customization
```markdown
# ME.md - @Home Context

## Personal Information
- Name: [Your Name]
- Time Zone: [Your timezone]
- Email: [Your email]

## Communication Preferences
- Tone: Professional but friendly
- Frequency: Daily summaries preferred
- Detail Level: Concise with key highlights

## Priorities
- Family time is sacred
- Focus on actionable items
- Reduce email noise
```

## Step 3: Set Up Gmail Access

### Generate Gmail Credentials
```bash
# Ensure the MCP directory exists
mkdir -p ~/.gmail-mcp

# Run the Gmail MCP server authentication
npx -y @gongrzhe/server-gmail-autoauth-mcp
```

This will:
1. Open your browser
2. Ask for Gmail permissions
3. Generate `~/.gmail-mcp/credentials.json`

### Verify Credentials
```bash
ls ~/.gmail-mcp/credentials.json
# Should show the credentials file
```

## Step 4: Run Your First Agent

### Navigate to the Agent Directory
```bash
cd @Home/gmail-curator
```

### Run the Agent
```bash
task run
```

### What Happens During Execution

1. **Prompt Generation**: Updates `prompt.txt` with your `ME.md` context
2. **Agent Initialization**: Loads FastAgent with your configuration
3. **Gmail Connection**: Connects to Gmail using MCP
4. **Email Processing**: Analyzes recent emails
5. **Summary Generation**: Creates a summary of important emails
6. **Output Generation**: Saves results to output files

### Expected Output
```
task: [prompt] cat ../ME.md > prompt.txt
task: [agent] agentman run --rm -e OPENAI_API_KEY=$OPENAI_API_KEY -v ~/.gmail-mcp:/root/.gmail-mcp --from-agentfile -f Agentfile

🤖 Starting Gmail Curator Agent...
📧 Connecting to Gmail...
📊 Analyzing 15 recent emails...
✅ Found 3 important emails
📝 Generated summary

=== Important Emails Summary ===
1. Project Update from Sarah (High Priority)
   - Deadline moved to next Friday
   - Review requested by EOD

2. Bank Statement Available
   - Monthly statement ready
   - Auto-pay scheduled

3. Family Dinner Plans
   - Mom's message about Sunday dinner
   - RSVP needed by Thursday

💾 Results saved to agent/output/
```

## Step 5: Understanding Agent Output

### Output Files
```bash
ls agent/output/
```

You'll typically see:
- `summary.txt` - Human-readable summary
- `emails.json` - Structured email data
- `log.txt` - Agent execution log

### Reading the Summary
```bash
cat agent/output/summary.txt
```

The summary includes:
- Priority emails that need attention
- Brief descriptions of each email
- Suggested actions or deadlines
- Context about why each email is important

## Step 6: Customizing Agent Behavior

### Modify Agent Instructions

Edit the `Agentfile` to change agent behavior:

```bash
nano Agentfile
```

Common customizations:
```dockerfile
# Change the instruction to modify behavior
ENV INSTRUCTION="Focus on work-related emails and urgent personal messages. Ignore newsletters and promotional content."

# Adjust model settings
ENV MODEL="gpt-4"
ENV TEMPERATURE="0.3"
```

### Update Context Rules

Edit `ME.md` to change filtering rules:

```markdown
## Email Priorities
- Work emails from team members
- Financial notifications
- Family communications
- Time-sensitive invitations

## Ignore
- Newsletters (unless from specific sources)
- Promotional emails
- Social media notifications
```

## Step 7: Testing Your Changes

### Run After Customization
```bash
task run
```

### Compare Results
```bash
# Compare with previous run
diff agent/output/summary.txt agent/output/summary.txt.backup
```

## Step 8: Troubleshooting Common Issues

### Issue: "OpenAI API key not found"
```bash
# Check if environment variable is set
echo $OPENAI_API_KEY

# If not set, add to your shell profile
echo 'export OPENAI_API_KEY="your-key-here"' >> ~/.bashrc
source ~/.bashrc
```

### Issue: "Gmail credentials not found"
```bash
# Verify credentials file exists
ls ~/.gmail-mcp/credentials.json

# If missing, regenerate
npx -y @gongrzhe/server-gmail-autoauth-mcp
```

### Issue: "No emails found"
```bash
# Check Gmail connection
npx -y @gongrzhe/server-gmail-autoauth-mcp --test

# Verify agent has the right permissions
# Check agent/output/log.txt for details
```

### Issue: "Agent fails to start"
```bash
# Check all dependencies
task --version
agentman --version
node --version

# Check the agent log
cat agent/output/log.txt
```

## Step 9: Running Other Agents

### Try the Newsletter Agent
```bash
cd ../gmail-newsletter
task run
```

### Explore the Test Agent
```bash
cd ../test-agent
task run
```

## Step 10: Next Steps

Congratulations! You've successfully run your first pAI agent. Here's what to do next:

### Immediate Actions
1. **Customize your context** - Fine-tune `ME.md` for your needs
2. **Set up automation** - Configure GitHub Actions for scheduled runs
3. **Explore other agents** - Try different agents in the repository

### Learning More
1. **Read the [Agent Development Guide](../development/creating-agents.md)**
2. **Study the [Architecture Documentation](../architecture/overview.md)**
3. **Join the community** - Share your experience and get help

### Creating Your Own Agent
1. **Follow the [Creating Agents Guide](../development/creating-agents.md)**
2. **Use the test agent** as a starting point
3. **Implement your own workflows**

## Common Patterns

### Daily Routine
```bash
# Morning email check
cd @Home/gmail-curator && task run

# Weekly newsletter processing
cd @Home/gmail-newsletter && task run
```

### Development Workflow
```bash
# Test changes
task run

# Review output
cat agent/output/summary.txt

# Adjust context
nano ../ME.md

# Test again
task run
```

## Getting Help

If you encounter issues:

1. **Check the logs**: `cat agent/output/log.txt`
2. **Review the [Troubleshooting Guide](../troubleshooting/common-issues.md)**
3. **Read agent-specific READMEs**
4. **Open an issue** on the repository

## Summary

You've learned how to:
- Configure your personal context
- Set up Gmail access
- Run agents locally
- Interpret agent output
- Customize agent behavior
- Troubleshoot common issues

Your pAI system is now ready to help automate your workflows!