import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Heart, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export function ProductCard({ perfume, isFavorito, toggleFavorito }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Previne o scroll da página de fundo quando o modal estiver aberto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Função de rastreamento do GA4
  const trackGAEvent = (eventName, buttonName, location) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        'event_category': 'Interação_Produto',
        'event_label': buttonName,
        'location': location
      });
    }
  };

  const handleWhatsAppClick = (location) => {
    trackGAEvent('generate_lead', `Comprar: ${perfume.name}`, location);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(perfume.whatsappText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleToggleFavorito = () => {
    toggleFavorito(perfume.id);
    if (!isFavorito) {
      trackGAEvent('add_to_wishlist', `Favoritou: ${perfume.name}`, 'Vitrine Principal');
    }
  };

  const handleSaibaMais = () => {
    setIsModalOpen(true);
    trackGAEvent('view_item', `Saiba Mais: ${perfume.name}`, 'Vitrine Principal');
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-roxo-principal/10 overflow-hidden flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg relative group">

        {/* ÁREA DA IMAGEM */}
        <div className="relative aspect-square overflow-hidden bg-lilas-fundo/30 p-4 flex items-center justify-center">

          {/* Tag de Gênero (Reposicionada para não conflitar com o coração) */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold text-roxo-principal uppercase tracking-wider border border-roxo-principal/10 z-20 shadow-sm">
            {perfume.gender}
          </div>

          {/* Botão de Favoritar (Área de clique ampliada para Polegar) */}
          <button 
            onClick={handleToggleFavorito}
            className="absolute top-2 right-2 z-20 w-11 h-11 flex items-center justify-center bg-white/90 backdrop-blur rounded-full shadow-sm text-roxo-principal hover:scale-105 active:scale-95 transition-all"
            aria-label="Favoritar"
          >
            <Heart className={`w-5 h-5 ${isFavorito ? 'fill-roxo-principal text-roxo-principal' : 'text-roxo-principal/40'}`} />
          </button>

          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-roxo-principal/5 animate-pulse z-10">
              <ImageIcon className="w-8 h-8 text-roxo-principal/20" />
            </div>
          )}

          <img
            src={perfume.image}
            alt={perfume.name}
            onLoad={() => setIsImageLoaded(true)}
            className={`w-[80%] h-[80%] object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-105 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />

          {/* Badge de Destaque Ouro */}
          {perfume.selo && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] bg-gradient-to-r from-dourado-accent to-yellow-600 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full text-center shadow-md z-20 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span className="truncate">{perfume.selo}</span>
            </div>
          )}
        </div>

        {/* ÁREA DE TEXTO E BOTÕES */}
        <div className="p-5 flex flex-col flex-grow">
          <span className="text-[10px] text-dourado-accent font-bold uppercase tracking-widest mb-1 block">
            {perfume.brand}
          </span>
          <h3 className="text-xl font-serif font-bold text-roxo-principal leading-tight mb-3">
            {perfume.name}
          </h3>

          {/* Pílulas de Aromas */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {perfume.aromas.split(',').map((aroma, index) => (
              <span key={index} className="bg-roxo-principal/5 text-roxo-principal px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border border-roxo-principal/10">
                {aroma.trim()}
              </span>
            ))}
          </div>

          {/* Preview da Descrição com controle de linhas */}
          <p className="text-xs text-roxo-escuro/70 mb-5 line-clamp-2 leading-relaxed">
            {perfume.description}
          </p>

          {/* Botões Otimizados (Altura py-3 para melhor clique no touch) */}
          <div className="mt-auto flex flex-col gap-2.5">
            <button
              onClick={handleSaibaMais}
              className="w-full py-3 text-xs font-bold text-roxo-principal border-2 border-roxo-principal rounded-full hover:bg-roxo-principal/5 active:bg-roxo-principal/10 transition-colors uppercase tracking-wider"
            >
              Saiba Mais
            </button>
            <button
              onClick={() => handleWhatsAppClick('Card Principal')}
              className="w-full py-3 text-xs font-bold text-white bg-roxo-principal rounded-full hover:bg-roxo-escuro active:scale-95 transition-all shadow-md shadow-roxo-principal/20 uppercase tracking-wider"
            >
              Garantir Frasco
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE DETALHES (SAIBA MAIS) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-roxo-escuro/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">
            <div className="p-4 border-b border-roxo-principal/10 flex justify-between items-center bg-lilas-fundo/50">
              <h4 className="font-serif font-bold text-2xl text-roxo-principal">{perfume.name}</h4>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 bg-white rounded-full text-roxo-principal/50 hover:text-roxo-principal shadow-sm transition-all"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <p className="text-sm text-roxo-escuro leading-relaxed mb-6 font-medium">
                {perfume.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-lilas-fundo/30 p-4 rounded-xl border border-roxo-principal/5">
                  <span className="block text-[10px] uppercase tracking-widest text-dourado-accent font-bold mb-1">Notas de Topo</span>
                  <span className="text-sm text-roxo-principal font-semibold">{perfume.notes.top}</span>
                </div>
                <div className="bg-lilas-fundo/30 p-4 rounded-xl border border-roxo-principal/5">
                  <span className="block text-[10px] uppercase tracking-widest text-dourado-accent font-bold mb-1">Notas de Coração</span>
                  <span className="text-sm text-roxo-principal font-semibold">{perfume.notes.heart}</span>
                </div>
                <div className="bg-lilas-fundo/30 p-4 rounded-xl border border-roxo-principal/5">
                  <span className="block text-[10px] uppercase tracking-widest text-dourado-accent font-bold mb-1">Notas de Fundo</span>
                  <span className="text-sm text-roxo-principal font-semibold">{perfume.notes.base}</span>
                </div>
              </div>

              {perfume.recommendations && (
                <div className="mb-2">
                  <span className="block text-xs font-bold text-roxo-principal uppercase tracking-wider mb-2">Recomendações de Uso</span>
                  <p className="text-sm text-roxo-escuro/80 italic border-l-2 border-dourado-accent pl-3">
                    {perfume.recommendations}
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-roxo-principal/10 bg-gray-50">
              <button
                onClick={() => handleWhatsAppClick('Modal do Produto')}
                className="w-full py-4 text-sm font-bold text-white bg-roxo-principal rounded-full hover:bg-roxo-escuro active:scale-95 transition-all shadow-lg shadow-roxo-principal/20 uppercase tracking-widest"
              >
                Garantir Meu Frasco
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
