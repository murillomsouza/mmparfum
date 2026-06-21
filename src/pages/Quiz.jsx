import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, RefreshCcw, CheckCircle2, Clock, Ticket } from 'lucide-react';
import { perfumes } from '../data/perfumes';
import { WHATSAPP_NUMBER } from '../constants';

const quizQuestions = [
  {
    id: 1,
    question: "Como você prefere que seja a assinatura do seu perfume?",
    options: [
      { text: "Marcante e Feminina", tags: ["Feminino", "feminina", "mulher"] },
      { text: "Imponente e Masculina", tags: ["Masculino", "masculina", "homem"] },
      { text: "Versátil e Compartilhável", tags: ["Compartilhável", "unissex"] }
    ]
  },
  {
    id: 2,
    question: "Em qual momento você mais deseja se destacar com essa fragrância?",
    options: [
      { text: "No dia a dia (Trabalho ou reuniões)", tags: ["fresco", "dia", "suave", "cítrico", "versátil"] },
      { text: "Encontros românticos e jantares", tags: ["romântico", "sedutor", "baunilha", "envolvente"] },
      { text: "Na noite, festas e eventos marcantes", tags: ["intenso", "noite", "festa", "marcante", "poderoso"] }
    ]
  },
  {
    id: 3,
    question: "Quando você entra em um ambiente, qual sensação quer transmitir?",
    options: [
      { text: "Mistério e Sedução", tags: ["oud", "especiado", "couro", "mistério", "quente"] },
      { text: "Elegância e Sofisticação", tags: ["elegante", "sofisticado", "amadeirado", "clássico"] },
      { text: "Frescor e Energia", tags: ["fresco", "limpo", "aquático", "radiante", "floral"] }
    ]
  },
  {
    id: 4,
    question: "Pensando nos perfumes que você já gosta, qual mais te atrai?",
    options: [
      { text: "Fragrâncias doces e abaunilhadas", tags: ["doce", "baunilha", "caramelo", "gourmand"] },
      { text: "Fragrâncias intensas e com especiarias", tags: ["amadeirado", "âmbar", "especiarias", "incenso"] },
      { text: "Fragrâncias frescas, cítricas ou florais", tags: ["floral", "frutado", "cítrico", "rosas", "frutas"] }
    ]
  },
  {
    id: 5,
    question: "Como você define o comportamento ideal do perfume na sua pele?",
    options: [
      { text: "Uma 'bomba' olfativa (Alta projeção)", tags: ["forte", "intenso", "alta fixação", "rastro"] },
      { text: "Uma aura elegante (Projeção moderada)", tags: ["suave", "moderada", "intimista", "confortável"] }
    ]
  }
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Estado do Cronômetro (15 minutos = 900 segundos)
  const [timeLeft, setTimeLeft] = useState(900); 

  // Efeito 1: SEO Dinâmico e Rolagem pro Topo
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Altera o SEO dinamicamente para essa página
    const originalTitle = document.title;
    document.title = "✨ Descubra sua Assinatura Olfativa | Quiz MM Parfum";
    
    return () => {
      document.title = originalTitle; // Volta ao normal ao sair
    };
  }, []);

  // Efeito 2: Cronômetro de Escassez
  useEffect(() => {
    if (result && !isCalculating && timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [result, isCalculating, timeLeft]);

  // Formata o tempo para MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const trackGAEvent = (eventName, buttonName, location) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        'event_category': 'Interação_Quiz_Page',
        'event_label': buttonName,
        'location': location
      });
    }
  };

  const handleOptionClick = (tags) => {
    const newTags = [...selectedTags, ...tags];
    setSelectedTags(newTags);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      trackGAEvent('quiz_progress', `Pergunta ${currentQuestion + 1} Respondida`, 'Página de Quiz');
    } else {
      calculateResult(newTags);
    }
  };

  const calculateResult = (finalTags) => {
    setIsCalculating(true);
    trackGAEvent('quiz_complete', 'Quiz Finalizado', 'Página de Quiz');

    setTimeout(() => {
      let bestMatch = perfumes[0];
      let maxScore = -1;

      perfumes.forEach(perfume => {
        let score = 0;
        const perfumeData = `${perfume.name} ${perfume.description} ${perfume.aromas} ${perfume.gender}`.toLowerCase();

        finalTags.forEach(tag => {
          if (perfumeData.includes(tag.toLowerCase())) {
            score++;
          }
        });

        const genderTags = quizQuestions[0].options.flatMap(opt => opt.tags);
        const userGenderTags = finalTags.filter(tag => genderTags.includes(tag));
        
        userGenderTags.forEach(gTag => {
            if(perfumeData.includes(gTag.toLowerCase())) {
                score += 5;
            }
        });

        if (score > maxScore) {
          maxScore = score;
          bestMatch = perfume;
        }
      });

      setResult(bestMatch);
      setTimeLeft(900); // Reseta o timer para 15 minutos ao revelar
      setIsCalculating(false);
      trackGAEvent('quiz_result', `Resultado: ${bestMatch.name}`, 'Página de Quiz');
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedTags([]);
    setResult(null);
    trackGAEvent('click_cta', 'Refazer Quiz', 'Página de Quiz');
  };

  const handleWhatsApp = () => {
    trackGAEvent('generate_lead', `Comprar do Quiz: ${result.name}`, 'Resultado Quiz');
    const text = `Olá! Acabei de fazer o Quiz no site e meu resultado ideal foi o *${result.name}*. Gostaria de usar meu cupom *MATCH5* para garantir o meu frasco com desconto!`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-lilas-fundo py-12 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        
        <Link 
          to="/" 
          onClick={() => trackGAEvent('click_nav', 'Voltar para Home', 'Header do Quiz')}
          className="inline-flex items-center gap-2 text-roxo-principal hover:text-roxo-escuro font-bold text-sm uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a loja
        </Link>

        {isCalculating && (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-roxo-principal/10 animate-pulse">
            <Sparkles className="w-12 h-12 text-dourado-accent mx-auto mb-6 animate-spin-slow" />
            <h2 className="text-2xl font-serif font-bold text-roxo-principal mb-2">
              Analisando seu perfil olfativo...
            </h2>
            <p className="text-roxo-escuro/70">Buscando a fragrância perfeita no nosso catálogo.</p>
          </div>
        )}

        {!isCalculating && result && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-roxo-principal/10 animate-in fade-in zoom-in duration-500">
            <div className="bg-roxo-principal p-8 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
              <Sparkles className="w-10 h-10 text-dourado-accent mx-auto mb-4 relative z-10" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-dourado-accent mb-2 relative z-10">O seu match perfeito é</h2>
              <h3 className="text-4xl font-serif font-bold relative z-10">{result.name}</h3>
            </div>

            <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-lilas-fundo/50 flex items-center justify-center p-4 border border-roxo-principal/5 relative">
                <img src={result.image} alt={result.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>

              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-dourado-accent mb-1">{result.brand}</h4>
                  <p className="text-sm text-roxo-escuro/80 leading-relaxed line-clamp-3">
                    {result.description}
                  </p>
                </div>

                {/* Bloco de Escassez e Oferta */}
                <div className="bg-roxo-principal/5 border border-roxo-principal/20 rounded-xl p-4 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold uppercase text-roxo-principal flex items-center gap-1.5">
                      <Ticket className="w-4 h-4" /> Bônus Desbloqueado
                    </span>
                    <span className={`text-sm font-bold flex items-center gap-1.5 ${timeLeft < 120 ? 'text-red-500 animate-pulse' : 'text-roxo-escuro'}`}>
                      <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                    </span>
                  </div>
                  <p className="text-xs text-roxo-escuro/80 mb-2">Use o código abaixo no WhatsApp para <strong className="text-roxo-principal">5% de desconto</strong> no seu frasco.</p>
                  <div className="bg-white border border-dashed border-dourado-accent text-center py-2 rounded font-bold text-lg text-roxo-principal tracking-widest">
                    MATCH5
                  </div>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-4 text-sm font-bold text-white bg-roxo-principal rounded-full hover:bg-roxo-escuro active:scale-95 transition-all shadow-lg shadow-roxo-principal/20 uppercase tracking-wider flex justify-center gap-2 items-center"
                >
                  Garantir com Desconto
                </button>

                <button
                  onClick={resetQuiz}
                  className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-roxo-principal/50 hover:text-roxo-escuro transition-colors uppercase tracking-widest"
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Refazer o Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {!isCalculating && !result && (
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-roxo-principal/10">
            <div className="mb-8">
              <div className="flex justify-between text-xs font-bold text-roxo-principal uppercase tracking-widest mb-2">
                <span>Passo {currentQuestion + 1} de {quizQuestions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-lilas-fundo rounded-full overflow-hidden">
                <div 
                  className="h-full bg-dourado-accent transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-roxo-principal mb-8 leading-tight">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.tags)}
                  className="w-full text-left p-5 rounded-2xl border-2 border-lilas-fundo hover:border-roxo-principal hover:bg-roxo-principal/5 transition-all duration-300 group flex items-center justify-between"
                >
                  <span className="text-base sm:text-lg font-medium text-roxo-escuro group-hover:text-roxo-principal transition-colors">
                    {option.text}
                  </span>
                  <div className="w-6 h-6 rounded-full border-2 border-roxo-principal/20 group-hover:border-roxo-principal group-hover:bg-roxo-principal flex items-center justify-center transition-all">
                    <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}