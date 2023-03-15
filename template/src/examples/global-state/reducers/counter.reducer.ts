import { createReducer } from '@reduxjs/toolkit';
import { setCounterValueAction } from 'examples/global-state/actions';

export type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

export const counterReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCounterValueAction, (state, action) => {
    state.count = action.payload;
  });
});
