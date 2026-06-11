import React, { useRef } from 'react';
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

export function Depoimentos() {
  const carouselRef = useRef(null);

  const avaliacoes = [
    {
      id: 1,
      nome: "Camila S.",
      produto: "Yara Feminino",
      tempo: "Há 2 dias",
      texto: "Estou apaixonada! O Yara é incrivelmente cremoso e doce na medida certa. Chegou super rápido e a embalagem é um luxo. Atendimento nota mil!",
    },
    {
      id: 2,
      nome: "Rafael M.",
      produto: "Asad Elixir",
      tempo: "Há 5 dias",
      texto: "Perfume imponente e com projeção absurda. Uso para trabalhar e sempre me perguntam qual fragrância estou usando. Recomendo muito a loja.",
    },
    {
      id: 3,
      nome: "Juliana T.",
      produto: "Khamrah",
      tempo: "Há 1 semana",
      texto: "Comprei no escuro e superou todas as expectativas. O frasco é belíssimo e a essência fixa na pele por mais de 12 horas. Comprarei novamente com certeza!",
    },
    {
      id: 4,
      nome: "Marcos V.",
      produto: "Turathi Blue",
      tempo: "Há 1 semana",
      texto: "Cítrico perfeito para o dia a dia, mas com aquela imponência dos perfumes árabes. Fixação excelente mesmo nos dias mais quentes.",
    },
    {
      id: 5,
      nome: "Beatriz R.",
      produto: "Eclaire",
      tempo: "Há 2 semanas",
      texto: "Cheiro puro de caramelo e baunilha! Quem gosta de perfume gourmand vai pirar nesse aqui. Virou minha assinatura oficial.",
    },
    {
      id: 6,
      nome: "Thiago A.",
      produto: "Supremacy Collector",
      tempo: "Há 3 semanas",
      texto: "Fragrância de nicho espetacular. Abre frutado e depois fica com um fundo amadeirado defumado incrível. Vale cada centavo.",
    },
    {
      id: 7,
      nome: "Amanda L.",
      produto: "Sabah Al Ward",
      tempo: "Há 1 mês",
      texto: "Um floral super elegante que foge totalmente do comum. É marcante sem ser enjoativo. A entrega foi extremamente caprichada.",
    },
    {
      id: 8,
      nome: "Lucas H.",
      produto: "Maahir Legacy",
      tempo: "Há 1 mês",
      texto: "Hortelã e menta muito refrescantes na abertura. Excelente para o clima do Brasil. O frasco com a cabeça de cavalo é uma obra de arte.",
    }
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="depoimentos" className="py-16 bg-white relative border-t border-roxo-principal/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho com Resumo de Avaliações (Gatilho de Prova Social Consolidada) */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-serif font-bold text-roxo-principal mb-2">
              O que nossos clientes dizem
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-dourado-accent text-dourado-accent" />
                ))}
              </div>
              <p className="text-roxo-escuro/70 text-xs font-medium">
                <strong>4.9 de 5.0</strong> baseado em mais de 140 avaliações de clientes satisfeitos.
              </p>
            </div>
          </div>
          
          {/* Controles do Carrossel */}
          <div className="flex justify-center gap-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full border border-roxo-principal/20 text-roxo-principal hover:bg-roxo-principal/5 active:scale-95 transition-all"
              aria-label="Depoimentos anteriores"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full border border-roxo-principal/20 text-roxo-principal hover:bg-roxo-principal/5 active:scale-95 transition-all"
              aria-label="Próximos depoimentos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Container do Carrossel */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {avaliacoes.map((avaliacao) => (
            <div 
              key={avaliacao.id} 
              className="bg-lilas-fundo/30 border border-roxo-principal/10 rounded-2xl p-6 relative flex flex-col justify-between min-w-[280px] sm:min-w-[350px] max-w-[350px] snap-start hover:shadow-sm transition-shadow"
            >
              <MessageSquareQuote className="absolute top-4 right-4 w-8 h-8 text-roxo-principal/10" strokeWidth={1} />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-dourado-accent text-dourado-accent" />
                    ))}
                  </div>
                  <span className="text-[10px] text-roxo-escuro/50 font-medium">
                    {avaliacao.tempo}
                  </span>
                </div>

                <p className="text-sm text-roxo-escuro italic leading-relaxed mb-6">
                  "{avaliacao.texto}"
                </p>
              </div>

              {/* Rodapé do Card com Validação de Compra */}
              <div className="border-t border-roxo-principal/10 pt-4 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-roxo-principal text-sm">
                    {avaliacao.nome}
                  </span>
                  <div className="flex items-center gap-0.5 bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200/50 text-[9px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verificado</span>
                  </div>
                </div>
                <span className="block text-[10px] uppercase tracking-widest text-dourado-accent font-bold">
                  Comprou: {avaliacao.produto}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}