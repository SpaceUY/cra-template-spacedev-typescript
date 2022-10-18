import { useWeb3React } from '@web3-react/core';
import { Button, Text } from 'design';
import { DesignContext } from 'design/DesignContext';
import { ThemeMode } from 'design/enums/theme-mode.enum';
import { AppRoute } from 'enums/app-route.enum';
import { removeAuthTokenAction } from 'global-state/actions';
import { selectAuthToken } from 'global-state/selectors';
import { rgba } from 'helpers/color.helpers';
import { Align } from 'layout';
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'components/Toast/Toast';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';
import spaceLogoDarkPath from './assets/spacedev-logo-dark.svg';
import spaceLogoLightPath from './assets/spacedev-logo-light.svg';
import { StorageItem } from 'enums/storage-item.enum';
import { genericErrorHandler } from 'helpers/error.helpers';
import { noop } from 'helpers/nodash.helpers';
import { storage } from 'helpers/storage.helpers';
import { ConnectModal } from '../ConnectModal/ConnectModal';

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

/**
 * #####       ####
 *   #    ###  #   #  ###
 *   #   #   # #   # #   #
 *   #   #   # #   # #   #
 *   #    ###  ####   ###
 *
 * ToDo: check why color doesn't apply on StyledNavLink
 */

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
  const [blockchainModal, setBlockchainModal] = useState<boolean>(false);
  const authToken = useSelector(selectAuthToken);
  const location = useLocation();
  const { account, deactivate, error: web3Error } = useWeb3React();
  const dispatch = useDispatch();
  const spaceLogoPath =
    mode === ThemeMode.LIGHT ? spaceLogoLightPath : spaceLogoDarkPath;

  const handleLogout = () => {
    dispatch(removeAuthTokenAction());
  };

  const disconnect = () => {
    try {
      deactivate();
      storage.local.remove(StorageItem.WALLETCONNECTED);
    } catch (error) {
      genericErrorHandler(error);
    }
  };

  useEffect(() => {
    if (web3Error?.message) {
      toast.error('Chain not supported');
    }
  }, [web3Error?.message]);

  const BlockchainButtonLabel = useMemo(() => {
    if (web3Error?.message) {
      return intl.translate({ id: 'Wrong Network' });
    }
    if (account) {
      return intl.translate({ id: 'Disconnect' });
    }
    return intl.translate({ id: 'Connect Wallet' });
  }, [web3Error, account]);

  const getFunction = useCallback(() => {
    if (web3Error?.message) {
      return;
    }

    if (account) {
      disconnect();
    }

    setBlockchainModal(true);
  }, [web3Error, account]);

  const { pathname } = location;
  return (
    <>
      <ConnectModal
        setBlockchainModal={setBlockchainModal}
        isOpen={blockchainModal}
      />
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
              <StyledNavLink to={AppRoute.BLOCKCHAIN}>
                {intl.translate({ id: 'Blockchain' })}
              </StyledNavLink>
            </nav>

            <Button color="primary" onClick={handleLogout}>
              {intl.translate({ id: 'Logout' })}
            </Button>
          </Align>
        )}
        {pathname === AppRoute.BLOCKCHAIN && (
          <Button color="primary" onClick={getFunction}>
            {BlockchainButtonLabel}
          </Button>
        )}
      </StyledAlign>
    </>
  );
};
