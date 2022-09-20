import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Icon } from 'design';
import { IconProps } from 'design/types/icon-props';
import { FC } from 'react';

export const ClipboardIcon: FC<IconProps> = (props) => {
  return <Icon material={<ContentPasteIcon />} {...props} />;
};
