// DEPENDENCIES
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const db = require('./models/index');

const errorHandler = require('./helpers/error');
const dataRoutes = require('./routes/data');
const userRoutes = require('./routes/auth');
const saltRoutes = require('./routes/salt');

// APP CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// Set up a whitelist and check against it:
// const whitelist = ['http://localhost:3000', 'http://example2.com'];
// const corsOptions = {
//   origin(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// Then pass them to cors:
// app.use(cors(corsOptions));

// GLOBAL VARIABLES
app.use((req, res, next) => {
  // input global variables here
  next();
});

// DATA RETURN
app.get('/', (req, res) => {
  res.status(200).json({
    requestType: 'HomePage',
  });
});

// ROUTES
app.use('/data', dataRoutes);
app.use('/user', userRoutes);
app.use('/salt', saltRoutes);

// UNFOUND ROUTE
app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

// RUN SERVER
app.listen(8081, () => {
  console.log('server started');
});
