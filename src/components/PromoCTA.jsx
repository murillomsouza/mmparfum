import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

export function PromoCTA() {
  const handlePromoClick = (e) => {
    e.preventDefault();
    const text = "Olá! Gostaria de resgatar meu cupom de 5% de desconto para minha primeira compra na MM Parfum.";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button 
      onClick={handlePromoClick}
      className="mt-6 text-sm font-semibold text-roxo-principal hover:text-roxo-escuro flex items-center gap-2 transition-colors active:scale-95 group"
    >
      <span className="text-xl group-hover:scale-110 transition-transform">🎁</span> 
      <span className="underline decoration-dourado-accent/50 group-hover:decoration-dourado-accent underline-offset-4 transition-colors">
        Quero 5% OFF na minha primeira compra
      </span>
    </button>
  );
}