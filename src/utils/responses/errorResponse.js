import statusCodes from '../statuses/statusCodes.js';

class ErrorResponse {
  constructor(exception) {

    this.success = false;
    this.status = statusCodes.BAD_REQUEST;
    this.errorMessage = exception;
  }
}

export default ErrorResponse;