'use client';

import { FaTelegramPlane } from 'react-icons/fa';
import { SiHabr } from 'react-icons/si';

export const ContactSocials: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <h3 className="text-responsive-h3 text-white mb-6">Мы в социальных сетях</h3>
      <p className="text-blue-100 mb-8">Следите за новостями, кейсами и обновлениями AIronLab</p>
      
      {/* Сетка социальных сетей */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
        {/* Telegram */}
        <a 
          href="https://t.me/Aironlab" 
          target="_blank" 
          rel="noopener noreferrer"
          data-clickable="true"
          className="group relative p-4 bg-white/5 hover:bg-blue-500/20 rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaTelegramPlane className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Telegram</p>
              <p className="text-blue-200 text-xs">@Aironlab</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>

        {/* Instagram */}
        <a 
          href="https://www.instagram.com/_grebenshikov_/" 
          target="_blank" 
          rel="noopener noreferrer"
          data-clickable="true"
          className="group relative p-4 bg-white/5 hover:bg-pink-500/20 rounded-xl border border-white/10 hover:border-pink-400/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Instagram</p>
              <p className="text-pink-200 text-xs">@_grebenshikov_</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>

        {/* VK */}
        <a 
          href="https://vk.com/AIronlab" 
          target="_blank" 
          rel="noopener noreferrer"
          data-clickable="true"
          className="group relative p-4 bg-white/5 hover:bg-blue-600/20 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.05-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.576c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.082c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .763.186.254.796.779 1.203 1.254.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm">ВКонтакте</p>
              <p className="text-blue-200 text-xs">@AIronlab</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>

        {/* VC.ru */}
        <a 
          href="https://vc.ru/id709930" 
          target="_blank" 
          rel="noopener noreferrer"
          data-clickable="true"
          className="group relative p-4 bg-white/5 hover:bg-orange-500/20 rounded-xl border border-white/10 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <span className="text-orange-700 text-xs font-bold">VC</span>
              </div>
            </div>
            <div>
              <p className="text-white font-medium text-sm">VC.ru</p>
              <p className="text-orange-200 text-xs">@AIronLab</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>

        {/* Habr */}
        <a 
          href="https://habr.com/ru/users/AIronLab/" 
          target="_blank" 
          rel="noopener noreferrer"
          data-clickable="true"
          className="group relative p-4 bg-white/5 hover:bg-teal-500/20 rounded-xl border border-white/10 hover:border-teal-400/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <SiHabr className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Habr</p>
              <p className="text-teal-200 text-xs">@AIronLab</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>

        {/* Teletype */}
        <a 
          href="https://teletype.in/@aironlab" 
          target="_blank" 
          rel="noopener noreferrer"
          data-clickable="true"
          className="group relative p-4 bg-white/5 hover:bg-gray-600/20 rounded-xl border border-white/10 hover:border-gray-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16v3h-6v13h-4V7H4V4z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Teletype</p>
              <p className="text-gray-200 text-xs">@aironlab</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </div>

      {/* Контактная информация */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-white font-semibold mb-4">📞 Прямая связь</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.05a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-blue-100 text-sm">info@aironlab.ru</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-green-100 text-sm">Ответим в течение 2 часов (9:00-18:00 МСК)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 