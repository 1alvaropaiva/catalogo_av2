/**
 * produtos.ts
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
 */
import axios from 'axios'
import type {Product, ProductPayload} from '../types/product'

const RESOURCE = import.meta.env.VITE_RESOURCE

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10_000,
})

type ApiProduct = Partial<Product> & {
  id?: string | number
  preco?: number | string
}

type GetProdutosParams = {
  nome?: string
  categoria?: string
}

const parsePrice = (value: number | string | undefined): number => {
  const numericValue = Number(value)

  return Number.isFinite(numericValue) && numericValue > 0
      ? numericValue
      : 0
}

const normalizeProduct = (product: ApiProduct): Product => ({
  id: String(product.id ?? ''),
  nome: product.nome?.trim() ?? 'Produto sem nome',
  preco: parsePrice(product.preco),
  descricao: product.descricao?.trim() ?? 'Sem descrição cadastrada.',
  imagem: product.imagem?.trim() ?? '',
  categoria: product.categoria?.trim() ?? 'Sem categoria',
  createdAt: product.createdAt,
})

const toApiPayload = (
    product: ProductPayload,
): ProductPayload => ({
  ...product,
  nome: product.nome.trim(),
  descricao: product.descricao.trim(),
  imagem: product.imagem?.trim(),
  categoria: product.categoria.trim(),
})

export const getProdutos = async (
    params?: GetProdutosParams,
): Promise<Product[]> => {
  const { data } = await api.get<ApiProduct[]>(RESOURCE)

  const normalizedProducts = data.map(normalizeProduct)

  if (!params) {
    return normalizedProducts
  }

  const normalizedSearch = params.nome?.trim().toLowerCase() ?? ''
  const normalizedCategory = params.categoria?.trim() ?? ''

  return normalizedProducts.filter((product) => {
    const matchesName = normalizedSearch
        ? product.nome.toLowerCase().includes(normalizedSearch)
        : true

    const matchesCategory = normalizedCategory
        ? product.categoria === normalizedCategory
        : true

    return matchesName && matchesCategory
  })
}

export const getCategorias = async (): Promise<string[]> => {
  const products = await getProdutos()

  return [...new Set(products.map((product) => product.categoria))]
      .filter((category) => category.length > 0)
      .sort((a, b) => a.localeCompare(b))
}

export const getProdutoById = async (id: string): Promise<Product> => {
  const { data } = await api.get<ApiProduct>(`${RESOURCE}/${id}`)

  return normalizeProduct(data)
}

export const criarProduto = async (
    product: ProductPayload,
): Promise<Product> => {
  const payload = toApiPayload(product)

  const { data } = await api.post<ApiProduct>(RESOURCE, payload)

  return normalizeProduct(data)
}

export const atualizarProduto = async (
    id: string,
    product: ProductPayload,
): Promise<Product> => {
  const payload = toApiPayload(product)

  const { data } = await api.put<ApiProduct>(
      `${RESOURCE}/${id}`,
      payload,
  )

  return normalizeProduct(data)
}

export const deletarProduto = async (id: string): Promise<void> => {
  await api.delete(`${RESOURCE}/${id}`)
}

export default api