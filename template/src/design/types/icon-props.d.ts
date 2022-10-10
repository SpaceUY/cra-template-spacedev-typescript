import { FcDefaultProps } from 'types/fc-default-props';
import { ColorProp } from './color-prop';

export type IconProps = FcDefaultProps & {
  color?: ColorProp;
  size?: number;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
};
