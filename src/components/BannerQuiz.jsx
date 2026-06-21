import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function BannerQuiz() {
  // Função de rastreamento do GA4
  const trackGAEvent = (eventName, buttonName, location) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        'event_category': 'Interação_Quiz',
        'event_label': buttonName,
        'location': location
      });
    }
  };

  return (
    <section className="py-16 bg-roxo-principal relative overflow-hidden border-y border-dourado-accent/20">
      
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-roxo-vibrante/20 to-transparent opacity-50"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dourado-accent/10 mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <Sparkles className="w-8 h-8 text-dourado-accent" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
          Muitas opções maravilhosas?
        </h2>
        
        <p className="text-white/80 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          Não sabe por onde começar? Responda nosso quiz interativo de 3 minutos e descubra qual fragrância árabe nasceu para ser a sua <strong className="text-dourado-accent font-semibold">assinatura olfativa</strong>.
        </p>
        
        <Link
          to="/quiz"
          onClick={() => trackGAEvent('click_quiz', 'Banner Interceptador', 'Meio da Página')}
          className="inline-flex items-center justify-center gap-2 bg-dourado-accent text-roxo-escuro px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Descobrir Meu Perfume
        </Link>
      </div>
    </section>
  );
}