/**
 * Arquivo: EditProductModal.tsx
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
import Button from '../../ui/Button.tsx'
import ProductForm from '../ProductForm.tsx'

import type {
    Product,
    ProductPayload,
} from '../../../types/product.ts'

interface Props {
    product: Product
    isSaving: boolean
    onClose: () => void
    onSave: (
        payload: ProductPayload,
    ) => Promise<void>
}

function EditProductModal({
                              product,
                              isSaving,
                              onClose,
                              onSave,
                          }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="surface-card w-[92vw] max-w-md max-h-[85vh] overflow-y-auto sm:p-5 p-4">
                <h2 className="text-xl font-bold">
                    Editar produto
                </h2>

                <ProductForm
                    onSubmit={onSave}
                    isSubmitting={isSaving}
                    formId="product-edit-form"
                    showSubmitButton={false}
                    initialValues={{
                        nome: product.nome,
                        preco: String(product.preco),
                        descricao: product.descricao,
                        imagem: product.imagem ?? '',
                        categoria: product.categoria,
                    }}
                />

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        className="btn-secondary"
                        onClick={onClose}
                        disabled={isSaving}
                    >
                        Cancelar
                    </Button>

                    <Button
                        className="btn-primary"
                        type="submit"
                        form="product-edit-form"
                        disabled={isSaving}
                    >
                        {isSaving ? 'Salvando...' : 'Salvar'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditProductModal