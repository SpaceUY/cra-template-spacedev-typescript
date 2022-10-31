import { ColorProp } from './color-prop';
import { InputVariantProp } from './input-variant-prop';

export type ButtonProps = Omit<
  React.HTMLProps<HTMLButtonElement>,
  'type' | 'color'
> & {
  variant?: InputVariantProp;
  color?: ColorProp;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: number;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
};
