import { config } from 'config';
import { ThemeMode } from 'design/enums/theme-mode.enum';
import { Color } from 'design/types/color';
import { InputVariantProp } from 'design/types/input-variant-prop';
import { Theme } from 'design/types/theme';
import { StorageItem } from 'enums/storage-item.enum';
import { storage } from 'helpers/storage.helpers';

/**
 * # getStoredThemeMode
 *
 * Retrieves the stored ThemeMode (if any)
 *
 * Checks if it is supported and either
 * - clears the stored value and retuns `null`
 * - resurns the stored value
 *
 * @returns ThemeMode
 */
export function getStoredThemeMode(): ThemeMode | null {
  const storedThemeMode = storage.local.get<ThemeMode>(StorageItem.THEME_MODE);

  const isStoredThemeModeSupported =
    storedThemeMode &&
    config.theme.supportedThemeModes.includes(storedThemeMode);

  if (isStoredThemeModeSupported) {
    return storedThemeMode;
  }

  storage.local.remove(StorageItem.THEME_MODE);

  return null;
}

export function getPreferedThemeMode(): ThemeMode {
  const isDarkPreferred =
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    config.theme.supportedThemeModes.includes(ThemeMode.DARK);

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

export function mapVariantToMaterialButton(
  value?: InputVariantProp,
): 'outlined' | 'contained' | 'text' | undefined {
  switch (value) {
    case 'filled':
      return 'contained';
    case 'default':
      return 'text';
    case 'outlined':
      return 'outlined';
    default:
      break;
  }
}

export function mapVariantToMaterialInput(
  value?: InputVariantProp,
): 'outlined' | 'filled' | 'standard' | undefined {
  switch (value) {
    case 'filled':
      return 'filled';
    case 'default':
      return 'standard';
    case 'outlined':
      return 'outlined';
    default:
      break;
  }
}

export function mapSizeToMaterial(
  small?: boolean,
  medium?: boolean,
  large?: boolean,
): 'small' | 'medium' | 'large' | undefined {
  switch (true) {
    case small:
      return 'small';
    case medium:
      return 'medium';
    case large:
      return 'large';
    default:
      return;
  }
}
