require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const errorCenter = require('./middlewares/errorCenter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { MDB, PORT, RATE_LIMIT } = require('./utils/config');

const app = express();
app.use(requestLogger);

app.use(express.json());
mongoose.connect(MDB);
const corsOrigin = {
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  origin: [
    'http://mestoback.nomoreparties.sbs',
    'https://mestoback.nomoreparties.sbs',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
};

app.use(cors(corsOrigin));

app.use(cookieParser());

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(RATE_LIMIT);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorCenter);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT} `);
});
