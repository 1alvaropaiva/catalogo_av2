Você é um engenheiro de software sênior especializado em React, TypeScript, Vite, TailwindCSS e arquitetura frontend componentizada.  
Estou utilizando React 19 + TypeScript + TailwindCSS + Vite.  
Quero que você atue como um desenvolvedor experiente e gere uma implementação COMPLETA, organizada e bem estruturada para um projeto acadêmico de catálogo de produtos.

IMPORTANTE:
- Utilize apenas React + TypeScript + TailwindCSS + Axios + React Router DOM.
- NÃO utilize Redux, Zustand, Context API complexa ou bibliotecas externas de gerenciamento de estado.
- O foco da avaliação é:
    - componentização
    - organização do código
    - reutilização
    - legibilidade
    - separação de responsabilidades
    - uso correto de hooks
    - comentários úteis
    - navegação
    - consumo de API REST
- Componentize o máximo possível.
- Evite duplicação de código.
- Use boas práticas modernas de React.
- Crie um código limpo e profissional.
- Explique rapidamente as decisões importantes antes de gerar os arquivos.
- Gere TODOS os arquivos completos.
- Sempre mostre o caminho do arquivo antes do código.
- NÃO resuma código.
- NÃO omita partes importantes.
- Gere código pronto para copiar e colar.

========================================
TECNOLOGIAS JÁ INSTALADAS
========================================

package.json:

{
"name": "catalogo_av2",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "tsc -b && vite build",
"lint": "eslint .",
"preview": "vite preview"
},
"dependencies": {
"@tailwindcss/vite": "^4.2.4",
"axios": "^1.16.0",
"react": "^19.2.5",
"react-dom": "^19.2.5",
"tailwindcss": "^4.2.4"
},
"devDependencies": {
"@eslint/js": "^10.0.1",
"@types/node": "^24.12.2",
"@types/react": "^19.2.14",
"@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^6.0.1",
"eslint": "^10.2.1",
"eslint-plugin-react-hooks": "^7.1.1",
"eslint-plugin-react-refresh": "^0.5.2",
"globals": "^17.5.0",
"typescript": "~6.0.2",
"typescript-eslint": "^8.58.2",
"vite": "^8.0.10"
}
}

========================================
ESTADO ATUAL DO PROJETO
========================================

Atualmente o projeto possui apenas:

src/main.tsx
src/App.tsx
src/index.css

main.tsx:

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
<StrictMode>
<App />
</StrictMode>,
)

App.tsx:

import './index.css'

function App() {
return (
<>
</>
)
}

export default App

========================================
OBJETIVO DO PROJETO
========================================

Criar um sistema de catálogo de produtos.

O sistema deve permitir:
- visualizar produtos
- visualizar detalhes de um produto
- adicionar produto
- filtrar produtos por categoria
- pesquisar produtos
- feedback visual de loading e erros

========================================
REQUISITOS OBRIGATÓRIOS
========================================

COMPONENTES EXIGIDOS PELO PROFESSOR:
- ProductCard
- ProductList
- ProductDetail
- ProductForm
- Header/Navbar

ROTAS:
- / → Lista de produtos
- /produto/:id → Detalhes do produto
- /novo → Formulário para adicionar produto

FORMULÁRIO:
Campos:
- nome
- preço
- descrição
- imagem
- categoria

Validação:
- usar useState
- usar onSubmit
- validação simples

REQUISIÇÕES HTTP:
- utilizar axios
- axios já está instalado

MockAPI base URL:
https://69fca88930ad0a6fd1bff61e.mockapi.io/catalogo

Exemplo esperado:
- GET produtos
- GET produto por id
- POST produto
- PUT produto
- DELETE produto

TAILWIND:
- estilização moderna
- responsiva
- reutilizável
- centralizar estilos globais no index.css
- criar variáveis/utilitários reutilizáveis
- evitar repetir classes gigantescas

========================================
ESTRUTURA DE PASTAS ESPERADA
========================================

src/
├── api/
│   └── produtos.ts
├── components/
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── ProductDetail.tsx
│   ├── ProductForm.tsx
│   ├── Loading.tsx
│   ├── ErrorMessage.tsx
│   └── SearchBar.tsx
├── pages/
│   ├── Home.tsx
│   ├── ProductPage.tsx
│   └── NewProduct.tsx
├── types/
│   └── product.ts
├── App.tsx
├── main.tsx
└── index.css

========================================
REQUISITOS DE QUALIDADE
========================================

- Usar TypeScript corretamente.
- Criar tipagem Product.
- Criar API separada em api/produtos.ts.
- Criar componentes pequenos e reutilizáveis.
- Separar página de componente.
- Evitar lógica excessiva dentro das páginas.
- Usar React Router DOM corretamente.
- Implementar loading.
- Implementar tratamento de erros.
- Implementar estado vazio.
- Criar navbar responsiva.
- Usar semântica HTML adequada.
- Código bem comentado.
- Manter consistência visual.
- Criar design moderno e agradável.
- Usar hover, transition e responsividade.
- Organizar imports.
- Seguir boas práticas de nomenclatura.

========================================
EXTRAS IMPORTANTES
========================================

- Adicione botão de voltar na página de detalhes.
- Adicione placeholder caso a imagem falhe.
- Adicione feedback visual ao cadastrar produto.
- Adicione filtro por categoria.
- Adicione busca por nome.
- Adicione cards responsivos.
- Adicione animações leves com Tailwind.
- Adicione empty state elegante.
- Crie loading spinner reutilizável.

========================================
O QUE EU QUERO QUE VOCÊ FAÇA
========================================

1. Instale e configure React Router DOM.
2. Gere a estrutura completa do projeto.
3. Gere TODOS os arquivos completos.
4. Explique rapidamente a arquitetura.
5. Gere código profissional.
6. Gere index.css muito bem organizado.
7. Crie componentes realmente reutilizáveis.
8. Use Tailwind de forma inteligente.
9. Não use bibliotecas desnecessárias.
10. Faça um projeto digno de nota máxima.

IMPORTANTE:
- Gere tudo passo a passo.
- Mostre primeiro a estrutura de pastas.
- Depois gere os arquivos completos.
- Sempre informe qual arquivo está sendo criado.
- Nunca omita imports.
- Nunca deixe "..." no código.
- O código deve funcionar imediatamente após colar.