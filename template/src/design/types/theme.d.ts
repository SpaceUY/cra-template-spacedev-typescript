import { ThemeMode } from 'design/enums/theme-mode.enum';
import { Color } from './color';
import { Palette } from './palette';
import { TextComponent } from './text-component';

export type Theme = {
  mode: ThemeMode;
  palette: Palette;
  baseSize: number; // must match 1rem
  fontFamily: string;
  components: {
    text: {
      p: TextComponent;
      label: TextComponent;
      h1: TextComponent;
      h2: TextComponent;
      h3: TextComponent;
      h4: TextComponent;
      h5: TextComponent;
      h6: TextComponent;
    };
    icon: {
      size: {
        small: number;
        medium: number;
        large: number;
      };
    };
    input: {
      invertColor: Color;
    };
  };
  background: {
    back: string;
    middle: string;
    front: string;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
};
