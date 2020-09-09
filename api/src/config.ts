import { resolve } from 'path';
import { config as configureDotEnv } from 'dotenv';

configureDotEnv({ path: resolve(__dirname, '../../.env' )});

const root = resolve(__dirname, '../../');
const env = process.env;

const notNullEnv = (key: string) => {
  if (env[key] == null) {
    throw Error(`undefined env: ${key}`);
  }
  return env[key] as string;
};

export const config = {
  root,
  isDev: env.NODE_ENV === 'development',
  api: {
    port: env.API_PORT || 3000,
    env: env.NODE_ENV || 'development',
    enableCors: !!env.ENABLE_CORS,
  },
};
