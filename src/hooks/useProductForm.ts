/**
 * Arquivo: useProductForm.ts
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
import { useState } from 'react'
import { mapFormToPayload } from '../utils/product.mapper.ts'
import { validateProduct } from '../validators/product.validator.ts'
import { imageFileToBase64 } from '../utils/image.mapper.ts'

import type {
    ProductFormErrors,
    ProductFormValues,
    ProductPayload,
} from '../types/product.ts'

const INITIAL_VALUES: ProductFormValues = {
    nome: '',
    preco: '',
    descricao: '',
    imagem: '',
    categoria: '',
}

interface UseProductFormProps {
    onSubmit: (
        data: ProductPayload,
    ) => Promise<void>

    initialValues?: Partial<ProductFormValues>
}

export function useProductForm({
                                   onSubmit,
                                   initialValues,
                               }: UseProductFormProps) {

    const [values, setValues] =
        useState<ProductFormValues>(
            {
                ...INITIAL_VALUES,
                ...initialValues,
            },
        )

    const [errors, setErrors] =
        useState<ProductFormErrors>(
            {},
        )

    const [imageMode, setImageMode] =
        useState<'url' | 'upload'>(
            'url',
        )

    function handleFieldChange(
        event:
        React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >,
    ) {

        const {
            name,
            value,
        } = event.target

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }))

        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }))
    }

    async function handleImageChange(
        event:
        React.ChangeEvent<
            HTMLInputElement
        >,
    ) {

        const file =
            event.target.files?.[0]

        if (!file) {
            return
        }

        const image =
            await imageFileToBase64(
                file,
            )

        setValues((prev) => ({
            ...prev,
            imagem: image,
        }))

        setErrors((prev) => ({
            ...prev,
            imagem: undefined,
        }))
    }

    function changeImageMode(
        mode:
            'url' |
            'upload',
    ) {

        setImageMode(
            mode,
        )

        setErrors((prev) => ({
            ...prev,
            imagem: undefined,
        }))
    }

    async function handleSubmit(
        event:
        React.FormEvent,
    ) {

        event.preventDefault()

        const validation =
            validateProduct(
                values,
            )

        setErrors(
            validation,
        )

        if (
            Object.keys(
                validation,
            ).length
        ) {
            return
        }

        await onSubmit(
            mapFormToPayload(
                values,
            ),
        )
    }

    return {
        values,
        errors,
        imageMode,

        handleSubmit,
        handleFieldChange,
        handleImageChange,
        changeImageMode,
    }
}