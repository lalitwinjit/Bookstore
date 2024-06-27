import prisma from "../../prismaClient.js";
import errors from "../../utils/errors/errors.js";
import ErrorResponse from "../../utils/responses/errorResponse.js";
import FailureResponse from "../../utils/responses/failureResponse.js";
import SuccessResponse from "../../utils/responses/successResponse.js";
import {
  bookCreateRequest,
  authorDeleteRequest,
  bookUpdateRequest,
  bookFilterRequest,
  priceRangeRequest,
} from "./joiRequestValidator.js";

const bookActions = {

  createBook: async (data) => {

    const validateRequest = await bookCreateRequest(data);
    if (validateRequest.success == false) {
      return validateRequest;
    }

    const { name, language, genre, price, authorId } = data;

    try {

      const authorExists = await prisma.author.findUnique({
        where: { id: authorId, isDeleted: false },
      });

      if (!authorExists) {
        return new FailureResponse(errors.NOT_VALID_AUTHOR);
      }

      const book = await prisma.book.create({
        data: { name, language, genre, price, authorId },
        select: { name: true, authorId: true, language: true, genre: true, price: true}
      });

      return new SuccessResponse(book);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },

  getAllBooks: async (data) => {

    try {

      const book = await prisma.book.findMany({
        where: { isDeleted: false },
        include: { author: true },
      });

      return new SuccessResponse(book);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },

  updateBook: async (data) => {

    const validateRequest = await bookUpdateRequest(data);
    if (validateRequest.success == false) {
      return validateRequest;
    }

    const { id, name, language, genre, price, authorId } = data;

    try {

      const bookExists = await prisma.book.findUnique({
        where: { id, isDeleted: false },
      });

      if (!bookExists) {
        return new FailureResponse(errors.BOOK_NOT_FOUND);
      }

      const book = await prisma.book.update({
        where: { id },
        data: { name, language, genre, price, authorId },
      });

      return new SuccessResponse(book);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },

  deleteBook: async (data) => {

    const validateRequest = await authorDeleteRequest(data);
    if (validateRequest.success == false) {
      return validateRequest;
    }

    const { id } = data;

    try {

      const bookExists = await prisma.book.findUnique({
        where: { id: parseInt(id), isDeleted: false },
      });

      if (!bookExists) {
        return new FailureResponse(errors.BOOK_NOT_FOUND);
      }

      const book = await prisma.book.update({
        where: { id: parseInt(id) },
        data: { isDeleted: true },
        select: {
            name: true,
            authorId: true,
            language: true,
            genre: true,
            price: true,
          },
      });

      return new SuccessResponse(book);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },

  filterBooks: async (data) => {

    const validateRequest = await bookFilterRequest(data);
    if (validateRequest.success == false) {
      return validateRequest;
    }

    const { authorName, genre } = data;

    try {

      const books = await prisma.book.findMany({
        where: {
          AND: [{ author: { name: authorName } }, { genre: genre }],
        },
        include: { author: true },
        
      });

      return new SuccessResponse(books);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },

  getBooksByPriceRange: async (data) => {

    const validateRequest = await priceRangeRequest(data);
    if (validateRequest.success == false) {
      return validateRequest;
    }

    const { minPrice, maxPrice } = data;
    
    try {

      const books = await prisma.book.findMany({
        where: {
          price: {
            gte: parseFloat(minPrice),
            lte: parseFloat(maxPrice),
          },
        },
        select: {
          name: true,
          authorId: true,
          language: true,
          genre: true,
          price: true,
        },
      });

      return new SuccessResponse(books);
    } catch (error) {
      return new ErrorResponse(error);
    }
  },
};

export default bookActions;
