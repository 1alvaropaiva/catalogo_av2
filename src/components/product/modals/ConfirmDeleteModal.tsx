/**
 * Arquivo: ConfirmDeleteModal.tsx
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
import Button from "../../ui/Button.tsx";

interface ConfirmDeleteModalProps {
    productName: string
    isDeleting: boolean
    onCancel: () => void
    onConfirm: () => void
}

function ConfirmDeleteModal({
                                productName,
                                isDeleting,
                                onCancel,
                                onConfirm,
                            }: ConfirmDeleteModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="surface-card w-full max-w-md p-6">

                <h2 className="text-xl font-bold">
                    Excluir produto
                </h2>

                <p className="mt-3">
                    Deseja excluir <strong>{productName}</strong>?
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <Button
                        className="btn-secondary"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>

                    <Button
                        className="btn-danger"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting
                            ? 'Excluindo...'
                            : 'Excluir'}
                    </Button>

                </div>

            </div>

        </div>
    )
}

export default ConfirmDeleteModal