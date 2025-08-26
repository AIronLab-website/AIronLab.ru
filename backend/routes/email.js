const express = require('express');
const { getTransporter } = require('../config/emailConfig');
const { validateContactForm } = require('../validation/contactFormSchema');
const { generateContactEmailHtml, generateContactEmailText } = require('../templates/contactEmailTemplate');
const { asyncHandler } = require('../middleware/errorHandler');
const { logger } = require('../utils/logger');

const router = express.Router();

// POST /api/email/contact - Отправка формы обратной связи
router.post('/contact', asyncHandler(async (req, res) => {
  logger.info('Получен запрос на отправку формы обратной связи');

  // Добавляем метаданные
  const requestData = {
    ...req.body,
    referrer: req.get('Referer'),
    userAgent: req.get('User-Agent'),
    clientIP: req.ip || req.connection.remoteAddress
  };

  // Валидация данных
  const validatedData = validateContactForm(requestData);
  logger.debug('Данные формы валидированы:', {
    name: validatedData.name,
    email: validatedData.email,
    hasPhone: !!validatedData.phone,
    messageLength: validatedData.message.length
  });

  // Получаем транспорт
  const transporter = await getTransporter();

  // Формируем email
  const emailOptions = {
    from: {
      name: 'AIronLab Contact Form',
      address: process.env.EMAIL_FROM
    },
    to: process.env.EMAIL_TO,
    replyTo: {
      name: validatedData.name,
      address: validatedData.email
    },
    subject: `🚀 Новая заявка от ${validatedData.name}`,
    html: generateContactEmailHtml(validatedData),
    text: generateContactEmailText(validatedData),
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high'
    }
  };

  // Отправляем email
  try {
    const info = await transporter.sendMail(emailOptions);
    
    logger.info('Email успешно отправлен:', {
      messageId: info.messageId,
      response: info.response,
      clientName: validatedData.name,
      clientEmail: validatedData.email
    });

    res.status(200).json({
      success: true,
      message: 'Заявка успешно отправлена',
      messageId: info.messageId
    });

  } catch (emailError) {
    logger.error('Ошибка отправки email:', emailError);
    
    // Обогащаем ошибку информацией для лучшей диагностики
    if (emailError.code === 'EAUTH') {
      emailError.message = 'Ошибка аутентификации SMTP. Проверьте данные пользователя и пароль.';
    } else if (emailError.code === 'ECONNECTION') {
      emailError.message = 'Ошибка подключения к SMTP серверу. Проверьте настройки хоста и порта.';
    } else if (emailError.code === 'ETIMEDOUT') {
      emailError.message = 'Таймаут при подключении к SMTP серверу.';
    }
    
    throw emailError;
  }
}));

// GET /api/email/test - Тестирование email настроек (только для разработки)
router.get('/test', asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ error: 'Маршрут не найден' });
  }

  logger.info('Тестирование email настроек...');

  const transporter = await getTransporter();
  
  // Проверяем соединение
  const isConnected = await transporter.verify();
  
  if (isConnected) {
    logger.info('✅ SMTP соединение работает');
    
    // Отправляем тестовое письмо
    const testEmail = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: '🧪 Тестовое письмо AIronLab',
      html: `
        <h2>Тестовое письмо</h2>
        <p>Если вы получили это письмо, значит настройки SMTP работают корректно!</p>
        <p><strong>Время отправки:</strong> ${new Date().toLocaleString('ru-RU')}</p>
        <p><strong>Сервер:</strong> ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}</p>
      `,
      text: 'Тестовое письмо. SMTP настройки работают корректно!'
    };

    const info = await transporter.sendMail(testEmail);
    
    res.status(200).json({
      success: true,
      message: 'Тестовое письмо отправлено',
      connectionValid: true,
      messageId: info.messageId,
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true'
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Ошибка подключения к SMTP серверу',
      connectionValid: false
    });
  }
}));

// GET /api/email/status - Проверка статуса email сервиса
router.get('/status', asyncHandler(async (req, res) => {
  logger.info('Проверка статуса email сервиса');
  
  try {
    const transporter = await getTransporter();
    const isConnected = await transporter.verify();
    
    res.status(200).json({
      status: 'operational',
      smtp: {
        connected: isConnected,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Ошибка проверки статуса:', error);
    
    res.status(500).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}));

module.exports = router; 