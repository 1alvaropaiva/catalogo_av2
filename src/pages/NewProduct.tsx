import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarProduto } from '../api/produtos.ts'
import ErrorMessage from '../components/ErrorMessage.tsx'
import ProductForm from '../components/ProductForm.tsx'
import type { ProductFormData } from '../types/product.ts'

// Página de cadastro: recebe dados do formulário e cria um novo produto na API.
function NewProduct() {
  // Navegação programática para redirecionar após sucesso.
  const navigate = useNavigate()
  // Estado de envio para bloquear botão e evitar múltiplos envios.
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Mensagem positiva após criação bem-sucedida.
  const [feedback, setFeedback] = useState<string | null>(null)
  // Mensagem de erro para falhas de cadastro.
  const [error, setError] = useState<string | null>(null)

  // Fluxo de criação do produto, incluindo feedback e redirecionamento.
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
      </section>

      {feedback && (
        <div className="surface-card border border-[color:var(--color-border)] bg-[color:var(--color-input-focus)] text-sm font-medium text-[color:var(--color-primary)]">
          {feedback}
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      <ProductForm onSubmit={handleCreateProduct} isSubmitting={isSubmitting} />
    </div>
  )
}

export default NewProduct
