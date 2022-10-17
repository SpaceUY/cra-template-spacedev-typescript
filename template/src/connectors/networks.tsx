import { ChainInfo } from './types/chain-info';

export const CHAINS_INFO: { harmony: ChainInfo } = {
  harmony: {
    chainId: '0x63564c40',
    rpcUrls: ['https://api.harmony.one'],
    chainName: 'Harmony Mainnet',
    nativeCurrency: { name: 'ONE', decimals: 18, symbol: 'ONE' },
    blockExplorerUrls: ['https://explorer.harmony.one'],
  },
};
