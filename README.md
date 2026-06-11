# MM Parfum

Landing Page desenvolvida para uma perfumaria especializada em fragrâncias árabes e importadas, com foco em experiência do usuário, performance, SEO Local e conversão de vendas.

## Objetivo

Desenvolver uma aplicação moderna e responsiva para apresentação de produtos, fortalecendo a presença digital da marca e facilitando o contato direto com clientes através do WhatsApp.

## Tecnologias Utilizadas

- React
- Vite
- Tailwind CSS
- JavaScript (ES6+)
- Lucide React
- LocalStorage
- Docker
- Apache/LiteSpeed

## Funcionalidades

### Catálogo de Produtos
- Exibição de perfumes em formato de vitrine.
- Busca dinâmica por nome.
- Filtro por categorias.
- Paginação com carregamento progressivo.

### Favoritos
- Marcação de produtos favoritos.
- Persistência dos dados utilizando LocalStorage.

### Modal de Detalhes
- Visualização ampliada dos produtos.
- Bloqueio de rolagem da página durante a abertura do modal.
- Integração direta com WhatsApp para contato comercial.

### Prova Social
- Seção de depoimentos.
- Indicadores de avaliação e compra verificada.

### SEO
- Meta tags otimizadas.
- Open Graph para compartilhamento em redes sociais.
- Schema.org (JSON-LD).
- Sitemap.xml.
- Robots.txt.
- Estrutura preparada para indexação em mecanismos de busca.

### Responsividade
- Interface mobile-first.
- Adaptação para tablets e desktops.

## Estrutura do Projeto

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Vitrine.jsx
│   ├── ProductCard.jsx
│   ├── FilterBar.jsx
│   ├── TrustBar.jsx
│   ├── Depoimentos.jsx
│   └── Footer.jsx
│
├── constants.js
├── App.jsx
└── main.jsx
```

## Execução Local

Clone o repositório:

```bash
git clone <repositorio>
```

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

## Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta:

```text
dist/
```

## Principais Desafios Técnicos

- Implementação de favoritos persistentes utilizando LocalStorage.
- Controle de estado dos modais.
- Otimização da navegação por âncoras com cabeçalho fixo.
- Estruturação de SEO Local para melhor indexação.
- Organização do projeto utilizando componentes reutilizáveis.

## Autor

Murillo de Souza

Desenvolvedor Full Stack em formação pela FATEC Indaiatuba.