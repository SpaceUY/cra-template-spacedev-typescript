export const validationBreaksResponse = process.env
  .REACT_APP_VALIDATION_ERROR_BREAKS_RESPONSE
  ? process.env.REACT_APP_VALIDATION_ERROR_BREAKS_RESPONSE !== 'true'
  : false;
