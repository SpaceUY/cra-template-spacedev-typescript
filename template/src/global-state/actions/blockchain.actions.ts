import { createAction } from '@reduxjs/toolkit';

export const setShowModal = createAction('SET_SHOW_MODAL', (show: boolean) => {
  return { payload: show };
});
