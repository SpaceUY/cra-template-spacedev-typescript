import { createReducer } from '@reduxjs/toolkit';
import { StorageItem } from 'enums/storage-item.enum';
import {
  removeAuthTokenAction,
  setAuthTokenAction,
} from 'global-state/actions/auth.actions';
import { storage } from 'helpers/storage.helpers';

export type AuthState = {
  authToken: string | null;
};

const initialState: AuthState = {
  authToken: storage.session.get(StorageItem.AUTH_TOKEN),
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthTokenAction, (state, action) => {
      state.authToken = action.payload;

      storage.session.set(StorageItem.AUTH_TOKEN, action.payload);
    })
    .addCase(removeAuthTokenAction, (state) => {
      state.authToken = null;

      storage.session.remove(StorageItem.AUTH_TOKEN);
    });
});
