import React from 'react';
import { Sparkles, Gift, Heart, ShieldCheck } from 'lucide-react';

export function TrustBar() {
  const trustItems = [
    { 
      icon: <Sparkles className="w-6 h-6 text-dourado-accent" />, 
      title: "Perfumes 100% Originais", 
      desc: "Qualidade garantida" 
    },
    { 
      icon: <Gift className="w-6 h-6 text-dourado-accent" />, 
      title: "Embalagem Premium", 
      desc: "Pronto para presentear" 
    },
    { 
      icon: <Heart className="w-6 h-6 text-dourado-accent" />, 
      title: "Presenteie com Amor", 
      desc: "Kits exclusivos" 
    },
    { 
      icon: <ShieldCheck className="w-6 h-6 text-dourado-accent" />, 
      title: "Compra Segura", 
      desc: "Garantia de entrega" 
    },
  ];

  return (
    <section className="bg-roxo-principal text-white py-6 border-y border-dourado-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4 py-2">
              <div className="mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {item.icon}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-lilas-fundo mb-1">
                {item.title}
              </h3>
              <p className="text-[10px] text-lilas-fundo/70 tracking-wide">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}