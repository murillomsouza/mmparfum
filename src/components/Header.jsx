import React, { useState } from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const mensagem = "Olá! Vim pelo site da MM Parfum e gostaria de conhecer os perfumes disponíveis.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

  // Função para disparar eventos para o GA4 de forma segura
  const trackGAEvent = (eventName, buttonName, location) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        'event_category': 'Interação',
        'event_label': buttonName,
        'location': location
      });
    }
  };

  // Nova Função de Navegação Inteligente
  const handleNavigation = (e, hash, sectionName) => {
    e.preventDefault(); // Impede o pulo brusco do HTML
    setIsMenuOpen(false); // Fecha o menu mobile se estiver aberto
    trackGAEvent('click_nav_link', `Menu: ${sectionName}`, 'Header');

    // Função interna para rolar com um pequeno desconto para o Header Fixo
    const scrollToSection = () => {
      const element = document.querySelector(hash);
      if (element) {
        const headerOffset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      // Aguarda um instante para a Home renderizar e depois rola a tela
      setTimeout(scrollToSection, 150);
    } else {
      // Se JÁ ESTIVER na Home, apenas rola suavemente
      scrollToSection();
    }
  };

  const handleWhatsappClick = (deviceType) => {
    trackGAEvent('generate_lead', 'Botão Fale Conosco', `Header - ${deviceType}`);
  };

  const handleLogoClick = () => {
    trackGAEvent('click_nav_link', 'Logo Principal', 'Header');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-lilas-fundo/90 backdrop-blur-md border-b border-roxo-principal/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo agora é um Link do React Router */}
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
          >
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-roxo-principal font-medium text-sm">
            <a href="#inicio" onClick={(e) => handleNavigation(e, '#inicio', 'Início')} className="hover:text-dourado-accent transition-colors">Início</a>
            <a href="#produtos" onClick={(e) => handleNavigation(e, '#produtos', 'Produtos')} className="hover:text-dourado-accent transition-colors">Produtos</a>
            <a href="#depoimentos" onClick={(e) => handleNavigation(e, '#depoimentos', 'Depoimentos')} className="hover:text-dourado-accent transition-colors">Depoimentos</a>
            <a href="#contato" onClick={(e) => handleNavigation(e, '#contato', 'Contato')} className="hover:text-dourado-accent transition-colors">Contato</a>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsappClick('Desktop')}
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
            <a href="#inicio" className="text-roxo-principal font-medium text-base" onClick={(e) => handleNavigation(e, '#inicio', 'Início Mobile')}>Início</a>
            <a href="#produtos" className="text-roxo-principal font-medium text-base" onClick={(e) => handleNavigation(e, '#produtos', 'Produtos Mobile')}>Produtos</a>
            <a href="#depoimentos" className="text-roxo-principal font-medium text-base" onClick={(e) => handleNavigation(e, '#depoimentos', 'Depoimentos Mobile')}>Depoimentos</a>
            <a href="#contato" className="text-roxo-principal font-medium text-base" onClick={(e) => handleNavigation(e, '#contato', 'Contato Mobile')}>Contato</a>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsappClick('Mobile Menu')}
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