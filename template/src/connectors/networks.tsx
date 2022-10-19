import { ChainInfo } from './types/chain-info';

export const CHAINS_INFO: { harmony: ChainInfo; arbitrum: ChainInfo } = {
  harmony: {
    chainId: '0x63564c40',
    rpcUrls: ['https://api.harmony.one'],
    chainName: 'Harmony Mainnet',
    nativeCurrency: { name: 'ONE', decimals: 18, symbol: 'ONE' },
    blockExplorerUrls: ['https://explorer.harmony.one'],
  },
  arbitrum: {
    chainId: '0xA4B1',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    chainName: 'Arbitrum Onet',
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    blockExplorerUrls: ['https://arbiscan.io/'],
  },
};
