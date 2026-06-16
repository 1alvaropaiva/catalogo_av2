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
            'Informe um preço válido.'
    }

    if (
        values.descricao
            .trim()
            .length < 10
    ) {
        errors.descricao =
            'A descrição deve ter ao menos 10 caracteres.'
    }

    if (
        !values.imagem.trim()
    ) {

        errors.imagem =
            'Informe uma imagem.'

    } else if (
        !isValidImage(
            values.imagem,
        )
    ) {

        errors.imagem =
            'Informe uma URL válida ou envie uma imagem.'

    }

    if (
        !values.categoria.trim()
    ) {
        errors.categoria =
            'Informe uma categoria.'
    }

    return errors
}