import React from 'react';
import { Heart } from 'lucide-react';

export function FilterBar({ filtroAtivo, setFiltroAtivo }) {
  const categorias = ['Todos', 'Feminino', 'Masculino', 'Compartilhável', 'Favoritos'];

  // Função de rastreamento do GA4
  const trackGAEvent = (eventName, buttonName, location) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        'event_category': 'Interação_Filtro',
        'event_label': buttonName,
        'location': location
      });
    }
  };

  const handleFilterClick = (categoria) => {
    setFiltroAtivo(categoria);
    
    // Rastreia qual categoria o usuário está buscando
    trackGAEvent('click_filter', `Categoria: ${categoria}`, 'Barra de Filtros Vitrine');
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 py-6">
      {categorias.map((categoria) => {
        const isFavoritos = categoria === 'Favoritos';
        
        return (
          <button
            key={categoria}
            onClick={() => handleFilterClick(categoria)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
              filtroAtivo === categoria
                ? 'bg-roxo-principal text-white shadow-md scale-105'
                : 'bg-transparent text-roxo-principal border border-roxo-principal/30 hover:border-roxo-principal hover:bg-roxo-principal/5'
            }`}
          >
            {isFavoritos && (
              <Heart 
                className={`w-3.5 h-3.5 ${
                  filtroAtivo === 'Favoritos' ? 'fill-white text-white' : 'text-roxo-principal'
                }`} 
              />
            )}
            <span>{categoria}</span>
          </button>
        );
      })}
    </div>
  );
}