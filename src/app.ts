import Discord from 'discord.js';
import dotenv from 'dotenv';

import commandsRegister from './register';
import getConfig from './utils/getConfig';
import notFoundCommand from './commands/notFound';
import parseCommand from './utils/parseCommand';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const client = new Discord.Client();

client.on('message', async (message) => {
  if (message.author.bot) {
    return;
  }

  const config = await getConfig();

  if (message.content.startsWith(config.commandPrefix)) {
    let parsedCommand = parseCommand(config.commandPrefix, message.content);

    if (parsedCommand.domain !== 'translation') {
      return;
    }

    if (parsedCommand.command in commandsRegister) {
      const { handler } = commandsRegister[parsedCommand.command];
      handler(client, message, parsedCommand);
    } else {
      notFoundCommand(client, message, parsedCommand);
    }
  }
});

client.once('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('your beautiful voice', { type: 'LISTENING' });
  } else {
    console.log('Ready but no user available!');
  }
});

client.on('error', console.error);

client.login(process.env.BOT_TOKEN);
