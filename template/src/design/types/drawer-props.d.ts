export type AnchorProps = 'left' | 'right';

export type DrawerProps = {
  isOpen: boolean;
  anchor?: AnchorProps;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
