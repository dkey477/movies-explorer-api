require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
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
    'http://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3000',
    'https://localhost:3001',
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

app.use(router);

app.use(errorLogger);

app.use(RATE_LIMIT);

app.use(errors());
app.use(errorCenter);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT} `);
});
