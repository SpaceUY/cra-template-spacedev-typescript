export const themes = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const supportedThemeModes = [themes.DARK, themes.LIGHT];

export const isDarkPreferred =
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    supportedThemeModes.includes(themes.DARK);