Create React App Starter Template by:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

**[Go Back](../README.md)**

# Theme Modes

**Use the config `theme-modes`**

> **Note:** By default the template supports light and dark themes

```typescript
//theme-modes.config.ts
...

export const supportedThemeModes = [themes.DARK, themes.LIGHT];
```

if the dark theme is supported the system will choose based on the user's system configuration

```typescript
//theme.helpers.ts
...

export function getPreferedThemeMode(): ThemeMode {
  return config.themeModes.isDarkPreferred ? ThemeMode.DARK : ThemeMode.LIGHT;
}

...
```
