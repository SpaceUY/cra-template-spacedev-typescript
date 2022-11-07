import { useWeb3React } from '@web3-react/core';
import { toast } from 'components/Toast/Toast';
import { Button, Text } from 'design';
import { DesignContext } from 'design/DesignContext';
import { ThemeMode } from 'design/enums/theme-mode.enum';
import { AppRoute } from 'enums/app-route.enum';
import { StorageItem } from 'enums/storage-item.enum';
import { SideNavBar } from 'examples/components/AppBar/SideNavBar';
import { ConnectModal } from 'examples/components/ConnectModal/ConnectModal';
import { removeAuthTokenAction } from 'global-state/actions';
import { selectAuthToken } from 'global-state/selectors';
import { genericErrorHandler } from 'helpers/error.helpers';
import { storage } from 'helpers/storage.helpers';
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
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';
import { StyledAlign, StyledNavLink } from './appbar.styled';
import spaceLogoDarkPath from './assets/spacedev-logo-dark.svg';
import spaceLogoLightPath from './assets/spacedev-logo-light.svg';
import { navItems } from './nav-items';

const StyledH1 = styled(Text.h1)`
  line-height: 1.5rem;
`;

const StyledA = styled.a`
  text-decoration: none;
  line-height: 1.5rem;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: none;
  }
`;

const StyledSideNavBarDiv = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: flex;
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
      disconnect();
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
            <img src={spaceLogoPath} alt="" height="40" />
          </StyledA>
        </StyledH1>

        {authToken && (
          <Align v-center gap={0.5}>
            <StyledNav>
              {navItems.map((item) => (
                <StyledNavLink key={item.label} to={item.to} end>
                  {item.label}
                </StyledNavLink>
              ))}

              <Button color="primary" onClick={handleLogout} large>
                {intl.translate({ id: 'Logout' })}
              </Button>

              {pathname === AppRoute.BLOCKCHAIN && (
                <Button color="primary" onClick={getFunction} large>
                  {BlockchainButtonLabel}
                </Button>
              )}
            </StyledNav>

            <StyledSideNavBarDiv>
              <SideNavBar
                pathname={pathname}
                getFunction={getFunction}
                blockchainButtonLabel={BlockchainButtonLabel}
              />
            </StyledSideNavBarDiv>
          </Align>
        )}
      </StyledAlign>
    </>
  );
};
