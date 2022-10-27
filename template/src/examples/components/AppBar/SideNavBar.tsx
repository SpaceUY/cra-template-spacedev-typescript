import { styled as styledMaterial } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from 'design';
import { MenuIcon } from 'design/Icon/MenuIcon';
import { AppRoute } from 'enums/app-route.enum';
import { removeAuthTokenAction } from 'global-state/actions';
import { rgba } from 'helpers/color.helpers';
import { Align } from 'layout';
import * as React from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';

const StyledAlign = styled(Align)`
  margin-bottom: 2rem;
`;

const StyledMenuIconDiv = styled.div`
  width: 100%;
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

const StyledButton = styledMaterial(Button)`
  font-size: medium;
`;

export const SideNavBar: FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeAuthTokenAction());
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setMenuOpen(open);
    };

  const getMenuItems = () => (
    <Box sx={{ width: 260 }} onClick={toggleDrawer(false)}>
      <StyledAlign column>
        <StyledMenuIconDiv>
          <MenuIcon large color="primary" />
        </StyledMenuIconDiv>
        <List>
          <ListItem>
            <StyledNavLink to={AppRoute.HOME} end>
              {intl.translate({ id: 'Home' })}
            </StyledNavLink>
          </ListItem>
          <ListItem>
            <StyledNavLink to={AppRoute.CATALOG}>
              {intl.translate({ id: 'Catalog' })}
            </StyledNavLink>
          </ListItem>
          <ListItem>
            <StyledNavLink to={AppRoute.STATE}>
              {intl.translate({ id: 'State' })}
            </StyledNavLink>
          </ListItem>
          <ListItem>
            <StyledNavLink to={AppRoute.BLOCKCHAIN}>
              {intl.translate({ id: 'Blockchain' })}
            </StyledNavLink>
          </ListItem>
          <ListItem>
            <StyledButtonDiv>
              <StyledButton color="primary" onClick={handleLogout}>
                {intl.translate({ id: 'Logout' })}
              </StyledButton>
            </StyledButtonDiv>
          </ListItem>
        </List>
      </StyledAlign>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon color="primary" large />
      </Button>
      <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer(false)}>
        {getMenuItems()}
      </Drawer>
    </>
  );
};
