import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes Globais (Aparecem em todas as páginas)
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { CookieBanner } from './components/CookieBanner';

// Componentes da Landing Page
import { Hero } from './components/Hero';
import { PromoCTA } from './components/PromoCTA';
import { TrustBar } from './components/TrustBar';
import { MaisVendidos } from './components/MaisVendidos';
import { BannerQuiz } from './components/BannerQuiz';
import { Vitrine } from './components/Vitrine';
import { Depoimentos } from './components/Depoimentos';
import { FAQ } from './components/FAQ';

// Importação da nossa futura página de Quiz
import { Quiz } from './pages/Quiz'; 

function App() {
  const campanhaAtual = {
    badge: "Ofertas Especiais",
    titulo: "A Estação das",
    tituloDestaque: "Melhores Escolhas",
    subtitulo: "Perfumes que deixam sua marca.",
    descricao: "Aproveite nossa seleção exclusiva de fragrâncias para o inverno e encontre o aroma perfeito para você.",
    textoBotao: "Ver Ofertas",
    imagem: "/imgs/campanha-inverno.jpeg",
    altImagem: "Campanha de Inverno MM Parfum"
  };

  return (
    <div className="min-h-screen bg-lilas-fundo text-roxo-escuro antialiased flex flex-col">
      {/* Elementos fixos no topo */}
      <Header />

      {/* Área onde as páginas trocam dinamicamente */}
      <main className="flex-grow">
        <Routes>
          {/* Rota 1: Landing Page (Site Principal) */}
          <Route 
            path="/" 
            element={
              <>
                <Hero campanha={campanhaAtual}>
                  <PromoCTA />
                </Hero>
                <TrustBar />
                <MaisVendidos />
                
                {/* O Banner Interceptador perfeitamente posicionado */}
                <BannerQuiz /> 
                
                <Vitrine />
                <Depoimentos />
                <FAQ />
              </>
            } 
          />

          {/* Rota 2: O nosso Quiz */}
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>

      {/* Elementos fixos no rodapé */}
      <Footer />
      <WhatsAppFloating />
      <CookieBanner />
    </div>
  );
}

export default App;