import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnect from '@walletconnect/web3-provider';

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'Web 3 Modal Demo', // Required
      infuraId: process.env.INFURA_KEY, // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: 'c22c90a767684c5fbd7257da57802b35', // required
    },
  },
};
