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

const bookCreateRequest = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    language: Joi.string().max(50).required(),
    genre: Joi.string().max(50).required(),
    price: Joi.number().required().strict(),
    authorId: Joi.number().required().strict(),

  });

  return validateRequest(data, schema)
};

const bookUpdateRequest = (data) => {
    const schema = Joi.object({
      id: Joi.number().required().strict(),
      name: Joi.string().max(50).optional(),
      language: Joi.string().max(50).optional(),
      genre: Joi.string().max(50).optional(),
      price: Joi.number().max(50).optional().strict(),
      authorId: Joi.number().max(50).optional().strict(),
    });
  
    return validateRequest(data, schema)
  };

const authorDeleteRequest = (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
  
    return validateRequest(data, schema)
  };

  const bookFilterRequest = (data) => {
    const schema = Joi.object({
      authorName: Joi.string().required(),
      genre: Joi.string().required(),
    });
  
    return validateRequest(data, schema)
  };

  const priceRangeRequest = (data) => {
    const schema = Joi.object({
      minPrice: Joi.number().required().strict(),
      maxPrice: Joi.number().required().strict(),
    });
  
    return validateRequest(data, schema)
  };

export { bookCreateRequest, bookUpdateRequest, authorDeleteRequest, bookFilterRequest, priceRangeRequest };
