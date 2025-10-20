export type RepoKind = 'mock' | 'remote';

export type AppConfig = {
  repoKind: RepoKind;
  apiBaseUrl: string;
};

// Centralized app configuration to improve DIP and make composition configurable.
// In the future, this can read from Expo's app.json extra or env variables.
export const config: AppConfig = {
  repoKind: 'mock',
  apiBaseUrl: 'https://api.example.com',
};
