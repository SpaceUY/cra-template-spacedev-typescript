import { AnchorProps, DrawerProps } from 'design/types/drawer-props';
import { FC } from 'react';
import styled from 'styled-components';

const StyledDrawer = styled.div<{ anchor: AnchorProps }>`
  left: ${({ anchor }) => (anchor === 'left' ? `0` : `auto`)};
  right: ${({ anchor }) => (anchor === 'right' ? `0` : `auto`)};
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.background.front};
`;

const StyledDrawerDiv = styled.div<DrawerProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  position: fixed;
`;

const handleChildClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation();
};

const Drawer: FC<DrawerProps> = ({
  anchor = 'left',
  isOpen,
  onClick,
  children,
}) => {
  return (
    <StyledDrawerDiv isOpen={isOpen} onClick={onClick}>
      <StyledDrawer anchor={anchor} onClick={handleChildClick}>
        {children}
      </StyledDrawer>
    </StyledDrawerDiv>
  );
};
export default Drawer;
