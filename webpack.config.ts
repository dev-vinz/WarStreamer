import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

module.exports = {
  plugins: [
    new EnvironmentPlugin(['API_URL_DEV']),
    new EnvironmentPlugin(['API_URL_PROD']),
    new EnvironmentPlugin(['API_ISSUER']),
    new EnvironmentPlugin(['DISCORD_APP_ID']),
    new EnvironmentPlugin(['TOKEN_KEY']),
    new EnvironmentPlugin(['USER_KEY']),
    new EnvironmentPlugin(['LANGUAGE_KEY']),
  ],
};
