import type {
    ProductPayload,
    ProductFormValues,
} from '../types/product'

export function mapFormToPayload(
    values: ProductFormValues,
): ProductPayload {
    return {
        nome: values.nome.trim(),
        preco: Number(values.preco),
        descricao: values.descricao.trim(),
        imagem: values.imagem.trim(),
        categoria: values.categoria.trim(),
    }
}