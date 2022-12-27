import { ThemeMode } from 'design/enums/theme-mode.enum';
import { Color } from 'design/types/color';
import { Theme } from 'design/types/theme';
import { getBaseTheme } from './base-theme';

const textColor: Color = {
  dark: '#aaa',
  main: '#fff',
  light: '#aaa',
  invert: '#fff',
};

export const darkTheme: Theme = {
  ...getBaseTheme(textColor),
  mode: ThemeMode.DARK,
  background: {
    back: '#111',
    middle: '#222',
    front: '#333',
  },
};
