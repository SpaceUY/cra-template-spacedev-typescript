import { createReducer } from '@reduxjs/toolkit';
import { setShowModal } from 'global-state/actions';

export type BlockchainState = {
  showModal: boolean;
};

const initialState: BlockchainState = {
  showModal: false,
};

export const blockchainReducer = createReducer(initialState, (builder) => {
  builder.addCase(setShowModal, (state, action) => {
    state.showModal = action.payload;
  });
});
