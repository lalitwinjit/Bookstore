import prisma  from "../../prismaClient.js";
import errors from "../../utils/errors/errors.js";
import ErrorResponse from "../../utils/responses/errorResponse.js";
import FailureResponse from "../../utils/responses/failureResponse.js";
import SuccessResponse from "../../utils/responses/successResponse.js";
import { authorCreateRequest, authorDeleteRequest, authorUpdateRequest } from "./joiRequestValidator.js";

const authorActions = {

  createAuthor: async (data) => {

    const validateRequest = await authorCreateRequest(data);
    if (validateRequest.success == false) {
      return validateRequest;
    }

    const { name, country } = data;

    try {

      const author = await prisma.author.create({
        data: { name, country },
      });

      return new SuccessResponse(author);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },

  getAllAuthors: async (data) => {

    try {

      const author = await prisma.author.findMany({
        where: { isDeleted: false },
        select: { id: true, name: true, country: true },
      });

      return new SuccessResponse(author);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },

  updateAuthor: async (data) => {

    const validateRequest = await authorUpdateRequest(data);
    if (validateRequest.success == false) {
      return validateRequest;
    }

    const { id, name, country } = data;

    try {

      const authorExists = await prisma.author.findUnique({
        where: { id, isDeleted: false },
      });

      if (!authorExists) {
        return new FailureResponse(errors.AUTHOR_NOT_FOUND);
      }

      const author = await prisma.author.update({
        where: { id },
        data: { name, country },
        select: { id: true, name: true, country: true}
      });

      return new SuccessResponse(author);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },

  deleteAuthor: async (data) => {
    
    const validateRequest = await authorDeleteRequest(data);
    if (validateRequest.success == false) {
      return validateRequest;
    }

    const { id } = data;

    try {
      const authorExists = await prisma.author.findUnique({
        where: { id: parseInt(id), isDeleted: false },
      });

      if (!authorExists) {
        return new FailureResponse(errors.AUTHOR_NOT_FOUND);
      }

      const author = await prisma.author.update({
        where: { id: parseInt(id) },
        data: { isDeleted: true },
        select: { id: true, name: true, country: true}
      });

      return new SuccessResponse(author);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },
};

export default authorActions