/**
 * Arquivo: product.validator.ts
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
import type {
    ProductFormErrors,
    ProductFormValues,
} from '../types/product'

const IMAGE_URL_REGEX =
    /^https?:\/\/.+/i

const BASE64_IMAGE_REGEX =
    /^data:image\/.+;base64,/i

function isValidImage(
    value: string,
): boolean {

    const normalized =
        value.trim()

    return (
        IMAGE_URL_REGEX.test(
            normalized,
        ) ||
        BASE64_IMAGE_REGEX.test(
            normalized,
        )
    )
}

export function validateProduct(
    values: ProductFormValues,
): ProductFormErrors {

    const errors:
        ProductFormErrors = {}

    const parsedPrice =
        Number(values.preco)

    if (
        !values.nome.trim()
    ) {
        errors.nome =
            'Informe o nome do produto.'
    }

    if (
        !values.preco ||
        Number.isNaN(parsedPrice) ||
        parsedPrice <= 0
    ) {
        errors.preco =
            'Informe um preÃ§o vÃ¡lido.'
    }

    if (
        values.descricao
            .trim()
            .length < 10
    ) {
        errors.descricao =
            'A descriÃ§Ã£o deve ter ao menos 10 caracteres.'
    }

    if (
        values.imagem.trim() &&
        !isValidImage(
            values.imagem,
        )
    ) {

        errors.imagem =
            'Informe uma URL vÃ¡lida ou envie uma imagem.'

    }

    if (
        !values.categoria.trim()
    ) {
        errors.categoria =
            'Informe uma categoria.'
    }

    return errors
}