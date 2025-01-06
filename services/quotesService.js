const Quotes = require('../models/quotesModel');

exports.createQuote = async (data) => {
  const quote = new Quotes(data);
  return await quote.save();
};
exports.getAllQuotes = async () => {
  return await Quotes.find();
};
exports.updateQuoteById = async (id, data) => {
  return await Quotes.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteQuoteById = async (id) => {
  return await Quotes.findByIdAndDelete(id);
};
