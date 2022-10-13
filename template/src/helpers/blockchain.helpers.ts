import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { CoinbaseWallet, Injected, WalletConnect } from 'connectors/connectors';
import { ChainInfo, CHAINS_INFO } from 'connectors/networks';
import { ConnectorItem } from 'enums/connectors.enum';
import { StorageItem } from 'enums/storage-item.enum';
import { genericErrorHandler } from './error.helpers';
import { storage } from './storage.helpers';

export function getWalletConnected():
  | WalletLinkConnector
  | InjectedConnector
  | WalletConnectConnector
  | null {
  const connector = storage.local.get<string>(StorageItem.WALLETCONNECTED);
  if (!connector) return null;
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
  value: string,
) => {
  const info: ChainInfo = CHAINS_INFO[value];
  try {
    await library.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: info.chainId }],
    });
  } catch (switchError: any) {
    // 4902 error code indicates the chain is missing on the wallet
    if (switchError.code === 4902) {
      try {
        await library.provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: info.chainId,
              chainName: info.chainName,
              rpcUrls: info.rpcUrls,
              nativeCurrency: info.nativeCurrency,
              blockExplorerUrls: info.blockExplorerUrls,
            },
          ],
        });
      } catch (error) {
        genericErrorHandler(error);
      }
    }
  }
};
