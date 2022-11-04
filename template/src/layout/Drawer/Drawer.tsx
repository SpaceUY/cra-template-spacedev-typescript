import MuiDrawer from '@mui/material/Drawer';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { mapAnchorToMaterialDrawer } from 'design/helpers/theme.helpers';
import { DrawerProps } from 'design/types/drawer-props';
import { FC, useContext } from 'react';

const Drawer: FC<DrawerProps> = ({
  left,
  right,
  top,
  bottom,
  isOpen,
  onClose,
  children,
}) => {
  const { system } = useContext(DesignContext);

  if (system === DesignSystem.MATERIAL_UI) {
    return (
      <MuiDrawer
        anchor={mapAnchorToMaterialDrawer(left, right, top, bottom)}
        open={isOpen}
        onClose={onClose}
      >
        {children}
      </MuiDrawer>
    );
  }

  return null;
};
export default Drawer;
