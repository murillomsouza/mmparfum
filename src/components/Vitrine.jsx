import React, { useState, useEffect } from 'react';
import { Search, PackageSearch, ChevronDown, ChevronUp } from 'lucide-react';
import { perfumesData } from '../data/perfumes';
import { FilterBar } from './FilterBar';
import { ProductCard } from './ProductCard';
import { WHATSAPP_NUMBER } from '../constants';

export function Vitrine() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);
  
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem('mmparfum_favoritos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mmparfum_favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    setVisibleCount(4);
  }, [searchTerm, filtroAtivo]);

  const toggleFavorito = (id) => {
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const perfumesFiltrados = perfumesData.filter((perfume) => {
    if (filtroAtivo === 'Favoritos') {
      if (!favoritos.includes(perfume.id)) return false;
    } else if (filtroAtivo !== 'Todos' && perfume.gender !== filtroAtivo) {
      return false;
    }
    
    const termoBusca = searchTerm.toLowerCase();
    const matchBusca = 
      perfume.name.toLowerCase().includes(termoBusca) ||
      perfume.brand.toLowerCase().includes(termoBusca) ||
      perfume.aromas.toLowerCase().includes(termoBusca);

    return matchBusca;
  });

  const perfumesExibidos = perfumesFiltrados.slice(0, visibleCount);

  const handleEncomendaClick = () => {
    const text = `Olá! Busquei por "${searchTerm}" no site da MM Parfum e vi que não está disponível no momento. Gostaria de verificar a possibilidade de fazer uma encomenda!`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleVerMais = () => {
    setVisibleCount(prev => prev + 4);
  };

  // Reduz a lista impedindo que o valor fique menor que 4
  const handleVerMenos = () => {
    setVisibleCount(prev => {
      const proximoValor = prev - 4;
      return proximoValor < 4 ? 4 : proximoValor;
    });
  };

  return (
    <section id="produtos" className="py-16 bg-lilas-fundo relative min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif font-bold text-roxo-principal mb-2">
            Nossas Essências
          </h2>
          <p className="text-roxo-escuro/70 text-sm max-w-md mx-auto">
            Explore nossa curadoria de perfumaria árabe e encontre a fragrância que conta a sua história.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-2 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-roxo-principal/50" />
          </div>
          <input
            type="text"
            placeholder="Buscar por perfume, marca ou nota olfativa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-roxo-principal/20 text-sm text-roxo-escuro placeholder-roxo-principal/40 focus:outline-none focus:border-dourado-accent focus:ring-1 focus:ring-dourado-accent transition-all shadow-sm"
          />
        </div>

        <FilterBar filtroAtivo={filtroAtivo} setFiltroAtivo={setFiltroAtivo} />

        <div className="text-center mb-8 text-xs font-bold text-dourado-accent uppercase tracking-widest">
          {perfumesFiltrados.length > 0 ? (
            <span>
              Exibindo {perfumesExibidos.length} de {perfumesFiltrados.length} fragrâncias
            </span>
          ) : (
            <span>Nenhum resultado encontrado</span>
          )}
        </div>

        {perfumesFiltrados.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {perfumesExibidos.map((perfume) => (
                <ProductCard 
                  key={perfume.id} 
                  perfume={perfume} 
                  isFavorito={favoritos.includes(perfume.id)}
                  toggleFavorito={toggleFavorito}
                />
              ))}
            </div>
            
            {/* Bloco de Botões de Controle de Paginação */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              
              {/* Botão Ver Menos: Só aparece se houver mais de 4 itens na tela */}
              {visibleCount > 4 && (
                <button
                  onClick={handleVerMenos}
                  className="group flex items-center gap-2 bg-transparent border-2 border-roxo-principal text-roxo-principal px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-roxo-principal/5 transition-all duration-300"
                >
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  Ver Menos
                </button>
              )}

              {/* Botão Ver Mais: Só aparece se ainda houver itens ocultos no array */}
              {visibleCount < perfumesFiltrados.length && (
                <button
                  onClick={handleVerMais}
                  className="group flex items-center gap-2 bg-roxo-principal text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-roxo-escuro transition-all duration-300 shadow-md shadow-roxo-principal/10"
                >
                  Ver Mais Fragrâncias
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
              )}

            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white/50 border border-roxo-principal/10 rounded-2xl p-8 text-center max-w-lg mx-auto">
            <PackageSearch className="w-16 h-16 text-roxo-principal/40 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-roxo-principal mb-2">
              {filtroAtivo === 'Favoritos' && searchTerm === '' 
                ? 'Nenhum favorito salvo' 
                : 'Fragrância temporariamente esgotada'}
            </h3>
            <p className="text-sm text-roxo-escuro/80 mb-6">
              {filtroAtivo === 'Favoritos' && searchTerm === ''
                ? 'Você ainda não adicionou nenhum perfume à sua lista de favoritos.'
                : `Não encontramos nenhum perfume com o termo "${searchTerm}" em nosso estoque a pronta entrega.`}
            </p>
            {!(filtroAtivo === 'Favoritos' && searchTerm === '') && (
              <button
                onClick={handleEncomendaClick}
                className="bg-roxo-principal text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:bg-roxo-escuro active:scale-95 transition-all flex items-center gap-2"
              >
                Encomendar via WhatsApp
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
}