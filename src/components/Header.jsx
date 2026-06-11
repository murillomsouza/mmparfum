import React, { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-lilas-fundo/90 backdrop-blur-md border-b border-roxo-principal/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-3">
            <img 
              src="/imgs/logocircular.jpeg" 
              alt="Logo MM Parfum" 
              className="h-12 w-12 rounded-full object-cover border-2 border-dourado-accent shadow-sm"
            />
            <div className="flex flex-col justify-center">
              <span className="text-roxo-principal font-bold text-xl leading-none font-serif tracking-wide">
                MM PARFUM
              </span>
              <span className="text-dourado-accent text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
                Beyond Scents
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-roxo-principal font-medium text-sm">
            <a href="#inicio" className="hover:text-dourado-accent transition-colors">Início</a>
            <a href="#produtos" className="hover:text-dourado-accent transition-colors">Produtos</a>
            <a href="#depoimentos" className="hover:text-dourado-accent transition-colors">Depoimentos</a>
            <a href="#contato" className="hover:text-dourado-accent transition-colors">Contato</a>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="#contato" 
              className="hidden sm:inline-block bg-roxo-principal text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md border border-dourado-accent/30 hover:bg-roxo-escuro active:scale-95 transition-all"
            >
              Fale Conosco
            </a>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              className="md:hidden text-roxo-principal p-2 rounded-md hover:bg-roxo-principal/5 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Alternar menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-lilas-fundo border-t border-roxo-principal/10 shadow-lg absolute w-full left-0">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <a href="#inicio" className="text-roxo-principal font-medium text-base" onClick={() => setIsMenuOpen(false)}>Início</a>
            <a href="#produtos" className="text-roxo-principal font-medium text-base" onClick={() => setIsMenuOpen(false)}>Produtos</a>
            <a href="#depoimentos" className="text-roxo-principal font-medium text-base" onClick={() => setIsMenuOpen(false)}>Depoimentos</a>
            <a href="#contato" className="text-roxo-principal font-medium text-base" onClick={() => setIsMenuOpen(false)}>Contato</a>
            
            <a 
              href="#contato" 
              className="sm:hidden bg-roxo-principal text-white text-center px-5 py-3 mt-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}