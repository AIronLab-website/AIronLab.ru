'use client';

import { useContactForm } from '@/hooks/useContactForm';
import { ContactSocials } from './contact/ContactSocials';
import { ContactForm } from './contact/ContactForm';
import { ContactSuccess } from './contact/ContactSuccess';

export default function ContactSection() {
  const { isSubmitting, isSuccess, error, submitForm, resetForm } = useContactForm();



  // Если форма успешно отправлена
  if (isSuccess) {
    return <ContactSuccess onSendAnother={resetForm} />;
  }

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 non-interactive" data-scroll-container="true">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-responsive-h1 text-white mb-6">
              Давайте обсудим ваш проект
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Расскажите о своих задачах, и мы предложим эффективное решение на основе ИИ
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <ContactSocials />
            </div>
            <ContactForm 
              isSubmitting={isSubmitting}
              error={error}
              onSubmit={submitForm}
            />
          </div>
        </div>
      </div>
    </section>
  );
} 