import { Dispatch, FC, SetStateAction } from 'react';

import { useWeb3React } from '@web3-react/core';
import { CoinbaseWallet, Injected, WalletConnect } from 'connectors/connectors';
import { Button, Modal } from '@mui/material';
import { storage } from 'helpers/storage.helpers';
import { StorageItem } from 'enums/storage-item.enum';
import { ConnectorItem } from 'enums/connector-item.enum';
import { intl } from 'utilities/i18n/intl.utility';
import coinbaseWalletPath from './assets/coinbaseWallet.png';
import metamaskPath from './assets/metamask.png';
import walletConnectPath from './assets/walletConnect.png';
import styled from 'styled-components';

const StyledDivModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 400;
  bgcolor: background.paper;
  boxshadow: 24;
  p: 4;
`;
const StyledImg = styled.img`
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-right: 0.7rem;
  width: 3.75rem;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0.7rem 0;
`;
type Props = {
  isOpen: boolean;
  setBlockchainModal: Dispatch<SetStateAction<boolean>>;
};

export const ConnectModal: FC<Props> = ({ isOpen, setBlockchainModal }) => {
  const { activate } = useWeb3React();

  return (
    <>
      <Modal
        onClose={() => {
          setBlockchainModal(false);
        }}
        open={isOpen}
      >
        <StyledDivModal>
          <StyledDiv>
            <StyledImg src={coinbaseWalletPath} alt="" height="48" />
            <Button
              onClick={() => {
                activate(CoinbaseWallet);
                storage.local.set(
                  StorageItem.WALLETCONNECTED,
                  ConnectorItem.COINBASE,
                );
              }}
            >
              {intl.translate({ id: 'Coinbase Wallet' })}
            </Button>
          </StyledDiv>
          <StyledDiv>
            <StyledImg src={walletConnectPath} alt="" height="48" />
            <Button
              onClick={() => {
                activate(WalletConnect);
                storage.local.set(
                  StorageItem.WALLETCONNECTED,
                  ConnectorItem.WALLETCONNECT,
                );
              }}
            >
              {intl.translate({ id: 'Wallet Connect' })}
            </Button>
          </StyledDiv>

          <StyledDiv>
            <StyledImg src={metamaskPath} alt="" height="48" />

            <Button
              onClick={() => {
                activate(Injected);
                storage.local.set(
                  StorageItem.WALLETCONNECTED,
                  ConnectorItem.INJECTED,
                );
              }}
            >
              {intl.translate({ id: ' Metamask' })}
            </Button>
          </StyledDiv>
        </StyledDivModal>
      </Modal>
    </>
  );
};
