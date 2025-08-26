import { useState } from "react";

// Типы для контактной формы
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  agreement: boolean;
}

export interface UseContactFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface UseContactFormReturn extends UseContactFormState {
  submitForm: (data: ContactFormData) => Promise<void>;
  resetForm: () => void;
}

// Утилита для получения UTM параметров
const getUTMParams = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);

  return {
    utm_source: urlParams.get("utm_source"),
    utm_medium: urlParams.get("utm_medium"),
    utm_campaign: urlParams.get("utm_campaign"),
    utm_content: urlParams.get("utm_content"),
    utm_term: urlParams.get("utm_term"),
  };
};

export function useContactForm(): UseContactFormReturn {
  const [state, setState] = useState<UseContactFormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const submitForm = async (data: ContactFormData) => {
    setState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      // Подготавливаем данные для отправки
      const submitData = {
        ...data,
        ...getUTMParams(), // Добавляем UTM параметры
        referrer: typeof window !== "undefined" ? document.referrer : undefined,
      };

      // Отправляем запрос на бэкенд
      const response = await fetch(`/api/email/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Ошибка при отправке заявки"
        );
      }

      setState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });

      // Аналитика - отправляем событие в Google Analytics если подключен
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "form_submit", {
          event_category: "contact",
          event_label: "contact_form",
          value: 1,
        });
      }

      // Яндекс.Метрика
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(12345678, "reachGoal", "contact_form_submit");
      }

      console.log("✅ Заявка успешно отправлена:", result.messageId);
    } catch (error) {
      console.error("❌ Ошибка отправки формы:", error);

      let errorMessage = "Произошла ошибка при отправке заявки";

      if (error instanceof Error) {
        // Обрабатываем специфичные ошибки
        if (error.message.includes("RATE_LIMIT_EXCEEDED")) {
          errorMessage = "Слишком много запросов. Попробуйте позже.";
        } else if (error.message.includes("VALIDATION_ERROR")) {
          errorMessage = "Ошибка валидации данных. Проверьте заполненные поля.";
        } else if (error.message.includes("EMAIL_SERVICE_ERROR")) {
          errorMessage =
            "Временные проблемы с почтовым сервисом. Попробуйте позже.";
        } else if (error.message.includes("Failed to fetch")) {
          errorMessage = "Ошибка соединения. Проверьте интернет-подключение.";
        } else {
          errorMessage = error.message;
        }
      }

      setState({
        isSubmitting: false,
        isSuccess: false,
        error: errorMessage,
      });
    }
  };

  const resetForm = () => {
    setState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });
  };

  return {
    ...state,
    submitForm,
    resetForm,
  };
}

// Хук для получения UTM параметров из URL (экспортируем отдельно для совместимости)
export function useUTMParams() {
  return getUTMParams();
}
