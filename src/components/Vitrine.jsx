import React, { useState, useEffect } from 'react';
import {
  Search,
  PackageSearch,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { perfumes } from '../data/perfumes';
import { FilterBar } from './FilterBar';
import { ProductCard } from './ProductCard';
import { WHATSAPP_NUMBER } from '../constants';

const ITEMS_PER_PAGE = 4;

export function Vitrine() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem('mmparfum_favoritos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      'mmparfum_favoritos',
      JSON.stringify(favoritos)
    );
  }, [favoritos]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filtroAtivo, searchTerm]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const perfumesFiltrados = perfumes.filter((perfume) => {
    if (
      filtroAtivo === 'Favoritos' &&
      !favoritos.includes(perfume.id)
    ) {
      return false;
    }

    if (
      filtroAtivo !== 'Todos' &&
      filtroAtivo !== 'Favoritos' &&
      perfume.gender !== filtroAtivo
    ) {
      return false;
    }

    const termo = searchTerm.toLowerCase();

    return (
      perfume.name.toLowerCase().includes(termo) ||
      perfume.brand.toLowerCase().includes(termo) ||
      perfume.aromas.toLowerCase().includes(termo)
    );
  });

  const perfumesExibidos = perfumesFiltrados.slice(
    0,
    visibleCount
  );

  const handleVerMais = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleVerMenos = () => {
    setVisibleCount((prev) =>
      Math.max(ITEMS_PER_PAGE, prev - ITEMS_PER_PAGE)
    );
  };

  const handleEncomendaClick = () => {
    const mensagem = `Olá! Busquei por "${searchTerm}" no site da MM Parfum e vi que não está disponível no momento. Gostaria de verificar a possibilidade de fazer uma encomenda.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, '_blank');
  };

  const semFavoritos =
    filtroAtivo === 'Favoritos' && searchTerm === '';

  return (
    <section
      id="produtos"
      className="py-16 bg-lilas-fundo relative min-h-[600px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif font-bold text-roxo-principal mb-2">
            Nossas Essências
          </h2>

          <p className="text-roxo-escuro/70 text-sm max-w-md mx-auto">
            Explore nossa curadoria de perfumaria árabe e encontre
            a fragrância que conta a sua história.
          </p>
        </div>

        {/* Busca */}
        <div className="max-w-md mx-auto mb-2 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-roxo-principal/50" />
          </div>

          <input
            type="text"
            value={searchTerm}
            placeholder="Buscar por perfume, marca ou nota olfativa..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-roxo-principal/20 text-sm text-roxo-escuro placeholder-roxo-principal/40 focus:outline-none focus:border-dourado-accent focus:ring-1 focus:ring-dourado-accent transition-all shadow-sm"
          />
        </div>

        {/* Filtros */}
        <FilterBar
          filtroAtivo={filtroAtivo}
          setFiltroAtivo={setFiltroAtivo}
        />

        {/* Contador */}
        <div className="text-center mb-8 text-xs font-bold text-dourado-accent uppercase tracking-widest">
          {perfumesFiltrados.length > 0 ? (
            <span>
              Exibindo {perfumesExibidos.length} de{' '}
              {perfumesFiltrados.length} fragrâncias
            </span>
          ) : (
            <span>Nenhum resultado encontrado</span>
          )}
        </div>

        {/* Produtos */}
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

            {/* Paginação */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">

              {visibleCount > ITEMS_PER_PAGE && (
                <button
                  onClick={handleVerMenos}
                  className="group flex items-center gap-2 bg-transparent border-2 border-roxo-principal text-roxo-principal px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-roxo-principal/5 transition-all duration-300"
                >
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  Ver Menos
                </button>
              )}

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

            <PackageSearch
              className="w-16 h-16 text-roxo-principal/40 mb-4"
              strokeWidth={1.5}
            />

            <h3 className="text-lg font-bold text-roxo-principal mb-2">
              {semFavoritos
                ? 'Nenhum favorito salvo'
                : 'Fragrância temporariamente esgotada'}
            </h3>

            <p className="text-sm text-roxo-escuro/80 mb-6">
              {semFavoritos
                ? 'Você ainda não adicionou nenhum perfume à sua lista de favoritos.'
                : `Não encontramos nenhum perfume com o termo "${searchTerm}" em nosso estoque a pronta entrega.`}
            </p>

            {!semFavoritos && (
              <button
                onClick={handleEncomendaClick}
                className="bg-roxo-principal text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:bg-roxo-escuro active:scale-95 transition-all"
              >
                Encomendar via WhatsApp
              </button>
            )}

          </div>
        )}

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
}