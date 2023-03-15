import { Button } from 'design';
import { MenuIcon } from 'design/Icon/MenuIcon';
import { AppRoute } from 'enums/app-route.enum';
import Drawer from 'examples/components/Drawer/Drawer';
import { removeAuthTokenAction } from 'examples/global-state/actions';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';
import { StyledAlign, StyledNavLink } from './appbar.styled';
import { navItems } from './nav-items';

const StyledMenuIconDiv = styled.div`
  height: 2.25rem;
  margin-top: 2.5rem;
  margin-left: 1.8rem;
`;

const StyledVerticalNavLink = styled(StyledNavLink)`
  width: 100%;
  margin: 0.5rem 1rem;
`;

const StyledButtonDiv = styled.div`
  text-decoration: none;
  padding-left: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small}rem;
  transition: all 200ms linear;
  color: ${({ theme }) => theme.palette.primary.main};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamily};
  width: 100%;
  margin: 0.5rem 1rem;
`;

export const SideNavBar: FC<{
  pathname: string;
  getFunction: () => void;
  blockchainButtonLabel: string;
}> = ({ pathname, getFunction, blockchainButtonLabel }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeAuthTokenAction());
  };

  const handleOnClick = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  return (
    <>
      <Button onClick={() => setIsOpenDrawer(true)}>
        <MenuIcon color="primary" large />
      </Button>
      <Drawer right isOpen={isOpenDrawer} onClose={handleOnClick}>
        <StyledAlign column>
          <StyledMenuIconDiv onClick={handleOnClick}>
            <MenuIcon large color="primary" />
          </StyledMenuIconDiv>

          {navItems.map((item) => (
            <StyledVerticalNavLink key={item.label} to={item.to} end>
              {item.label}
            </StyledVerticalNavLink>
          ))}

          <StyledButtonDiv>
            <Button color="primary" onClick={handleLogout} large>
              {intl.translate({ id: 'Logout' })}
            </Button>
          </StyledButtonDiv>

          {pathname === AppRoute.BLOCKCHAIN && (
            <StyledButtonDiv>
              <Button color="primary" onClick={getFunction} large>
                {blockchainButtonLabel}
              </Button>
            </StyledButtonDiv>
          )}
        </StyledAlign>
      </Drawer>
    </>
  );
};
