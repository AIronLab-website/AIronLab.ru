'use client';

import { useState } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function SentryTestPage() {
  const [errorTriggered, setErrorTriggered] = useState(false);

  const triggerError = () => {
    try {
      // Вызываем несуществующую функцию для тестирования Sentry
      (window as any).myUndefinedFunction();
    } catch (error) {
      Sentry.captureException(error);
      setErrorTriggered(true);
    }
  };

  const triggerAsyncError = async () => {
    try {
      // Асинхронная ошибка
      await new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Тестовая асинхронная ошибка для Sentry'));
        }, 100);
      });
    } catch (error) {
      Sentry.captureException(error);
      setErrorTriggered(true);
    }
  };

  const sendCustomMessage = () => {
    Sentry.captureMessage('Тестовое сообщение от пользователя', 'info');
    setErrorTriggered(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Тестирование Sentry
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={triggerError}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Вызвать ошибку JavaScript
          </button>
          
          <button
            onClick={triggerAsyncError}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Вызвать асинхронную ошибку
          </button>
          
          <button
            onClick={sendCustomMessage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Отправить тестовое сообщение
          </button>
        </div>
        
        {errorTriggered && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <p className="text-sm">
              ✅ Событие отправлено в Sentry! Проверьте дашборд Sentry для просмотра.
            </p>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-600">
          <p className="mb-2">
            <strong>Инструкции:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Нажмите любую кнопку выше</li>
            <li>Проверьте дашборд Sentry</li>
            <li>Убедитесь, что события появляются в Issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
