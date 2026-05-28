/** Propriedades para exibir erros de forma padronizada. */
interface ErrorMessageProps {
  /** Mensagem de erro visível ao usuário. */
  message: string
  /** Ação opcional para tentar novamente a operação que falhou. */
  onRetry?: () => void
}

// Componente reutilizável para feedback de falhas em tela.
function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="surface-card border border-[color:var(--color-danger)]/40 bg-[color:var(--color-surface)] text-center">
      <p className="text-sm font-medium text-[color:var(--color-danger)]">{message}</p>

      {onRetry && (
        <button type="button" className="btn-secondary mt-4" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
