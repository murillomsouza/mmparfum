import React from 'react';

export function Hero({ campanha = {}, children }) {
  return (
    <section id= "inicio" className="relative bg-lilas-fundo pt-24 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* Coluna de Texto */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
            {campanha.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-roxo-vibrante/10 border border-roxo-vibrante/20 text-roxo-vibrante text-xs font-bold uppercase tracking-widest mb-6">
                <span>{campanha.badge}</span>
              </div>
            )}
            
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-roxo-principal leading-tight mb-4 tracking-wide">
              {campanha.titulo} <span className="text-dourado-accent">{campanha.tituloDestaque}</span>
            </h1>
            
            <p className="text-xl text-roxo-escuro mb-2 font-serif italic">
              {campanha.subtitulo}
            </p>
            <p className="text-base text-roxo-escuro/80 mb-8 max-w-md leading-relaxed">
              {campanha.descricao}
            </p>
            
            <a 
              href="#produtos" 
              className="inline-flex items-center justify-center gap-2 bg-roxo-principal text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg shadow-roxo-principal/20 hover:bg-roxo-escuro active:scale-95 transition-all duration-300 w-full sm:w-auto"
            >
              <svg className="w-5 h-5 text-dourado-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {campanha.textoBotao}
            </a>

            {/*renderizamos o PromoCTA (ou qualquer outro gatilho injetado) */}
            {children}
          </div>

          {/* Coluna da Imagem */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-roxo-principal/5 to-transparent rounded-3xl transform scale-105 -z-10"></div>
            <img 
              src={campanha.imagem} 
              alt={campanha.altImagem} 
              className="w-full h-auto rounded-2xl shadow-xl border border-roxo-principal/10 object-cover"
              loading="eager"
            />
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
}