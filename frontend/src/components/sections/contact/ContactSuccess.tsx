'use client';

interface ContactSuccessProps {
  onSendAnother: () => void;
}

export const ContactSuccess: React.FC<ContactSuccessProps> = ({ onSendAnother }) => {
  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 non-interactive" data-scroll-container="true">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-responsive-h2 text-white mb-6">
              Заявка отправлена!
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Спасибо за обращение! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">⏰ Что дальше?</h3>
                <ul className="text-blue-100 space-y-2 text-sm">
                  <li>• Мы изучим ваш запрос в течение 2 часов</li>
                  <li>• Свяжемся для уточнения деталей</li>
                  <li>• Подготовим персональное предложение</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">📞 Срочная связь</h3>
                <div className="text-blue-100 space-y-2 text-sm">
                  <p>Telegram: @aironlab_support</p>
                  <p>Email: info@aironlab.ru</p>
                  <p>Время работы: 9:00-18:00 МСК</p>
                </div>
              </div>
            </div>
            <button
              onClick={onSendAnother}
              data-clickable="true"
              className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
            >
              Отправить еще одну заявку
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 