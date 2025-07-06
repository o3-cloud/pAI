# Setting Up Your Personal AI Agents

**[Host 1]:** Hello, dear listeners! Welcome back to another episode of "pAI Life," where we dive into the world of personal AI systems. Today, we’re exploring a topic that’s both exciting and incredibly useful—setting up your personal AI agents. We'll take you step-by-step so you can really get these agents working for you, helping make your life smoother and more intentional. How's that sound?

**[Host 2]:** It sounds fantastic! If you’ve been following along with our previous episodes, you’ll remember that we’ve already discussed the conceptual frameworks of pAI systems for both personal and professional contexts. Today, we're going to build on that foundation and walk you through the practical setup of a couple of exciting agents.

**[Host 1]:** That's right. And our focus today is on two agents that can significantly unclutter your personal life: the *Gmail Curator* and *Gmail Newsletter Agent*. So let's jump right in, starting with what you’ll need to get set up!

**[Host 2]:** Great place to start. Both of these agents are part of the pAI@Home suite, designed to reduce mental clutter and help you focus more on what truly matters—your values, relationships, and creativity.

**[Host 1]:** This setup process isn’t just about activating these agents but aligning them with the core principles we cherish: being helpful but not intrusive, keeping family and creativity central... you know the drill by now. So first thing's first—let's get into the technical necessities.

**[Host 2]:** Absolutely. So, for both agents, you'll need a couple of software tools: Taskfile and Agentman. These tools help manage automation tasks and agent configuration, respectively. You’ll also need to have your OpenAI API key ready to give your agents that little bit of extra brainpower!

**[Host 1]:** Exactly. Now, once those basics are sorted, you’ll need to set up access to your Gmail account, which is crucial for both agents. This involves generating a `credentials.json` file using the Gmail-MCP-Server. We won’t dive into all those nitty-gritty details again since we've covered it before. Just remember the endgame here: secure and efficient access to your emails.

**[Host 2]:** After that, you'll want to store these credentials securely. Make sure they’re saved as a secret in your GitHub repository under the name `GMAIL_CREDENTIALS_JSON`. This ensures that your sensitive data remains protected while your agents do their magic.

**[Host 1]:** And speaking of magic, let's talk about running these agents. Once everything's in place, you’ll need to navigate to each agent's directory—be it *gmail-curator* or *gmail-newsletter*—and run the command `task run`. This launches the agent and gets that valuable insight and filtering started.

**[Host 2]:** That’s the ticket! Now, both agents, after being triggered by these commands, will update the `prompt.txt` using the contents of `ME.md`. This step is crucial because it applies your personal preferences and context, ensuring the agents operate in harmony with your life goals.

**[Host 1]:** Exactly. The *Gmail Curator* is like having a personal email assistant that sifts through your inbox daily to sum up important non-newsletter emails. Meanwhile, the *Gmail Newsletter Agent* digests your weekly newsletters, serving you bite-sized nuggets of key articles to keep your curiosity hungry and informed.

**[Host 2]:** And it’s all done within that gentle, playful tone we’ve emphasized—all while being casual and kind. This isn’t about automating your life with rigid schedules but enhancing presence and reducing the roadblocks to what we truly cherish.

**[Host 1]:** Couldn't have summed it up better myself. For those of you wondering what's next on your pAI journey, don't forget the broader picture: you're reducing the cognitive load and making space for what truly brings joy and fulfillment. 

**[Host 2]:** We hope you find setting up these agents as exciting and rewarding as we do. As always, feel free to revisit previous episodes if you need a refresher on the philosophical underpinnings of these agents or the pAI system as a whole.

**[Host 1]:** Thanks for joining us today, everyone! Don't forget to subscribe and catch us in the next episode, where we'll be diving into the wild world of professional agents at pAI@Work. Take care, and happy automating!

**[Both Hosts]:** Goodbye!