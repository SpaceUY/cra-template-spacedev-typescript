import { Color } from './color';

export type TextComponent = {
  color: Color;
  lineHeight: number;
  fontSize: number;
  fontWeight: 100 | 400 | 700;
  fontFamily: string;
};
