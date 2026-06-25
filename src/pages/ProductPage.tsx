/**
 * Arquivo: ProductPage.tsx
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
      setError('Produto invÃ¡lido.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getProdutoById(id)
      setProduct(data)
    } catch {
      setError('NÃ£o foi possÃ­vel carregar os detalhes deste produto.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true

    const loadInitialProduct = async (): Promise<void> => {
      if (!id) {
        if (isActive) {
          setError('Produto invÃ¡lido.')
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
          setError('NÃ£o foi possÃ­vel carregar os detalhes deste produto.')
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
    return <ErrorMessage message="Produto nÃ£o encontrado." onRetry={() => navigate('/')} />
  }

  return <ProductDetail product={product} onBack={() => navigate(-1)} />
}

export default ProductPage
