import { Color } from 'design/types/color';
import { Theme } from 'design/types/theme';
import { palette } from './palette';

export const getBaseTheme = (
  textColor: Color,
): Omit<Theme, 'mode' | 'background'> => ({
  palette,
  baseSize: 16,
  components: {
    text: {
      p: {
        color: textColor,
        fontSize: 1,
        fontWeight: 100,
        lineHeight: 1.5,
      },
      label: {
        color: textColor,
        fontSize: 0.9,
        fontWeight: 100,
        lineHeight: 1.5,
      },
      h1: {
        color: textColor,
        fontSize: 2.5,
        fontWeight: 100,
        lineHeight: 1.5,
      },
      h2: {
        color: textColor,
        fontSize: 1.8,
        fontWeight: 100,
        lineHeight: 1.5,
      },
      h3: {
        color: textColor,
        fontSize: 1.4,
        fontWeight: 100,
        lineHeight: 1.5,
      },
      h4: {
        color: textColor,
        fontSize: 1.3,
        fontWeight: 100,
        lineHeight: 1.5,
      },
      h5: {
        color: textColor,
        fontSize: 1.2,
        fontWeight: 100,
        lineHeight: 1.5,
      },
      h6: {
        color: textColor,
        fontSize: 1.1,
        fontWeight: 100,
        lineHeight: 1.5,
      },
    },
    icon: {
      size: {
        small: 0.75,
        medium: 1.5,
        large: 2.25,
      },
    },
  },
  borderRadius: {
    large: 1,
    medium: 0.5,
    small: 0.25,
  },
});
