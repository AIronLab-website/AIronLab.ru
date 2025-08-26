const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const emailRoutes = require('./routes/email');
const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

// Настройка rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 минут
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // 5 запросов на IP
  message: {
    error: 'Слишком много запросов с этого IP адреса. Попробуйте позже.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(compression());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Логирование
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// Применяем rate limiting ко всем маршрутам
app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'AIronLab Email Backend'
  });
});

// API маршруты
app.use('/api/email', emailRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Маршрут не найден',
    code: 'NOT_FOUND'
  });
});

// Обработчик ошибок
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM получен, завершаем сервер...');
  server.close(() => {
    logger.info('Сервер закрыт');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT получен, завершаем сервер...');
  server.close(() => {
    logger.info('Сервер закрыт');
    process.exit(0);
  });
});

const server = app.listen(PORT, () => {
  logger.info(`🚀 Email сервер запущен на порту ${PORT}`);
  logger.info(`📧 SMTP хост: ${process.env.SMTP_HOST}`);
  logger.info(`🌍 Разрешенный домен: ${process.env.FRONTEND_URL}`);
});

module.exports = app; 