import { FC } from 'react';
import { FcDefaultProps } from 'types/fc-default-props';

export const ListItem: FC<FcDefaultProps> = ({ children, ...rest }) => {
  return <li {...rest}>{children}</li>;
};
