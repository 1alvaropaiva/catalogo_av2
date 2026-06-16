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
