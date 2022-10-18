import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { CoinbaseWallet, Injected, WalletConnect } from 'connectors/connectors';
import { CHAINS_INFO } from 'connectors/networks';
import { ChainInfo } from 'connectors/types/chain-info';
import { ConnectorItem } from 'enums/connector-item.enum';
import { StorageItem } from 'enums/storage-item.enum';
import { genericErrorHandler } from './error.helpers';
import { storage } from './storage.helpers';

export function getWalletConnected():
  | WalletLinkConnector
  | InjectedConnector
  | WalletConnectConnector
  | null {
  const connector = storage.local.get<string>(StorageItem.WALLETCONNECTED);
  if (!connector) {
    return null;
  }
  if (connector === ConnectorItem.COINBASE) {
    return CoinbaseWallet;
  }
  if (connector === ConnectorItem.WALLETCONNECT) {
    return WalletConnect;
  }
  return Injected;
}

export const switchNetwork = async (
  library: Record<string, any>,
  chainInfo: ChainInfo,
) => {
  try {
    await library.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainInfo.chainId }],
    });
  } catch (switchError: any) {
    // 4902 error code indicates the chain is missing on the wallet
    if (switchError.code === 4902) {
      try {
        await library.provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainInfo.chainId,
              chainName: chainInfo.chainName,
              rpcUrls: chainInfo.rpcUrls,
              nativeCurrency: chainInfo.nativeCurrency,
              blockExplorerUrls: chainInfo.blockExplorerUrls,
            },
          ],
        });
      } catch (error) {
        genericErrorHandler(error);
      }
    }
  }
};

export function getLibrary(provider: JsonRpcFetchFunc | ExternalProvider) {
  return new Web3Provider(provider);
}
