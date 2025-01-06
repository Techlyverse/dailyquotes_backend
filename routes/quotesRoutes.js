const express = require('express');
const { createQuotes , getAllQuotes ,updateQuote , deleteQuote } = require('../controllers/quotesController');

const router = express.Router();


router.post('/quotes', createQuotes);
router.get("/quotes", getAllQuotes);
router.put("/quotes/:id", updateQuote);
router.delete("/quotes/:id", deleteQuote);

module.exports = router;
