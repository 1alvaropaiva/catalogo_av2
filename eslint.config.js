/**
 * Arquivo: eslint.config.js
 *
 * Responsabilidade:
 * Define as regras de análise estática para manter consistência e qualidade do código.
 *
 * Função dentro do sistema:
 * Padroniza práticas de TypeScript e React durante desenvolvimento e CI local.
 *
 * Entradas:
 * Presets do ESLint, plugins e padrões globais de lint para arquivos TS/TSX.
 *
 * Saídas:
 * Exporta a configuração consolidada consumida pelo executor de lint.
 *
 * Dependências:
 * @eslint/js, typescript-eslint, plugins de hooks/refresh do React e globals.
 *
 * Fluxo:
 * Carregado quando o lint é executado para validar regras e sinalizar problemas.
 *
 * Observações:
 * Comentário documental adicionado sem impacto funcional.
 */
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
