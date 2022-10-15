import { Color } from 'design/types/color';
import { Theme } from 'design/types/theme';
import { fontFamily } from './font-family';
import { palette } from './palette';

export const getBaseTheme = (
  textColor: Color,
): Omit<Theme, 'mode' | 'background'> => ({
  palette,
  baseSize: 16,
  fontFamily,
  components: {
    text: {
      p: {
        color: textColor,
        fontSize: 1,
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily,
      },
      label: {
        color: textColor,
        fontSize: 0.9,
        fontWeight: 100,
        lineHeight: 1.5,
        fontFamily,
      },
      h1: {
        color: textColor,
        fontSize: 2.5,
        fontWeight: 100,
        lineHeight: 1.5,
        fontFamily,
      },
      h2: {
        color: textColor,
        fontSize: 1.8,
        fontWeight: 100,
        lineHeight: 1.5,
        fontFamily,
      },
      h3: {
        color: textColor,
        fontSize: 1.4,
        fontWeight: 100,
        lineHeight: 1.5,
        fontFamily,
      },
      h4: {
        color: textColor,
        fontSize: 1.3,
        fontWeight: 100,
        lineHeight: 1.5,
        fontFamily,
      },
      h5: {
        color: textColor,
        fontSize: 1.2,
        fontWeight: 100,
        lineHeight: 1.5,
        fontFamily,
      },
      h6: {
        color: textColor,
        fontSize: 1.1,
        fontWeight: 100,
        lineHeight: 1.5,
        fontFamily,
      },
    },
    icon: {
      size: {
        small: 0.75,
        medium: 1.5,
        large: 2.25,
      },
    },
    input: {
      invertColor: palette.white,
    },
  },
  borderRadius: {
    large: 1,
    medium: 0.5,
    small: 0.25,
  },
});
