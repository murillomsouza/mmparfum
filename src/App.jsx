import './App.css';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PromoCTA } from './components/PromoCTA';
import { TrustBar } from './components/TrustBar';
import { Vitrine } from './components/Vitrine';
import { Depoimentos } from './components/Depoimentos';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { MaisVendidos } from './components/MaisVendidos';
import { FAQ } from './components/FAQ';
import { WhatsAppFloating } from './components/WhatsAppFloating';

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
    <div className="min-h-screen bg-lilas-fundo relative">
      <Header />

      <main>
        <Hero campanha={campanhaAtual}>
          <PromoCTA />
        </Hero>

        <MaisVendidos />
        <TrustBar />
        <Vitrine />
        <Depoimentos />
        
        {/* Nova seção de FAQ para matar objeções */}
        <FAQ />
      </main>

      <Footer />
      <CookieBanner />
      
      {/* Botão Flutuante no final */}
      <WhatsAppFloating />
    </div>
  );
}

export default App;