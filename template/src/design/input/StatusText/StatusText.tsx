import { FC } from 'react';
import { InputProps } from '../../types/input-props';
import { ErrorMessage } from './ErrorMessage';
import { HelperText } from './HelperText';

export const StatusText: FC<
  Pick<InputProps<unknown>, 'error' | 'helperText'>
> = ({ error, helperText }) => {
  if (helperText && !error) {
    return <HelperText>{helperText}</HelperText>;
  }

  if (error) {
    return <ErrorMessage>{error.toString()}</ErrorMessage>;
  }

  return null;
};
