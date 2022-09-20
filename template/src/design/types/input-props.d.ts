import { FormikErrors } from 'formik';
import { ColorProp } from './color-prop';
import { InputVariantProp } from './input-variant-prop';
import { OnChangeHandlerFn } from './on-change-handler-fn';

export type InputProps<T> = {
  label: string;
  name: string;
  id?: string;
  value: T;
  onChange: OnChangeHandlerFn<T>;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  fullWidth?: boolean;
  color?: ColorProp;
  size?: 'small' | 'medium';
  variant?: InputVariantProp;
};
