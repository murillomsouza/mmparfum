import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      pergunta: "Os perfumes são originais?",
      resposta: "Sim, 100% originais. Trabalhamos apenas com importadores oficiais das marcas Lattafa, Afnan, Al Wataniah, entre outras. Todos os produtos vão lacrados, com selo de autenticidade e batch code rastreável."
    },
    {
      pergunta: "Qual o prazo de entrega para Indaiatuba e Campinas?",
      resposta: "Para Indaiatuba, oferecemos entrega expressa (muitas vezes no mesmo dia). Para Campinas e Região Metropolitana, as entregas costumam ocorrer em até 48 horas úteis após a confirmação do pagamento."
    },
    {
      pergunta: "Quais são as formas de pagamento aceitas?",
      resposta: "Aceitamos pagamentos via PIX (com desconto especial) e parcelamento no cartão de crédito através de link de pagamento seguro."
    },
    {
      pergunta: "Nunca usei perfume árabe, como escolher?",
      resposta: "Nós oferecemos uma consultoria olfativa gratuita pelo WhatsApp! Basta nos dizer quais perfumes você já gosta de usar (ou quais notas prefere, como doces, amadeiradas ou florais) e indicaremos a fragrância perfeita para você."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-lilas-fundo relative border-t border-roxo-principal/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-roxo-principal mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-roxo-principal mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-sm text-roxo-escuro/70">
            Tudo o que você precisa saber antes de adquirir sua nova assinatura olfativa.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-roxo-principal/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-roxo-principal/30"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white focus:outline-none"
              >
                <span className="font-bold text-roxo-escuro pr-4">
                  {faq.pergunta}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-roxo-principal text-white' : 'bg-roxo-principal/5 text-roxo-principal'}`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-sm text-roxo-escuro/70 leading-relaxed border-t border-roxo-principal/5 mt-2">
                  {faq.resposta}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}