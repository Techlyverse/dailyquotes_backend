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
exports.getQuotesStatsByAuthor = async () => {
  return await Quotes.aggregate([

    {
      $group: {
        _id: "$author", 
        totalQuotes: { $sum: 1 },
        quotes: { $push: "$quotes" }, 
      },
    },

    {
      $project: {
        author: "$_id", 
        totalQuotes: 1, 
        avgQuoteLength: {
          $avg: {
            $map:{
              input:"$quotes",
              as: "q",
              in:{
                $strLenCP: "$$q"
              }
            },

          },
        },
        _id: 0,
      },
    },

    {
      $sort: {
        totalQuotes: 1,
      },
    },
  ]);
};