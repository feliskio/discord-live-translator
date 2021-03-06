import getConfig from '../utils/getConfig';
import settingsStorage from '../utils/settingsStorage';
import type { CommandHandler } from '../types';

const statusCommand: CommandHandler = async (client, message, command) => {
  if (!message.member || !message.guild) {
    message.reply('an error occurred!');
    return;
  }

  const prefs = settingsStorage.get(message.guild.id, message.author.id);
  const config = await getConfig();

  if (!prefs) {
    message.reply('you currently have **not activated** live translation! :cry:');
  } else {
    message.reply(
      `you are currently translating **from ${config.languages[
        prefs.from
      ].displayName.toLowerCase()} to ${config.languages[prefs.to].displayName.toLowerCase()}**! :sunglasses:`
    );
  }
};

export default statusCommand;
