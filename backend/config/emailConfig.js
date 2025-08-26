const nodemailer = require("nodemailer");
const { logger } = require("../utils/logger");

let transporter = null;

// Создание транспорта для отправки email
const getTransporter = async () => {
  if (transporter) {
    return transporter;
  }

  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Проверяем соединение
    await transporter.verify();
    logger.info("✅ SMTP соединение установлено успешно");

    return transporter;
  } catch (error) {
    logger.error("❌ Ошибка создания SMTP транспорта:", error);
    throw error;
  }
};

module.exports = {
  getTransporter,
};
