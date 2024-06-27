
import statusCodes from '../statuses/statusCodes.js';

class FailureResponse {
  constructor(error) {
 

    this.success = false;
    this.status =  statusCodes.NOT_FOUND;
    this.errorMessage = error.message
  }
}

export default FailureResponse;
