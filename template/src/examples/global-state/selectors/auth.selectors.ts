import { AuthState } from 'examples/global-state/reducers/auth.reducer';

export const selectAuthToken = (state: { auth: AuthState }) =>
  state.auth.authToken;
