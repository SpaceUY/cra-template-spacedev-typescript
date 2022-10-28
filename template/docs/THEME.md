Create React App Starter Template by:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

**[Go Back](../README.md)**

# Theme

# Using the theme

If you need to use a `theme` value inside of a component, use the `useTheme` hook from `design/hooks/useTheme` instead of importing theme directly.

The `useTheme` hooks pulls directly from the `DesignProvider`, which will enable global changes to theme across the application without needing to refresh the page. `DesignProvider` is the source of truth for the app.

```typescript
// Bad
import { theme } from '...';

function MyComponent() {
  return <Comp color={theme.palette.primary} />;
}

// Good
import { useTheme } from 'design/hooks/useTheme';

function MyComponent() {
  const theme = useTheme();

  return <Comp color={theme.palette.primary} />;
}
```

For `styled-components`, use the injected theme:

```typescript
// Bad
import { theme } from '...';

const StyledDiv = styled.div`
  color: ${theme.baseColors.someColor};
`;

// Good
const StyledDiv = styled.div`
  color: ${({ theme }) => theme.baseColors.someColor};
`;
```

## Theme Modes

**Use the config `theme`**

> **Note:** By default the template supports light and dark themes

By changing this list the app wil enforce that only supported options are selectable.

If a user has selected an option, and later that option is removed they will be forced to a new option.

```typescript
//theme-modes.config.ts
export const supportedThemeModes = [themes.DARK, themes.LIGHT];
```
