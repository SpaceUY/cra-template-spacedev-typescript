import { Icon } from 'design';
import { IconProps } from 'design/types/icon-props';
import { FC } from 'react';
import { XCircle } from 'react-feather';

export const CloseIcon: FC<IconProps> = (props) => {
  return <Icon feather={<XCircle />} {...props} />;
};
