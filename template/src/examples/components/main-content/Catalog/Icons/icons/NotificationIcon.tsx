import { Icon } from 'design';
import { IconProps } from 'design/types/icon-props';
import { FC } from 'react';
import { Bell } from 'react-feather';

export const NotificationIcon: FC<IconProps> = (props) => {
  return <Icon feather={<Bell />} {...props} />;
};
