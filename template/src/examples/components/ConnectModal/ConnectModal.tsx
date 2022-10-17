import { FC } from 'react';

import { useWeb3React } from '@web3-react/core';
import { CoinbaseWallet, Injected, WalletConnect } from 'connectors/connectors';
import { Box, Button, Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectShowModalBlockchain } from 'global-state/selectors/blockchain.selectors';
import { useDispatch } from 'react-redux';
import { setShowModal } from 'global-state/actions';
import { storage } from 'helpers/storage.helpers';
import { StorageItem } from 'enums/storage-item.enum';
import { ConnectorItem } from 'enums/connector-item.enum';
import { intl } from 'utilities/i18n/intl.utility';
import CoinbaseWalletPath from './assets/coinbaseWallet.png';
import MetamaskPath from './assets/metamask.png';
import walletConnectPath from './assets/walletConnect.png';
import styled from 'styled-components';

const style = {
  position: 'absolute',
  top: '50%',
  display: 'flex',
  flexDirection: 'column',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;
const StyledImg = styled.img`
  border-radius: 10%;
  margin-right: 10px;
  width: 60px;
`;

const ConnectModal: FC = () => {
  const { activate } = useWeb3React();
  const showModalBlockchain = useSelector(selectShowModalBlockchain);
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        onClose={() => {
          dispatch(setShowModal(!showModalBlockchain));
        }}
        open={showModalBlockchain}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StyledDiv>
            <StyledImg src={CoinbaseWalletPath} alt="" height="48" />
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
            <StyledImg src={MetamaskPath} alt="" height="48" />

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
        </Box>
      </Modal>
    </>
  );
};

export default ConnectModal;
