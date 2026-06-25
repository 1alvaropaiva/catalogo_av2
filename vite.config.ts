/**
 * Arquivo: vite.config.ts
 *
 * Responsabilidade:
 * Configura o build e o servidor de desenvolvimento da aplicação.
 *
 * Função dentro do sistema:
 * Define como o Vite inicializa o projeto React e integra o processamento de estilos.
 *
 * Entradas:
 * Configurações de plugins e opções padrão de execução do Vite.
 *
 * Saídas:
 * Exporta a configuração final usada em desenvolvimento e build.
 *
 * Dependências:
 * Vite, plugin React e plugin Tailwind para Vite.
 *
 * Fluxo:
 * Carregado na inicialização para registrar plugins e regras de compilação.
 *
 * Observações:
 * Comentário documental adicionado sem impacto funcional.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
