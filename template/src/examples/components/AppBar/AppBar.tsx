import { Button, Text } from 'design';
import { DesignContext } from 'design/DesignContext';
import { ThemeMode } from 'design/enums/theme-mode.enum';
import { AppRoute } from 'enums/app-route.enum';
import { removeAuthTokenAction } from 'global-state/actions';
import { selectAuthToken } from 'global-state/selectors';
import { rgba } from 'helpers/color.helpers';
import { Align } from 'layout';
import { FC, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';

import spaceLogoDarkPath from './assets/spacedev-logo-dark.svg';
import spaceLogoLightPath from './assets/spacedev-logo-light.svg';

const StyledAlign = styled(Align)`
  margin-bottom: 2rem;
`;

const StyledH1 = styled(Text.h1)`
  line-height: 1.5rem;
`;

const StyledA = styled.a`
  text-decoration: none;
  line-height: 1.5rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small}rem;
  transition: all 200ms linear;
  color: ${({ theme }) => theme.palette.primary.main};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamily};

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => rgba(theme.palette.primary.light, 0.15)};
  }

  &:focus {
    background-color: ${({ theme }) => rgba(theme.palette.primary.light, 0.15)};
    outline-color: ${({ theme }) => theme.palette.primary.main};
  }

  &.active {
    background-color: ${({ theme }) => rgba(theme.palette.primary.main, 0.8)};
    color: ${({ theme }) => theme.palette.primary.invert};
  }
`;

export const AppBar: FC = () => {
  const {
    theme: { mode },
  } = useContext(DesignContext);
  const authToken = useSelector(selectAuthToken);
  const dispatch = useDispatch();

  const spaceLogoPath =
    mode === ThemeMode.LIGHT ? spaceLogoLightPath : spaceLogoDarkPath;

  const handleLogout = () => {
    dispatch(removeAuthTokenAction());
  };

  return (
    <StyledAlign v-center h-between>
      <StyledH1>
        <StyledA
          href="https://www.spacedev.io/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SpaceDev CRA Template"
        >
          <img src={spaceLogoPath} alt="" height="48" />
        </StyledA>
      </StyledH1>

      {authToken && (
        <Align v-center gap={0.5}>
          <nav>
            <StyledNavLink to={AppRoute.HOME}>
              {intl.translate({ id: 'Home' })}
            </StyledNavLink>

            <StyledNavLink to={AppRoute.CATALOG}>
              {intl.translate({ id: 'Catalog' })}
            </StyledNavLink>

            <StyledNavLink to={AppRoute.STATE}>
              {intl.translate({ id: 'State' })}
            </StyledNavLink>
          </nav>

          <Button color="primary" onClick={handleLogout}>
            {intl.translate({ id: 'Logout' })}
          </Button>
        </Align>
      )}
    </StyledAlign>
  );
};
