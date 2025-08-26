'use client';

import { useState } from 'react';
import { ContactFormData } from '@/hooks/useContactForm';
import { ContactForm as ContactFormType, FormErrors } from '@/types/contact';

interface ContactFormProps {
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export const ContactForm: React.FC<ContactFormProps> = ({ isSubmitting, error, onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreement: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Валидация имени
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Некорректный email адрес';
    }

    // Валидация телефона (опционально, но если заполнен - должен быть корректным)
    if (formData.phone.trim()) {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,20}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Некорректный номер телефона';
      }
    }

    // Валидация сообщения
    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }

    // Валидация согласия
    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие на обработку персональных данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormType, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const submissionData: ContactFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
        agreement: formData.agreement,
      };

      await onSubmit(submissionData);

      // Если успешно - очищаем форму
      if (!error) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          agreement: false,
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <h3 className="text-responsive-h3 text-white mb-6">Отправить заявку</h3>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Имя *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="Ваше имя"
            disabled={isSubmitting}
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.email ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="your@email.com"
            disabled={isSubmitting}
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.phone ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="+7 (999) 123-45-67"
            disabled={isSubmitting}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
            Сообщение *
          </label>
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
              errors.message ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="Расскажите о вашем проекте, задачах и ожиданиях..."
            disabled={isSubmitting}
          />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agreement"
            checked={formData.agreement}
            onChange={(e) => handleInputChange('agreement', e.target.checked)}
            className="mt-0.5 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
            disabled={isSubmitting}
          />
          <label htmlFor="agreement" className="text-sm text-blue-100">
            Я согласен на{' '}
            <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline" data-clickable="true">
              обработку персональных данных
            </a>{' '}
            и получение информационных сообщений *
          </label>
        </div>
        {errors.agreement && <p className="text-sm text-red-400">{errors.agreement}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          data-clickable="true"
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Отправляем...
            </span>
          ) : (
            'Отправить заявку'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-blue-100">
          Нажимая кнопку, вы соглашаетесь с условиями обработки данных
        </p>
      </div>
    </div>
  );
}; 