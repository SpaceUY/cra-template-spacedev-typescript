import { Color } from './color';

export type ColorProp =
  | Color
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';
