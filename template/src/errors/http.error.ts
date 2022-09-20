import { HttpStatus } from 'enums/http-status.enum';

export class HttpError extends Error {
  constructor(message: string, public status: HttpStatus) {
    super(message);
  }
}
