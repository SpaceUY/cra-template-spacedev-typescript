import { rgba } from 'helpers/color.helpers';
import { Align } from 'layout';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledAlign = styled(Align)`
  margin-bottom: 2rem;
`;

export const StyledNavLink = styled(NavLink)`
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
