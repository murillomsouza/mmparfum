import React from 'react';
import { Crown, ShoppingBag } from 'lucide-react';
import { perfumes } from '../data/perfumes';
import { WHATSAPP_NUMBER } from '../constants';

export function MaisVendidos() {
  const maisVendidos = perfumes
    .filter((perfume) => perfume.maisVendido)
    .slice(0, 5);

  const handleCompraRapida = (perfume) => {
    const text = perfume.whatsappText || `Olá! Gostaria de garantir o ${perfume.name}.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-roxo-principal/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-dourado-accent/10 border border-dourado-accent/20 text-dourado-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
            <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Favoritos dos Clientes</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-roxo-principal mb-3 sm:mb-4">
            As fragrâncias mais escolhidas
          </h2>

          <p className="text-roxo-escuro/70 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-2">
            Uma curadoria das essências que mais despertam interesse.
            Se está conhecendo a perfumaria árabe agora, estes são excelentes pontos de partida.
          </p>
        </div>

        {/* Container do Carrossel */}
        <div 
          className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {maisVendidos.map((perfume) => (
            <div
              key={perfume.id}
              onClick={() => handleCompraRapida(perfume)} // Torna o card inteiro clicável
              className="cursor-pointer bg-lilas-fundo rounded-2xl overflow-hidden border border-roxo-principal/10 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex flex-col group snap-start min-w-[220px] w-[65vw] sm:w-[40vw] lg:w-auto lg:min-w-0"
            >
              <div className="relative overflow-hidden">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  loading="lazy"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay interativo que indica o clique no Desktop */}
                <div className="absolute inset-0 bg-roxo-principal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-roxo-principal text-[10px] font-bold uppercase px-4 py-2 rounded-full shadow-lg">
                     Garantir o meu
                   </div>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow bg-lilas-fundo relative z-10">
                <div className="inline-flex items-center gap-1 text-dourado-accent mb-2">
                  <Crown className="w-3 h-3 flex-shrink-0" />
                  <span className="text-[9px] uppercase tracking-wider font-bold truncate">
                    {perfume.selo}
                  </span>
                </div>

                <h3 className="font-bold text-roxo-principal text-sm mb-4 line-clamp-1 group-hover:text-dourado-accent transition-colors">
                  {perfume.name}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique dispare duas vezes (no botão e no card)
                    handleCompraRapida(perfume);
                  }}
                  className="mt-auto w-full flex items-center justify-center gap-2 bg-transparent border border-roxo-principal text-roxo-principal py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider group-hover:bg-roxo-principal group-hover:text-white transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Comprar Agora</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 sm:mt-8">
          <a
            href="#produtos"
            className="bg-roxo-principal text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-roxo-principal/20 hover:bg-roxo-escuro active:scale-95 transition-all duration-300"
          >
            Ver Catálogo Completo
          </a>
        </div>

      </div>
    </section>
  );
}