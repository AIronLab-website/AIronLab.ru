const { logger } = require('../utils/logger');

// Обертка для асинхронных функций
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Обработчик ошибок
const errorHandler = (err, req, res, next) => {
  logger.error('Ошибка обработки запроса:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Ошибки валидации
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Ошибка валидации данных',
      message: err.details[0].message,
      code: 'VALIDATION_ERROR',
      details: err.details
    });
  }

  // SMTP ошибки
  if (err.code && ['EAUTH', 'ECONNECTION', 'ETIMEDOUT'].includes(err.code)) {
    return res.status(500).json({
      error: 'Ошибка отправки email',
      message: err.message,
      code: 'SMTP_ERROR'
    });
  }

  // Rate limit ошибки
  if (err.status === 429) {
    return res.status(429).json({
      error: 'Слишком много запросов',
      message: 'Попробуйте позже',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }

  // Общие ошибки сервера
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Внутренняя ошибка сервера' 
    : err.message;

  res.status(statusCode).json({
    error: 'Ошибка сервера',
    message: message,
    code: 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = {
  asyncHandler,
  errorHandler
}; 