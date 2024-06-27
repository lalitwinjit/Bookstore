import statusCodes from '../statuses/statusCodes.js';

class SuccessResponse {
  constructor(data, status = statusCodes.OK) {
    console.log(data);
    this.success = true;
    this.status = status;
    this.data = data ? data : null;
  }
}

export default SuccessResponse;