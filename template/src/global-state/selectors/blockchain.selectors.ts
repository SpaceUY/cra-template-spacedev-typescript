import { BlockchainState } from 'global-state/reducers/blockchain.reducer';

export const selectShowModalBlockchain = (state: {
  blockchain: BlockchainState;
}) => state.blockchain.showModal;
