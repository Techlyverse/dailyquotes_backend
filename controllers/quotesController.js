const quotesService = require('../services/quotesService');
const messages = require('../utils/messages');
const response = require('../utils/response');
const statusCodes = require('../utils/statusCodes');

exports.createQuotes = async (req, res) => {
  const { author, bio, quotes } = req.body;

  if (!author || !quotes) {
    return response.errorResponse(
      res,
      statusCodes.CLIENT_ERROR.BAD_REQUEST,
      messages.ERROR.VALIDATION.MISSING_FIELDS
    );
  }

  try {
    const data = { author, bio, quotes };
    const savedQuote = await quotesService.createQuote(data);
    return response.successResponse(
      res,
      statusCodes.SUCCESS.CREATED,
      messages.SUCCESS.CREATE,
      savedQuote
    );
  } catch (error) {
    console.error(messages.ERROR.CREATE, error);
    return response.errorResponse(
      res,
      statusCodes.SERVER_ERROR.INTERNAL,
      messages.ERROR.SERVER_ERROR,
      error.message
    );
  }
};

exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await quotesService.getAllQuotes();
    return response.successResponse(
      res,
      statusCodes.SUCCESS.OK,
      messages.SUCCESS.FETCH_ALL,
      quotes
    );
  } catch (error) {
    console.error(messages.ERROR.FETCH_ALL, error);
    return response.errorResponse(
      res,
      statusCodes.SERVER_ERROR.INTERNAL,
      messages.ERROR.SERVER_ERROR,
      error.message
    );
  }
};

exports.updateQuote = async (req, res) => {
  const { id } = req.params;
  const { quotes, author, bio } = req.body;

  try {
    const updatedQuote = await quotesService.updateQuoteById(id, { quotes, author, bio });

    if (!updatedQuote) {
      return response.errorResponse(
        res,
        statusCodes.CLIENT_ERROR.NOT_FOUND,
        messages.ERROR.NOT_FOUND
      );
    }

    return response.successResponse(
      res,
      statusCodes.SUCCESS.OK,
      messages.SUCCESS.UPDATE,
      updatedQuote
    );
  } catch (error) {
    console.error(messages.ERROR.UPDATE, error);
    return response.errorResponse(
      res,
      statusCodes.SERVER_ERROR.INTERNAL,
      messages.ERROR.SERVER_ERROR,
      error.message
    );
  }
};

exports.deleteQuote = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuote = await quotesService.deleteQuoteById(id);

    if (!deleteQuote) {
      return response.errorResponse(
        res,
        statusCodes.CLIENT_ERROR.NOT_FOUND,
        messages.ERROR.NOT_FOUND
      );
    }

    return response.successResponse(
      res,
      statusCodes.SUCCESS.OK,
      messages.SUCCESS.DELETE,
      deleteQuote
    );
  } catch (error) {
    console.error(messages.ERROR.DELETE, error);
    return response.errorResponse(
      res,
      statusCodes.SERVER_ERROR.INTERNAL,
      messages.ERROR.SERVER_ERROR,
      error.message
    );
  }
};
exports.getQuotesStats = async (req, res) => {
  try {
    const stats = await quotesService.getQuotesStatsByAuthor();
    if (!stats || stats.length === 0) {
      return response.errorResponse(
        res,
        statusCodes.CLIENT_ERROR.NOT_FOUND,
        messages.ERROR.NOT_FOUND
      );
    }
    return response.successResponse(
      res,
      statusCodes.SUCCESS.OK,
      messages.SUCCESS.FETCH_ALL,
      stats
    );
  } catch (error) {
    console.error(messages.ERROR.FETCH_ALL, error);
    return response.errorResponse(
      res,
      statusCodes.SERVER_ERROR.INTERNAL,
      messages.ERROR.SERVER_ERROR,
      error.message
    );
  }
};
