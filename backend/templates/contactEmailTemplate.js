// HTML шаблон для email
const generateContactEmailHtml = (data) => {
  const utmInfo = data.utm_source || data.utm_medium || data.utm_campaign ? `
    <tr>
      <td style="padding: 10px; border-top: 1px solid #eee;">
        <strong>UTM параметры:</strong><br>
        ${data.utm_source ? `Источник: ${data.utm_source}<br>` : ''}
        ${data.utm_medium ? `Канал: ${data.utm_medium}<br>` : ''}
        ${data.utm_campaign ? `Кампания: ${data.utm_campaign}<br>` : ''}
        ${data.utm_term ? `Ключевое слово: ${data.utm_term}<br>` : ''}
        ${data.utm_content ? `Контент: ${data.utm_content}` : ''}
      </td>
    </tr>
  ` : '';

  const referrerInfo = data.referrer ? `
    <tr>
      <td style="padding: 10px; border-top: 1px solid #eee;">
        <strong>Источник перехода:</strong> ${data.referrer}
      </td>
    </tr>
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Новая заявка от ${data.name}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; }
        .field { margin-bottom: 20px; }
        .field strong { color: #667eea; display: inline-block; width: 120px; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
        .meta-info { background: #f0f0f0; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 12px; color: #666; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px; border-bottom: 1px solid #eee; }
        .highlight { background: #fff3cd; padding: 10px; border-radius: 5px; border-left: 4px solid #ffc107; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Новая заявка</h1>
          <p>Получена новая заявка с сайта AIronLab</p>
        </div>
        
        <div class="content">
          <div class="highlight">
            <strong>📅 Время получения:</strong> ${new Date().toLocaleString('ru-RU')}
          </div>
          
          <table>
            <tr>
              <td style="padding: 10px;">
                <strong>👤 Имя:</strong> ${data.name}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px;">
                <strong>📧 Email:</strong> <a href="mailto:${data.email}">${data.email}</a>
              </td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 10px;">
                <strong>📞 Телефон:</strong> <a href="tel:${data.phone}">${data.phone}</a>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px;">
                <strong>💬 Сообщение:</strong>
                <div class="message-box">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </td>
            </tr>
            ${utmInfo}
            ${referrerInfo}
            <tr>
              <td style="padding: 10px; border-top: 1px solid #eee;">
                <strong>🌐 IP адрес:</strong> ${data.clientIP || 'Не определен'}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-top: 1px solid #eee;">
                <strong>📱 User Agent:</strong> ${data.userAgent || 'Не определен'}
              </td>
            </tr>
          </table>
          
          <div class="meta-info">
            <strong>ℹ️ Метаданные:</strong><br>
            • Время отправки: ${new Date().toISOString()}<br>
            • Сервер: AIronLab Email Backend<br>
            • Версия: 1.0.0
          </div>
        </div>
        
        <div class="footer">
          <p>© 2024 AIronLab. Все права защищены.</p>
          <p>Это автоматическое сообщение, не отвечайте на него.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Текстовый шаблон для email
const generateContactEmailText = (data) => {
  const utmInfo = data.utm_source || data.utm_medium || data.utm_campaign ? `
UTM параметры:
${data.utm_source ? `Источник: ${data.utm_source}` : ''}
${data.utm_medium ? `Канал: ${data.utm_medium}` : ''}
${data.utm_campaign ? `Кампания: ${data.utm_campaign}` : ''}
${data.utm_term ? `Ключевое слово: ${data.utm_term}` : ''}
${data.utm_content ? `Контент: ${data.utm_content}` : ''}
` : '';

  const referrerInfo = data.referrer ? `
Источник перехода: ${data.referrer}
` : '';

  return `
🚀 НОВАЯ ЗАЯВКА С САЙТА AIRONLAB

📅 Время получения: ${new Date().toLocaleString('ru-RU')}

👤 Имя: ${data.name}
📧 Email: ${data.email}
${data.phone ? `📞 Телефон: ${data.phone}` : ''}

💬 Сообщение:
${data.message}

${utmInfo}
${referrerInfo}
🌐 IP адрес: ${data.clientIP || 'Не определен'}
📱 User Agent: ${data.userAgent || 'Не определен'}

---
© 2024 AIronLab. Все права защищены.
Это автоматическое сообщение, не отвечайте на него.
  `.trim();
};

module.exports = {
  generateContactEmailHtml,
  generateContactEmailText
}; 