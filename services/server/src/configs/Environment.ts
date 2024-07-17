export const envConfig = {
  DISCORD_CLIENT_ID: {
    type: 'string',
    description: 'https://discord.com/developers/applications',
    optional: false,
    default: null,
  },
  DISCORD_CLIENT_SECRET: {
    type: 'string',
    description: 'https://discord.com/developers/applications',
    optional: false,
    default: null,
  },
  MYSQL_DATABASE: {
    type: 'string',
    description: 'Self Explanatory',
    optional: false,
    default: null,
  },
  MYSQL_USER: {
    type: 'string',
    description: 'Self Explanatory',
    optional: false,
    default: null,
  },
  MYSQL_PASSWORD: {
    type: 'string',
    description: 'Self Explanatory',
    optional: false,
    default: null,
  },
  MYSQL_HOST: {
    type: 'string',
    description: 'Self Explanatory',
    optional: false,
    default: null,
  },
  MYSQL_PORT: {
    type: 'number',
    description: 'Probably 3306',
    optional: true,
    default: 3306,
  },
  EXPRESS_PORT: {
    type: 'number',
    description: 'Probably 3030',
    optional: true,
    default: 3030,
  },
  AUTH_SECRET: {
    type: 'string',
    description: "openssl rand -base64 172 | tr -d '\\n'",
    optional: false,
    default: null,
  },
  PALLY_WS: {
    type: 'string',
    description: 'https://pally.gg/dashboard/settings/api-keys',
    optional: true,
    default: null,
  },
  PALLY_CHANNEL: {
    type: 'string',
    description: 'pally.gg channel',
    optional: true,
    default: null,
  },
} as const;

export type EnvironmentConfig = {
  [Property in keyof typeof envConfig]: (typeof envConfig)[Property]['optional'] extends true
    ? (typeof envConfig)[Property]['type'] extends `string`
      ? string | (typeof envConfig)[Property]['default']
      : (typeof envConfig)[Property]['type'] extends `number`
        ? number | (typeof envConfig)[Property]['default']
        : unknown | (typeof envConfig)[Property]['default']
    : (typeof envConfig)[Property]['type'] extends `string`
      ? string
      : (typeof envConfig)[Property]['type'] extends `number`
        ? number
        : unknown;
};
