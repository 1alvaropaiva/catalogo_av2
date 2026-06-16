import { useState } from 'react'
import Button from "../../ui/Button.tsx";
import type {Product, ProductPayload} from "../../../types/product.ts";

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

    const [form, setForm] =
        useState<ProductPayload>({
            nome: product.nome,
            preco: product.preco,
            descricao: product.descricao,
            imagem: product.imagem ?? '',
            categoria: product.categoria,
        })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSave = () => {
        const newErrors: Record<string, string> = {}

        if (!form.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório'
        }
        if (!form.preco || form.preco <= 0) {
            newErrors.preco = 'Preço deve ser maior que 0'
        }
        if (!form.categoria.trim()) {
            newErrors.categoria = 'Categoria é obrigatória'
        }
        if (!form.descricao.trim()) {
            newErrors.descricao = 'Descrição é obrigatória'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        void onSave(form)
    }

    // Formata preço para exibição em Real
    const formatPrice = (value: number) => {
        return value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    // Converte string formatada para número
    const parsePrice = (value: string) => {
        const cleanValue = value.replace(/\D/g, '')
        const number = Number(cleanValue) / 100
        return isNaN(number) ? 0 : number
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="surface-card w-full max-w-lg p-6">

                <h2 className="text-xl font-bold">
                    Editar produto
                </h2>

                <div className="mt-5 space-y-4">

                    {/* Nome */}
                    <div>
                        <label className="field-label" htmlFor="edit-nome">
                            Nome do produto <span className="text-danger">*</span>
                        </label>
                        <input
                            id="edit-nome"
                            className={`field-input ${errors.nome ? 'border-danger' : ''}`}
                            placeholder="Ex: Camiseta Casual"
                            value={form.nome}
                            onChange={(e) => {
                                setForm({...form, nome: e.target.value})
                                if (errors.nome) setErrors({...errors, nome: ''})
                            }}
                        />
                        {errors.nome && <p className="field-error">{errors.nome}</p>}
                    </div>

                    {/* Preço */}
                    <div>
                        <label className="field-label" htmlFor="edit-preco">
                            Preço <span className="text-danger">*</span>
                        </label>
                        <input
                            id="edit-preco"
                            type="text"
                            className={`field-input ${errors.preco ? 'border-danger' : ''}`}
                            placeholder="R$ 0,00"
                            value={formatPrice(form.preco)}
                            onChange={(e) => {
                                const value = e.target.value
                                // Permite apenas números e vírgula
                                if (/^[\d,]*$/.test(value)) {
                                    const number = parsePrice(value)
                                    setForm({...form, preco: number})
                                    if (errors.preco) setErrors({...errors, preco: ''})
                                }
                            }}
                            onBlur={() => {
                                if (form.preco === 0) {
                                    setForm({...form, preco: 0.01})
                                }
                            }}
                        />
                        {errors.preco && <p className="field-error">{errors.preco}</p>}
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="field-label" htmlFor="edit-categoria">
                            Categoria <span className="text-danger">*</span>
                        </label>
                        <input
                            id="edit-categoria"
                            className={`field-input ${errors.categoria ? 'border-danger' : ''}`}
                            placeholder="Ex: Roupas, Eletrônicos, Livros..."
                            value={form.categoria}
                            onChange={(e) => {
                                setForm({...form, categoria: e.target.value})
                                if (errors.categoria) setErrors({...errors, categoria: ''})
                            }}
                        />
                        {errors.categoria && <p className="field-error">{errors.categoria}</p>}
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="field-label" htmlFor="edit-descricao">
                            Descrição <span className="text-danger">*</span>
                        </label>
                        <textarea
                            id="edit-descricao"
                            rows={4}
                            className={`field-textarea ${errors.descricao ? 'border-danger' : ''}`}
                            placeholder="Descreva o produto em detalhes..."
                            value={form.descricao}
                            onChange={(e) => {
                                setForm({...form, descricao: e.target.value})
                                if (errors.descricao) setErrors({...errors, descricao: ''})
                            }}
                        />
                        {errors.descricao && <p className="field-error">{errors.descricao}</p>}
                    </div>

                </div>

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
                        disabled={isSaving}
                        onClick={handleSave}
                    >
                        {isSaving ? 'Salvando...' : 'Salvar'}
                    </Button>

                </div>

            </div>

        </div>
    )
}

export default EditProductModal