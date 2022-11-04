export function mapAnchorToMaterialDrawer(
  left?: boolean,
  right?: boolean,
  top?: boolean,
  bottom?: boolean,
): 'left' | 'right' | 'top' | 'bottom' | undefined {
  switch (true) {
    case left:
      return 'left';
    case right:
      return 'right';
    case top:
      return 'top';
    case bottom:
      return 'bottom';
    default:
      return;
  }
}
