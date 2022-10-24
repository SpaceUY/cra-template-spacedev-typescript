import { createTheme, ThemeProvider } from '@mui/material';
import { StorageItem } from 'enums/storage-item.enum';
import { storage } from 'helpers/storage.helpers';
import {
  createContext,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { DesignSystem } from './enums/design-system.enum';
import { ThemeMode } from './enums/theme-mode.enum';
import {
  getPreferedThemeMode,
  getStoredThemeMode,
  mapThemeToMaterial
} from './helpers/theme.helpers';
import { usePrefersColorScheme } from './hooks/use-prefers-color-scheme';
import { darkTheme } from './theme/dark-theme';
import { lightTheme } from './theme/light-theme';
import { Theme } from './types/theme';

const themes: Record<ThemeMode, Theme> = {
  [ThemeMode.LIGHT]: lightTheme,
  [ThemeMode.DARK]: darkTheme,
};

const defaultThemeMode = getStoredThemeMode() ?? getPreferedThemeMode();

export const DesignContext = createContext({
  system: DesignSystem.DEFAULT,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSystem: (_: SetStateAction<DesignSystem>) => {
    // no-op, this is a placeholder for typing purposes only
  },
  theme: themes[defaultThemeMode],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (mode: ThemeMode) => {
    // no-op, this is a placeholder for typing purposes only
  },
});

export const DesignProvider: FC<{
  children?: ReactNode;
  system?: DesignSystem;
  theme?: Theme;
}> = ({
  children,
  system = DesignSystem.DEFAULT,
  theme = themes[defaultThemeMode],
}) => {
  const preferredMode = usePrefersColorScheme(defaultThemeMode);
  const [_system, setSystem] = useState<DesignSystem>(system);
  const [_theme, setTheme] = useState<Theme>(theme);

  const updateTheme = useCallback((mode: ThemeMode) => {
    storage.local.set(StorageItem.THEME_MODE, mode);

    setTheme(themes[mode]);
  }, []);

  useEffect(() => {
    updateTheme(preferredMode);
  }, [preferredMode, updateTheme]);

  if (_system === DesignSystem.MATERIAL_UI) {
    const materialTheme = createTheme(mapThemeToMaterial(_theme));

    return (
      <DesignContext.Provider
        value={{
          system: _system,
          setSystem,
          theme: _theme,
          setTheme: updateTheme,
        }}
      >
        <ThemeProvider theme={materialTheme}>
          <StyledComponentsThemeProvider theme={_theme}>
            {children}
          </StyledComponentsThemeProvider>
        </ThemeProvider>
      </DesignContext.Provider>
    );
  }

  return (
    <DesignContext.Provider
      value={{
        system: _system,
        setSystem,
        theme: _theme,
        setTheme: updateTheme,
      }}
    >
      <StyledComponentsThemeProvider theme={theme}>
        {children}
      </StyledComponentsThemeProvider>
    </DesignContext.Provider>
  );
};
