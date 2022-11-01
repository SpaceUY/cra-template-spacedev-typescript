import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from 'design';
import { MenuIcon } from 'design/Icon/MenuIcon';
import { AppRoute } from 'enums/app-route.enum';
import { removeAuthTokenAction } from 'global-state/actions';
import { rgba } from 'helpers/color.helpers';
import { Align } from 'layout';
import Drawer from 'layout/Drawer/Drawer';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';

const StyledAlign = styled(Align)`
  margin-bottom: 2rem;
`;

const StyledMenuIconDiv = styled.div`
  height: 2.25rem;
  margin-top: 2.5rem;
  margin-left: 1.8rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small}rem;
  transition: all 200ms linear;
  color: ${({ theme }) => theme.palette.primary.main};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamily};
  width: 100%;

  &.active {
    background-color: ${({ theme }) => rgba(theme.palette.primary.main, 0.8)};
    color: ${({ theme }) => theme.palette.primary.invert};
  }
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
`;

export const SideNavBar: FC<{
  pathname: string;
  getFunction: () => void;
  blockchainButtonLabel: string;
}> = ({ pathname, getFunction, blockchainButtonLabel }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeAuthTokenAction());
  };

  const handleOnClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Button onClick={() => setMenuOpen(true)}>
        <MenuIcon color="primary" large />
      </Button>
      <Drawer anchor="right" isOpen={menuOpen} onClick={handleOnClick}>
        <StyledAlign column>
          <StyledMenuIconDiv onClick={handleOnClick}>
            <MenuIcon large color="primary" />
          </StyledMenuIconDiv>

          <List>
            <ListItem>
              <StyledNavLink to={AppRoute.HOME} end onClick={handleOnClick}>
                {intl.translate({ id: 'Home' })}
              </StyledNavLink>
            </ListItem>

            <ListItem>
              <StyledNavLink to={AppRoute.CATALOG} onClick={handleOnClick}>
                {intl.translate({ id: 'Catalog' })}
              </StyledNavLink>
            </ListItem>

            <ListItem>
              <StyledNavLink to={AppRoute.STATE} onClick={handleOnClick}>
                {intl.translate({ id: 'State' })}
              </StyledNavLink>
            </ListItem>

            <ListItem>
              <StyledNavLink to={AppRoute.BLOCKCHAIN} onClick={handleOnClick}>
                {intl.translate({ id: 'Blockchain' })}
              </StyledNavLink>
            </ListItem>

            <ListItem>
              <StyledButtonDiv>
                <Button color="primary" onClick={handleLogout} large>
                  {intl.translate({ id: 'Logout' })}
                </Button>
              </StyledButtonDiv>
            </ListItem>

            {pathname === AppRoute.BLOCKCHAIN && (
              <ListItem>
                <StyledButtonDiv onClick={handleOnClick}>
                  <Button color="primary" onClick={getFunction} large>
                    {blockchainButtonLabel}
                  </Button>
                </StyledButtonDiv>
              </ListItem>
            )}
          </List>
        </StyledAlign>
      </Drawer>
    </>
  );
};
