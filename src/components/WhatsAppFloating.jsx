import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export function WhatsAppFloating() {
  // Função de rastreamento do GA4
  const trackGAEvent = (eventName, buttonName, location) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        'event_category': 'Interação_WhatsApp_Flutuante',
        'event_label': buttonName,
        'location': location
      });
    }
  };

  const handleWhatsAppClick = () => {
    // Registra o clique no GA4 antes de abrir o WhatsApp
    trackGAEvent('generate_lead', 'Botão Flutuante', 'Página Global');

    const text = "Olá! Estava navegando no site da MM Parfum e gostaria de tirar uma dúvida.";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Falar no WhatsApp"
    >
      {/* Efeito de pulso para chamar a atenção sutilmente */}
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20"></span>
      <MessageCircle className="w-7 h-7 relative z-10" />
      
      {/* Tooltip que aparece ao passar o mouse (Desktop) */}
      <span className="absolute right-16 bg-white text-roxo-escuro text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Fale conosco!
      </span>
    </button>
  );
}