const Quotes = require('../models/quotesModel');

exports.createQuote = async (data) => {
  const quote = new Quotes(data);
  return await quote.save();
};

exports.getAllQuotes = async (page, limit) => {
  const skip = (page - 1) * limit;
  const quotes = await Quotes.find().skip(skip).limit(limit);
  const total = await Quotes.countDocuments();
  return { quotes, total, page, limit };
};

exports.updateQuoteById = async (id, data) => {
  return await Quotes.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteQuoteById = async (id) => {
  return await Quotes.findByIdAndDelete(id);
};
