export const environment = {
  production: true,
  apiUrl: process.env['API_URL_PROD'] as string,
  authentication: {
    apiIssuer: process.env['API_ISSUER'] as string,
    discordAppId: process.env['DISCORD_APP_ID'] as string,
  },
  localStorage: {
    tokenKey: process.env['TOKEN_KEY'] as string,
    userKey: process.env['USER_KEY'] as string,
    languageKey: process.env['LANGUAGE_KEY'] as string,
  },
};
