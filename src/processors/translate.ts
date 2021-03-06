import axios from 'axios';

import getConfig from '../utils/getConfig';

const translate = async (text: string, from: string, to: string): Promise<string> => {
  console.log(`Translating "${text}" from ${from} into ${to}...`);

  if (!text) {
    return '';
  }

  const config = await getConfig();

  const response = await axios({
    url: `${config.translationHost}/translate`,
    method: 'POST',
    data: {
      q: text,
      source: from,
      target: to
    }
  });

  return response.data.translatedText;
};

export default translate;
