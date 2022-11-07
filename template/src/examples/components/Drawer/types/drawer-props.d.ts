import { ModalProps } from '@mui/material';

export type DrawerProps = {
  isOpen: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  children?: React.ReactNode;
  onClose?: ModalProps['onClose'];
};
