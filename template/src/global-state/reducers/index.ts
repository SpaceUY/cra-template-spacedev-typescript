import { combineReducers } from 'redux';
import { blockchainReducer } from './blockchain.reducer';
import { authReducer } from './auth.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  blockchain: blockchainReducer,
});
