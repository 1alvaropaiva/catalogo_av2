interface LoadingProps {
    message?: string
    size?: string
    containerClassName?: string
    spinnerClassName?: string
    textClassName?: string
}

function Loading({
                     message = 'Carregando...',
                     size = 'h-12 w-12',
                     containerClassName = 'flex flex-col items-center justify-center gap-4 py-16 text-center',
                     spinnerClassName = '',
                     textClassName = 'text-sm font-medium text-[color:var(--color-text-muted)]',
                 }: LoadingProps) {
    return (
        <div className={containerClassName}>
            <div
                role="status"
                aria-label="Carregando"
                className={`
          ${size}
          animate-spin
          rounded-full
          border-4
          border-[color:var(--color-input-focus)]
          border-t-[color:var(--color-primary)]
          ${spinnerClassName}
        `}
            />

            <p className={textClassName}>
                {message}
            </p>
        </div>
    )
}

export default Loading