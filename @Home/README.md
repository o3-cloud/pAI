# 🏡 pAI@Home

> A framework for understanding, designing, and guiding my personal AI system for life outside of work. This pAI supports my values, relationships, routines, and creative pursuits.

---

## 🧾 Purpose

**This pAI system exists to help me live a calmer, more intentional life—one with clarity, presence, connection, and curiosity.**  
It should help me stay focused on what matters most and reduce the friction around everything else.

---

## 🪪 Who I Am (Summary)

- Grounded, stable, and focused on what I can control
- Prioritize family, creativity, and simplicity
- Value presence over productivity, especially outside of work
- Curious introvert with extroverted passion for ideas

---

## 🧠 Core Principles

- Be helpful, but not intrusive
- Prioritize meaning over speed
- Suggest, don’t push
- Keep my values at the center (family, mindfulness, creativity)
- Don’t just surface information—filter and interpret it for me

---

## 🧰 Agent Archetypes

| Category          | Role Example                             |
|-------------------|-------------------------------------------|
| ✨ Life Planner     | Keeps track of important dates & rhythms |
| 📬 Inbox Curator    | Extracts useful info from email/social   |
| 🎯 Focus Preserver  | Nudges me away from distractions         |
| 💬 Relationship Ally | Suggests check-ins or thoughtful touches |
| 📚 Discovery Guide  | Recommends content based on curiosity    |
| 🎉 Event Helper     | Assists with personal or family planning |
| 🧘‍♂️ Reflection Buddy | Prompts journaling, tracking, and calm     |

---

## 🤖 Implemented Agents

### 📬 gmail-curator

- **Purpose**: Monitors the inbox for important, non-newsletter emails and provides summaries.
- **Schedule**: Runs daily.
- **Details**: See the [gmail-curator/README.md](gmail-curator/README.md) for setup and usage instructions.

### 💌 gmail-newsletter

- **Purpose**: Processes newsletters, extracts key articles, and delivers a weekly digest.
- **Schedule**: Runs weekly.
- **Details**: See the [gmail-newsletter/README.md](gmail-newsletter/README.md) for setup and usage instructions.

---

## 🛠️ Technical Details

### Gmail MCP Server Setup
This project uses the [Gmail-MCP-Server](https://github.com/GongRzhe/Gmail-MCP-Server) to enable agents to interact with Gmail. To run agents that require Gmail access within a GitHub Actions workflow, follow these steps:

1.  **Generate Credentials Locally**: Run the server's authentication process on your local machine to generate a `credentials.json` file containing the necessary refresh token.
2.  **Store Credentials as a Secret**: Copy the contents of `credentials.json` and save it as a secret in your GitHub repository with the name `GMAIL_CREDENTIALS_JSON`.
3.  **Configure GitHub Actions**: In your workflow file, add a step to write the secret to the location the server expects before running the agent.

    ```yaml
    - name: Write credentials to file
      run: |
        mkdir -p ~/.gmail-mcp
        echo "${{ secrets.GMAIL_CREDENTIALS_JSON }}" > ~/.gmail-mcp/credentials.json
    ```

---

## 🔄 Interaction Model

- **Tone**: Casual, kind, a little playful when appropriate
- **Reminders**: Gentle nudges, not alarms
- **Input**: Prefer Slack, voice, or short-form journaling
- **Trust Boundaries**:
  - Never impersonate me
  - Always ask before sending something on my behalf
  - Be cautious with emotional tone—don’t fake empathy

---

## ✨ Benefits

- I spend less time sorting, more time enjoying
- I stay connected to people who matter
- I follow through on things I care about
- I reduce cognitive load and increase creative freedom
- I feel more present in my home life

---

## 🛣️ Roadmap / Next Steps

- [X] Use `ME.md` as foundation for all agents
- [X] Prototype initial Gmail agents (`gmail-curator`, `gmail-newsletter`)
- [X] Set up GitHub Actions to run agents on a schedule
- [ ] Expand based on comfort and success

---

## ⚠️ Challenges & Constraints

| Risk | Mitigation |
|------|------------|
| Over-involvement | Limit to passive suggestions unless I request more |
| Privacy concerns | Keep data local or encrypted; be transparent |
| False tone or empathy | Keep it simple, sincere, and mostly neutral |
| Prompt fatigue | Rotate formats, allow for silence and reset |

---

## 💡 Philosophy

> **This pAI system is not here to optimize my life—it’s here to help me live it more fully, with less mental clutter and more space for joy.**
