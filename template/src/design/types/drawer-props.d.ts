export type AnchorProps = {
  anchor: 'left' | 'right';
}

export type DrawerProps = {
  open: boolean,
  anchor?: AnchorProps.anchor,
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
};
