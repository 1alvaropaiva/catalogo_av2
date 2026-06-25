/**
 * Arquivo: ErrorMessage.tsx
 *
 * Responsabilidade:
 * Centraliza a responsabilidade principal deste módulo dentro do catálogo de produtos.
 *
 * Função dentro do sistema:
 * Atua como parte do fluxo de interface, estado ou integração conforme sua pasta (componentes, páginas, hooks, API, tipos, utilitários e validações).
 *
 * Entradas:
 * Recebe dados por props, parâmetros de função, estado local e/ou valores vindos de serviços e rotas.
 *
 * Saídas:
 * Retorna elementos de interface, resultados transformados, estados atualizados ou payloads para integração.
 *
 * Dependências:
 * Utiliza módulos internos do projeto e bibliotecas da stack React + TypeScript quando necessário.
 *
 * Fluxo:
 * Executa seu papel específico no ciclo de renderização, validação, transformação de dados ou comunicação com API.
 *
 * Observações:
 * Este cabeçalho foi adicionado para padronização documental sem alterar regras de negócio.
 */
import Button from "../components/ui/Button.tsx";

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="surface-card border border-[color:var(--color-danger)]/40 bg-[color:var(--color-surface)] text-center">
      <p className="text-sm font-medium text-[color:var(--color-danger)]">{message}</p>

      {onRetry && (
          <Button
              className="btn-primary mt-4"
              onClick={onRetry}
          >
            Tentar novamente
          </Button>
      )}
    </div>
  )
}

export default ErrorMessage
