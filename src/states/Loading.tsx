/**
 * Arquivo: Loading.tsx
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