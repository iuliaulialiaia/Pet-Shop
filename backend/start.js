const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const createError = require('http-errors');
const {routes} = require('./Controller');
const {ServerError} = require('./Entity/ServerError');

const app = express();

app.use(helmet());
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(cors());
app.use(express.json());

app.use('/', routes);

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    let status = 500;
    let message = 'Server error';
    if (err instanceof ServerError) {
      status = err.getStatusCode;
      message = err.getMessage;
    }
    return next(createError(status, message));
  }
});

const port = parseInt(process.env.PORT);
app.listen(port,
  () => console.log(`App is listening on ${port}...`)
);