import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProdutoById } from '../api/produtos.ts'
import ErrorMessage from '../states/ErrorMessage.tsx'
import Loading from '../states/Loading.tsx'
import ProductDetail from '../components/product/ProductDetail.tsx'
import type { Product } from '../types/product.ts'

function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
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
