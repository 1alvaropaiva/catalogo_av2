/**
 * Arquivo: NotFound.tsx
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
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button.tsx'

function NotFound() {

    const navigate =
        useNavigate()

    return (

        <section
            className="
                flex
                min-h-[70vh]
                flex-col
                items-center
                justify-center
                px-6
                text-center
            "
        >

            <img
                src="/404.svg"
                alt="PÃ¡gina nÃ£o encontrada"
                className="
                    mb-8
                    w-full
                    max-w-[340px]
                    select-none
                "
                draggable={false}
            />

            <h1
                className="
                    text-3xl
                    font-bold
                    text-[color:var(--color-text)]
                "
            >
                Página não encontrada
            </h1>

            <p
                className="
                    mt-3
                    max-w-md
                    text-[color:var(--color-text-muted)]
                "
            >
                A página que você tentou acessar não existe
                ou foi removida.
            </p>

            <div className="mt-8">

                <Button
                    className="btn-primary"
                    onClick={() => navigate('/')}
                >
                    Voltar ao início
                </Button>

            </div>

        </section>

    )
}

export default NotFound