# Sitrep

**Welcome to Sitrep!** Sitrep is a Discord bot that allows easy open collaboration with just a couple of commands. Set your activity, how long you'll be doing it for, and other users in the same server can see and hop in, ready to help!

The tech for this project was relatively simple, being a Discord bot. NodeJS was an obvious runtime solution, being async by nature and supporting discord.js, the most popular Discord bot framework. Data storage was done through MongoDB and Mongoose as an ODM, since MongoDB and JavaScript go hand in hand, and NoSQL works perfectly fine since there's no real sensitive data stored here.

Problems were mainly working with Discord.js for the first time, navigating how to actually respond to commands, but once that was over and done with, it was mostly dealing with JavaScript's Date implementation that yielded the most research required.

_Future features may include:_
- Restrictions by role/channel
- Activity scheduling
- Additional features as requested

---

## How to Use It

Once you've invited the bot into your server, type `{help`. This will give you a list of commands and syntax to use. `{` is going to be your command prefix.

There are two commands at the moment: `{setup` and `{sitrep`. These have arguments (some optional, some not), that you can view in the help section.