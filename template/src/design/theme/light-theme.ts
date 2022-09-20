import { ThemeMode } from 'design/enums/theme-mode.enum';
import { Color } from 'design/types/color';
import { Theme } from 'design/types/theme';
import { getBaseTheme } from './base-theme';

const textColor: Color = {
  dark: '#333',
  main: '#555',
  light: '#888',
  invert: '#fff',
};

export const lightTheme: Theme = {
  ...getBaseTheme(textColor),
  mode: ThemeMode.LIGHT,
  background: {
    back: '#f5f5f5',
    middle: '#fbfbfb',
    front: '#fff',
  },
};
