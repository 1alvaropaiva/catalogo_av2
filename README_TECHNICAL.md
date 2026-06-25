# Visão geral do projeto

- **Objetivo do sistema:** catálogo web de produtos com listagem, filtro por nome/categoria, cadastro, edição e exclusão.
- **Stack utilizada:** React 19, TypeScript, React Router, Axios, Vite, Tailwind CSS v4, ESLint.
- **Arquitetura:** frontend SPA organizado por camadas simples (`pages` → `components`/`hooks` → `api`/`utils`/`validators`/`types`).

# Estrutura do projeto

- `src/api`: acesso HTTP e normalização de dados de produtos.
- `src/components/layout`: composição estrutural compartilhada (ex.: cabeçalho).
- `src/components/product`: componentes de domínio de produto (card, detalhe, formulário, lista, modais).
- `src/components/ui`: elementos reutilizáveis de interface (botão, busca, tema).
- `src/hooks`: lógica de formulário e estado local reutilizável.
- `src/pages`: páginas roteadas da aplicação.
- `src/states`: componentes de estado de tela (erro/carregamento).
- `src/types`: contratos de tipagem do domínio.
- `src/utils`: transformações auxiliares (imagem e payload).
- `src/validators`: validações de formulário e regras de entrada.
- `public`: assets estáticos.

# Fluxo da aplicação

1. `index.html` carrega `src/main.tsx`.
2. `main.tsx` monta `App` dentro de `#root`.
3. `App.tsx` define rotas e layout base.
4. Páginas chamam APIs (`src/api/produtos.ts`) e repassam dados para componentes.
5. Formulário usa `useProductForm` + `validateProduct` para entrada/validação.
6. Submit transforma payload e persiste via API; UI atualiza estado conforme resposta.

# Arquivo por arquivo

## Entrada e configuração

- `index.html`
  - **Responsabilidade:** documento base da SPA.
  - **Dependências:** `src/main.tsx`, `src/index.css`.
  - **Principais funções:** ponto de montagem `#root`.
  - **Observações:** define metadados/favicons.
- `vite.config.ts`
  - **Responsabilidade:** configuração de build/dev server.
  - **Dependências:** plugins React e Tailwind.
  - **Principais funções:** exporta `defineConfig`.
  - **Observações:** sem lógica de negócio.
- `eslint.config.js`
  - **Responsabilidade:** padronização de lint.
  - **Dependências:** `@eslint/js`, `typescript-eslint`, plugins React.
  - **Principais funções:** regras e escopo de análise.
  - **Observações:** ignora `dist`.

## Núcleo da aplicação

- `src/main.tsx`: bootstrap React e import de estilos globais.
- `src/App.tsx`: roteamento (`/`, `/novo`, `/produto/:id`, `*`) e composição base.
- `src/index.css`: variáveis, tema e classes utilitárias globais.

## API e domínio

- `src/api/produtos.ts`
  - **Responsabilidade:** CRUD de produtos e normalização de dados.
  - **Dependências:** Axios, tipos de produto.
  - **Principais funções:** `getProdutos`, `getCategorias`, `getProdutoById`, `criarProduto`, `atualizarProduto`, `deletarProduto`.
  - **Observações:** sanitiza campos string e normaliza preço.
- `src/types/product.ts`
  - **Responsabilidade:** contratos de dados (`Product`, `ProductPayload`, tipos de formulário/erros).
  - **Dependências:** TypeScript.
  - **Principais funções:** tipagem estática para segurança de compilação.
  - **Observações:** base de coerência entre UI e API.

## Hooks, validação e utilitários

- `src/hooks/useProductForm.ts`
  - **Responsabilidade:** estado do formulário de produto (campos, erros, modo de imagem, submit).
  - **Dependências:** `validateProduct`, utilitário de imagem, tipos.
  - **Principais funções:** handlers de campo, upload, troca de modo e envio.
  - **Observações:** aceita `initialValues` para reutilização em criação/edição.
- `src/validators/product.validator.ts`
  - **Responsabilidade:** validação de entradas do formulário.
  - **Dependências:** tipos de formulário.
  - **Principais funções:** `validateProduct` e verificação de URL/base64 para imagem.
  - **Observações:** imagem opcional, validada apenas quando presente.
- `src/utils/image.mapper.ts`: conversão de arquivo de imagem para base64.
- `src/utils/product.mapper.ts`: transformação de dados entre formatos de UI/API (quando aplicável).

## Páginas

- `src/pages/Home.tsx`: carregamento inicial da listagem e filtros.
- `src/pages/NewProduct.tsx`: fluxo de criação de produto com feedback/erro.
- `src/pages/ProductPage.tsx`: busca produto por rota e renderização detalhada.
- `src/pages/NotFound.tsx`: fallback de rota inexistente.

## Componentes

- `src/components/layout/Header.tsx`: navegação principal e ações globais.
- `src/components/product/ProductList.tsx`: renderização de coleção de produtos.
- `src/components/product/ProductCard.tsx`: resumo visual de produto para listagem.
- `src/components/product/ProductDetail.tsx`: detalhe completo, ações de editar/excluir.
- `src/components/product/ProductForm.tsx`: formulário reutilizável para criar/editar.
- `src/components/product/modals/EditProductModal.tsx`: modal de edição com `ProductForm`.
- `src/components/product/modals/ConfirmDeleteModal.tsx`: confirmação de remoção.
- `src/components/ui/Button.tsx`: botão padronizado.
- `src/components/ui/SearchBar.tsx`: busca textual e filtros.
- `src/components/ui/ThemeToggle.tsx`: alternância de tema.

## Estados de tela

- `src/states/ErrorMessage.tsx`: feedback visual de erro.
- `src/states/Loading.tsx`: feedback de carregamento.

# Estado e gerenciamento de dados

- Estado local com hooks (`useState`, `useEffect`) por página/componente.
- Formulário centralizado no hook `useProductForm` para evitar duplicação.
- Dados de produto trafegam tipados por `Product`/`ProductPayload`.
- Persistência remota via Axios com normalização antes de entrar na UI.

# Integrações externas

- **API REST** configurada por variáveis `VITE_BASE_URL` e `VITE_RESOURCE`.
- **Axios** para transporte HTTP e timeout.
- **React Router** para navegação e parâmetros de rota.
- **Tailwind CSS** para estilo utilitário e tema.

# Fluxos importantes

- **CRUD de produtos:** listar (`Home`), detalhar (`ProductPage`), criar (`NewProduct`), editar/excluir (`ProductDetail` + modais).
- **Imagem de produto:** URL ou upload convertido para base64; troca de modo não apaga valor automaticamente.
- **Validação:** campos obrigatórios de domínio (nome, preço, descrição mínima, categoria); imagem opcional.

# Decisões arquiteturais

- Reuso de `ProductForm` em criação e edição para reduzir divergência de comportamento.
- Validação isolada em `validators` para manter componentes focados em UI.
- API encapsulada em módulo único para centralizar normalização/sanitização.
- Tipagem explícita de payloads para consistência entre camadas.

# Pontos de atenção

- Dependência de variáveis de ambiente corretas (`VITE_BASE_URL`, `VITE_RESOURCE`).
- Upload em base64 pode aumentar payload e impactar performance em imagens grandes.
- Garantir coerência entre respostas da API e normalização local.
- Tratar falhas de rede com feedback amigável sem bloquear navegação.

# Guia rápido para novos desenvolvedores

1. Instale dependências: `npm install`.
2. Configure `.env` com `VITE_BASE_URL` e `VITE_RESOURCE`.
3. Rode em dev: `npm run dev`.
4. Validar qualidade: `npm run lint` e `npm run build`.
5. Inicie estudo pelos arquivos: `src/main.tsx` → `src/App.tsx` → `src/pages` → `src/components/product`.