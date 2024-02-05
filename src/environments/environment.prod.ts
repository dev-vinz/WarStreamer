export const environment = {
  production: true,
  apiUrl: process.env['API_URL_PROD'] as string,
  authentication: {
    accessTokenValidity: process.env['ACCESS_TOKEN_VALIDITY'] as string,
    apiIssuer: process.env['API_ISSUER'] as string,
    discordAppId: process.env['DISCORD_APP_ID'] as string,
  },
  localStorage: {
    languageKey: process.env['LANGUAGE_KEY'] as string,
    lastAccessKey: process.env['LAST_ACCESS_KEY'] as string,
    tokenKey: process.env['TOKEN_KEY'] as string,
    userKey: process.env['USER_KEY'] as string,
  },
};
