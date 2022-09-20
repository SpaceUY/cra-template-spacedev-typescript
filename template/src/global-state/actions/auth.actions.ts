import { createAction } from '@reduxjs/toolkit';

export const setAuthTokenAction = createAction(
  'SET_AUTH_TOKEN',
  (token: string) => {
    return { payload: token };
  },
);

export const removeAuthTokenAction = createAction('REMOVE_AUTH_TOKEN');
