import fs from 'fs-extra';
import path from 'path';

type Config = {
  commandPrefix: string;
  translationHost: string;
  languages: {
    [lang: string]: {
      icon: string;
      displayName: string;
      sttModel: string;
      sttScorer: string;
      ttsHost: string;
      translatorCode: string;
      supports: 'i' | 'o' | 'io' | 'oi';
    };
  };
};

const getConfig = async (): Promise<Config> => {
  const content = await fs.readFile(path.join(__dirname, '../../config.json'), { encoding: 'utf8' });
  return JSON.parse(content);
};

export default getConfig;
