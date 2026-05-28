/** Propriedades para personalizar a mensagem de carregamento. */
interface LoadingProps {
  /** Texto opcional exibido abaixo do indicador visual. */
  message?: string
}

// Componente padrão de estado de carregamento para telas/listagens.
function Loading({ message = 'Carregando dados...' }: LoadingProps) {
  return (
    <div className="surface-card flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-[color:var(--color-input-focus)] border-t-[color:var(--color-primary)]"
        role="status"
        aria-label="Carregando"
      />
      <p className="text-sm font-medium text-[color:var(--color-text-muted)]">{message}</p>
    </div>
  )
}

export default Loading
