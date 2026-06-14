import React from 'react';
import { MapPin, Phone, Clock, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export function Footer() {
  const anoAtual = new Date().getFullYear();

  const handleAtendimentoClick = () => {
    const text = "Olá! Vim pelo site da MM Parfum e gostaria de um atendimento.";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEncomendaClick = () => {
    const text = "Olá! Vi no site da MM Parfum e gostaria de verificar a possibilidade de fazer uma encomenda!";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer
      id="contato"
      className="bg-roxo-escuro text-white/90 pt-16 pb-8 border-t-[6px] border-dourado-accent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-dourado-accent" />
              MM Parfum
            </h2>

            <p className="text-sm text-white/70 leading-relaxed text-justify">
              Especialistas em alta perfumaria árabe e fragrâncias exclusivas de nicho.
              Trabalhamos com as marcas mais cobiçadas do mundo, como Lattafa, Afnan e Al Wataniah,
              garantindo originalidade e sofisticação em cada gota.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-dourado-accent uppercase tracking-wider mb-2">
              Atendimento e Localização
            </h3>

            <address className="not-italic flex flex-col gap-4 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-dourado-accent shrink-0 mt-0.5" />
                <p>
                  <strong>Sede em Indaiatuba - SP</strong>
                  <br />
                  <span className="text-white/60 text-xs">
                    Entregas expressas para Campinas e Região Metropolitana.
                    <br />
                    Envios para demais regiões do Brasil sob consulta.
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-dourado-accent shrink-0" />
                <p>Segunda a Sexta: 08h às 18h</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-dourado-accent shrink-0" />
                <button
                  onClick={handleAtendimentoClick}
                  className="hover:text-white transition-colors text-left font-medium"
                >
                  WhatsApp: (19) 99731-8024
                </button>
              </div>
            </address>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-dourado-accent uppercase tracking-wider mb-2">
              Acesso Rápido
            </h3>

            <nav className="flex flex-col gap-2 text-sm text-white/80">
              <a
                href="#produtos"
                className="hover:text-dourado-accent transition-colors w-fit"
              >
                Nossas Essências
              </a>

              <a
                href="#depoimentos"
                className="hover:text-dourado-accent transition-colors w-fit"
              >
                Avaliações de Clientes
              </a>

              <button
                onClick={handleEncomendaClick}
                className="hover:text-dourado-accent transition-colors w-fit text-left"
              >
                Encomendas Especiais
              </button>
              <a
                href="/politica-de-privacidade.html"
                className="hover:text-dourado-accent transition-colors w-fit"
            >
                Política de Privacidade
            </a>
            </nav>

            <div className="mt-4">
              <a
                href="https://instagram.com/mmparfum.oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-dourado-accent transition-colors w-fit"
              >
                <span>Siga no Instagram</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {anoAtual} MM Parfum. Todos os direitos reservados.</p>

          <p className="text-center md:text-right">
            Perfumaria Árabe Original em Indaiatuba, Campinas e Região.
          </p>
        </div>

      </div>
    </footer>
  );
}