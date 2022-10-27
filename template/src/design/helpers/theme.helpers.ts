import { config } from 'config';
import { ThemeMode } from 'design/enums/theme-mode.enum';
import { Color } from 'design/types/color';
import { Theme } from 'design/types/theme';
import { StorageItem } from 'enums/storage-item.enum';
import { storage } from 'helpers/storage.helpers';

export function getStoredThemeMode(): ThemeMode | null {
  return storage.local.get(StorageItem.THEME_MODE);
}

export const isDarkPreferred =
  window.matchMedia('(prefers-color-scheme: dark)').matches &&
  config.theme.supportedThemeModes.includes(ThemeMode.DARK);

export function getPreferedThemeMode(): ThemeMode {
  return isDarkPreferred ? ThemeMode.DARK : ThemeMode.LIGHT;
}

export function mapColorToMaterial(color: Color) {
  return {
    dark: color.dark,
    light: color.light,
    main: color.main,
    contrastText: color.invert,
  };
}

export function mapThemeToMaterial(theme: Theme) {
  return {
    palette: {
      mode: theme.mode,
      primary: mapColorToMaterial(theme.palette.primary),
      secondary: mapColorToMaterial(theme.palette.secondary),
      error: mapColorToMaterial(theme.palette.error),
      warning: mapColorToMaterial(theme.palette.warning),
      info: mapColorToMaterial(theme.palette.info),
      success: mapColorToMaterial(theme.palette.success),
    },
    typography: {
      fontFamily: theme.fontFamily,
    },
  };
}
