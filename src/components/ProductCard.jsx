import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Heart } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export function ProductCard({ perfume, isFavorito, toggleFavorito }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(perfume.whatsappText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-roxo-principal/10 overflow-hidden flex flex-col h-full transition-transform hover:-translate-y-1 relative">
        
        <div className="relative aspect-square overflow-hidden bg-lilas-fundo/30 p-4">
          
          <button 
            onClick={() => toggleFavorito(perfume.id)}
            className="absolute top-2 left-2 z-20 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-roxo-principal hover:scale-110 active:scale-95 transition-all"
            aria-label="Favoritar"
          >
            <Heart className={`w-4 h-4 ${isFavorito ? 'fill-roxo-principal text-roxo-principal' : 'text-roxo-principal/50'}`} />
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
            className={`w-full h-full object-contain mix-blend-multiply transition-opacity duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
          
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-roxo-principal uppercase tracking-wide border border-roxo-principal/10 z-20">
            {perfume.gender}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <span className="text-[10px] text-dourado-accent font-bold uppercase tracking-widest mb-1">
            {perfume.brand}
          </span>
          <h3 className="text-lg font-serif font-bold text-roxo-principal leading-tight mb-2">
            {perfume.name}
          </h3>
          <p className="text-xs text-roxo-escuro/70 mb-4 line-clamp-2">
            {perfume.aromas}
          </p>

          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2 text-xs font-bold text-roxo-principal border border-roxo-principal rounded-full hover:bg-roxo-principal/5 transition-colors"
            >
              Saiba Mais
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-2 text-xs font-bold text-white bg-roxo-principal rounded-full hover:bg-roxo-escuro active:scale-95 transition-all shadow-md shadow-roxo-principal/20"
            >
              Garantir Frasco
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-roxo-escuro/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-4 border-b border-roxo-principal/10 flex justify-between items-center bg-lilas-fundo/30">
              <h4 className="font-serif font-bold text-xl text-roxo-principal">{perfume.name}</h4>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1 text-roxo-principal/50 hover:text-roxo-principal transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <p className="text-sm text-roxo-escuro leading-relaxed mb-6">
                {perfume.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-lilas-fundo/20 p-3 rounded-lg border border-lilas-fundo">
                  <span className="block text-[10px] uppercase tracking-widest text-dourado-accent font-bold mb-1">Notas de Topo</span>
                  <span className="text-sm text-roxo-principal font-medium">{perfume.notes.top}</span>
                </div>
                <div className="bg-lilas-fundo/20 p-3 rounded-lg border border-lilas-fundo">
                  <span className="block text-[10px] uppercase tracking-widest text-dourado-accent font-bold mb-1">Notas de Coração</span>
                  <span className="text-sm text-roxo-principal font-medium">{perfume.notes.heart}</span>
                </div>
                <div className="bg-lilas-fundo/20 p-3 rounded-lg border border-lilas-fundo">
                  <span className="block text-[10px] uppercase tracking-widest text-dourado-accent font-bold mb-1">Notas de Fundo</span>
                  <span className="text-sm text-roxo-principal font-medium">{perfume.notes.base}</span>
                </div>
              </div>

              {perfume.recommendations && (
                <div className="mb-6">
                  <span className="block text-xs font-bold text-roxo-principal uppercase tracking-wider mb-2">Recomendações de Uso</span>
                  <p className="text-sm text-roxo-escuro/80 italic border-l-2 border-dourado-accent pl-3">
                    {perfume.recommendations}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-roxo-principal/10 bg-white">
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-3.5 text-sm font-bold text-white bg-roxo-principal rounded-full hover:bg-roxo-escuro active:scale-95 transition-all shadow-lg shadow-roxo-principal/20"
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