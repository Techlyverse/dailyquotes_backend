const express = require('express');
const bodyParser = require('body-parser');
const authorRoutes = require('./routes/quotesRoutes');
const messages = require('./utils/messages');
const response = require('./utils/response');
const statusCodes = require('./utils/statusCodes');
require('./config/db');
require('dotenv').config(); 

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(bodyParser.json()); 
app.use('/api', authorRoutes);


app.use((req, res, next) => {
  response.errorResponse(res, statusCodes.CLIENT_ERROR.NOT_FOUND, messages.ERROR.WRONG_URL);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  response.errorResponse(res, statusCodes.SERVER_ERROR.INTERNAL, messages.ERROR.SERVER_ERROR);
  // res.status(500).json({ message: 'Something went wrong!' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
