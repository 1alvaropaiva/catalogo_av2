import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProdutoById } from '../api/produtos.ts'
import ErrorMessage from '../components/ErrorMessage.tsx'
import Loading from '../components/Loading.tsx'
import ProductDetail from '../components/ProductDetail.tsx'
import type { Product } from '../types/product.ts'

// Página de detalhes: carrega um produto específico com base no `id` da rota.
function ProductPage() {
  // Obtém o `id` da URL (`/produto/:id`).
  const { id } = useParams<{ id: string }>()
  // Função de navegação programática entre rotas.
  const navigate = useNavigate()

  // Produto carregado para exibir detalhes.
  const [product, setProduct] = useState<Product | null>(null)
  // Controle de carregamento da página.
  const [isLoading, setIsLoading] = useState(true)
  // Mensagem de erro em caso de falha na API ou rota inválida.
  const [error, setError] = useState<string | null>(null)

  // Permite tentar novamente o carregamento do produto atual.
  const handleRetry = async (): Promise<void> => {
    if (!id) {
      setError('Produto inválido.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getProdutoById(id)
      setProduct(data)
    } catch {
      setError('Não foi possível carregar os detalhes deste produto.')
    } finally {
      setIsLoading(false)
    }
  }

  // Busca inicial do produto sempre que o `id` da rota mudar.
  useEffect(() => {
    // Evita atualização de estado se o componente for desmontado.
    let isActive = true

    const loadInitialProduct = async (): Promise<void> => {
      if (!id) {
        if (isActive) {
          setError('Produto inválido.')
          setIsLoading(false)
        }

        return
      }

      try {
        const data = await getProdutoById(id)

        if (isActive) {
          setProduct(data)
          setError(null)
        }
      } catch {
        if (isActive) {
          setError('Não foi possível carregar os detalhes deste produto.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadInitialProduct()

    return () => {
      isActive = false
    }
  }, [id])

  if (isLoading) {
    return <Loading message="Carregando detalhes do produto..." />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => void handleRetry()} />
  }

  if (!product) {
    return <ErrorMessage message="Produto não encontrado." onRetry={() => navigate('/')} />
  }

  return <ProductDetail product={product} onBack={() => navigate(-1)} />
}

export default ProductPage
