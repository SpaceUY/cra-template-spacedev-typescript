import { createAction } from '@reduxjs/toolkit';

export const setCounterValueAction = createAction(
  'SET_COUNTER_VALUE',
  (counter: number) => {
    return { payload: counter };
  },
);
