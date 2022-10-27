import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Icon } from 'design';
import { IconProps } from 'design/types/icon-props';
import { FC } from 'react';

export const MenuIcon: FC<IconProps> = (props) => {
  return <Icon material={<MenuOutlinedIcon />} {...props} />;
};
