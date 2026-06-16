import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarProduto } from '../api/produtos.ts'
import ErrorMessage from '../states/ErrorMessage.tsx'
import ProductForm from '../components/product/ProductForm.tsx'
import type { ProductFormData } from '../types/product.ts'

function NewProduct() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCreateProduct = async (formData: ProductFormData): Promise<void> => {
    setIsSubmitting(true)
    setFeedback(null)
    setError(null)

    try {
      const createdProduct = await criarProduto(formData)
      setFeedback(`Produto "${createdProduct.nome}" cadastrado com sucesso! Redirecionando...`)

      window.setTimeout(() => {
        navigate(`/produto/${createdProduct.id}`)
      }, 1200)
    } catch {
      setError('Não foi possível cadastrar o produto. Tente novamente em instantes.')
      throw new Error('Falha ao cadastrar produto')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <section className="surface-card">
        <h1 className="text-2xl font-bold text-[color:var(--color-text)] sm:text-3xl">
          Cadastrar novo produto
        </h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-muted)] sm:text-base">
          Preencha os campos abaixo para adicionar um novo item ao catálogo.
        </p>

        {feedback && (
            <div className="surface-card border border-[color:var(--color-border)] bg-[color:var(--color-input-focus)] text-sm font-medium text-[color:var(--color-primary)]">
              {feedback}
            </div>
        )}

        {error && <ErrorMessage message={error} />}

        <ProductForm onSubmit={handleCreateProduct} isSubmitting={isSubmitting} />
      </section>


    </div>
  )
}

export default NewProduct
