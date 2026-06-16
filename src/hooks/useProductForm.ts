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
}

export function useProductForm({
                                   onSubmit,
                               }: UseProductFormProps) {

    const [values, setValues] =
        useState<ProductFormValues>(
            INITIAL_VALUES,
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

    function resetImage() {

        setValues((prev) => ({
            ...prev,
            imagem: '',
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

        resetImage()
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