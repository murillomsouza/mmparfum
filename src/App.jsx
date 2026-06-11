import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PromoCTA } from './components/PromoCTA';
import { TrustBar } from './components/TrustBar';
import { Vitrine } from './components/Vitrine';
import { Depoimentos } from './components/Depoimentos';
import { Footer } from './components/Footer'; // <- Importe aqui

function App() {
  const campanhaAtual = {
    badge: "Campanha Especial",
    titulo: "Dia dos",
    tituloDestaque: "Namorados",
    subtitulo: "O presente que transcende.",
    descricao: "Em cada essência, uma história de amor inesquecível.",
    textoBotao: "Encontre o Presente Perfeito",
    imagem: "/imgs/dia-dos-namorados.jpeg",
    altImagem: "Campanha Dia dos Namorados MM Parfum"
  };

  return (
    <div className="min-h-screen bg-lilas-fundo">
      <Header />
      
      <main>
        <Hero campanha={campanhaAtual}>
          <PromoCTA />
        </Hero>
        
        <TrustBar />
        <Vitrine />
        <Depoimentos />
      </main>

      {/* Renderize o Footer fora da tag <main> */}
      <Footer />
    </div>
  );
}

export default App;