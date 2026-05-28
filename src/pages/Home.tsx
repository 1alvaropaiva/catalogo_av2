import { useEffect, useMemo, useState } from 'react'
import { getProdutos } from '../api/produtos.ts'
import ProductList from '../components/ProductList.tsx'
import SearchBar from '../components/ui/SearchBar.tsx'
import type { Product } from '../types/product.ts'

// Página inicial do catálogo: busca produtos, aplica filtros e renderiza listagem.
function Home() {
  // Estado bruto retornado pela API.
  const [products, setProducts] = useState<Product[]>([])
  // Controle de carregamento geral da tela.
  const [isLoading, setIsLoading] = useState(true)
  // Mensagem de erro para falhas de carregamento.
  const [error, setError] = useState<string | null>(null)
  // Termo digitado no filtro de nome.
  const [searchTerm, setSearchTerm] = useState('')
  // Categoria selecionada no filtro.
  const [selectedCategory, setSelectedCategory] = useState('')

  // Tenta buscar novamente os produtos após erro.
  const handleRetry = async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getProdutos()
      setProducts(data)
    } catch {
      setError('Não foi possível carregar os produtos. Verifique a conexão e tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Carregamento inicial dos produtos na montagem do componente.
  useEffect(() => {
    // Flag defensiva para evitar setState após desmontagem.
    let isActive = true

    const loadInitialProducts = async (): Promise<void> => {
      try {
        const data = await getProdutos()

        if (isActive) {
          setProducts(data)
          setError(null)
        }
      } catch {
        if (isActive) {
          setError('Não foi possível carregar os produtos. Verifique a conexão e tente novamente.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadInitialProducts()

    return () => {
      isActive = false
    }
  }, [])

  // Gera lista única e ordenada de categorias baseada nos produtos carregados.
  const categories = useMemo(
    () =>
      [...new Set(products.map((product) => product.categoria))]
        .filter((category) => category.length > 0)
        .sort((a, b) => a.localeCompare(b)),
    [products],
  )

  // Aplica os filtros de categoria e termo de busca para exibição na lista.
  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = selectedCategory ? product.categoria === selectedCategory : true
      const matchesName = normalizedSearchTerm
        ? product.nome.toLowerCase().includes(normalizedSearchTerm)
        : true

      return matchesCategory && matchesName
    })
  }, [products, searchTerm, selectedCategory])

  return (
    <div className="space-y-6">
      <section className="surface-card">
        <h1 className="text-2xl font-bold text-[color:var(--color-text)] sm:text-3xl">Catálogo de Produtos</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-muted)] sm:text-base">
          Explore os itens disponíveis, filtre por categoria e encontre produtos pelo nome.
        </p>
      </section>

      <SearchBar
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchTermChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[color:var(--color-text-muted)]">
          {isLoading
            ? 'Carregando produtos...'
            : `${filteredProducts.length} produto(s) exibido(s) de ${products.length}.`}
        </p>
      </div>

      <ProductList
        products={filteredProducts}
        isLoading={isLoading}
        error={error}
        onRetry={() => void handleRetry()}
      />
    </div>
  )
}

export default Home
