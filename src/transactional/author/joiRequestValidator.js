import Joi from "joi";
import ErrorResponse from "../../utils/responses/errorResponse.js";
import SuccessResponse from "../../utils/responses/successResponse.js";


const validateRequest = (data, schema) => {
    const validationResult = schema.validate(data);
    if (validationResult.error) {
      return new ErrorResponse(validationResult.error.message);
    } else {
      return new SuccessResponse(validationResult.value);
    }
  };

const authorCreateRequest = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    country: Joi.string().max(50).required(),
  });

  return validateRequest(data, schema)
};

const authorUpdateRequest = (data) => {
    const schema = Joi.object({
      id: Joi.number().required().strict(),
      name: Joi.string().max(50),
      country: Joi.string().max(50),
    });
  
    return validateRequest(data, schema)
  };

const authorDeleteRequest = (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
  
    return validateRequest(data, schema)
  };

export { authorCreateRequest, authorUpdateRequest, authorDeleteRequest };
