import axios from 'axios'
import type { Product, ProductFormData } from '../types/product'

// Endereço base da API remota utilizada pelo catálogo.
const BASE_URL = 'https://69fca88930ad0a6fd1bff61e.mockapi.io/catalogo'
// Recurso específico de produtos dentro da API.
const RESOURCE = '/produtos'

// Instância central do cliente HTTP para concentrar configurações comuns.
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
})

// Tipo de entrada da API: mais flexível para lidar com respostas incompletas/heterogêneas.
type ApiProduct = Partial<Product> & {
  id?: string | number
  preco?: number | string
}

// Converte possíveis formatos de preço para número válido e seguro para o front-end.
const parsePrice = (value: number | string | undefined): number => {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 0
}

// Normaliza dados vindos da API para o formato consistente esperado pela aplicação.
const normalizeProduct = (product: ApiProduct): Product => ({
  id: String(product.id ?? ''),
  nome: product.nome?.trim() ?? 'Produto sem nome',
  preco: parsePrice(product.preco),
  descricao: product.descricao?.trim() ?? 'Sem descrição cadastrada.',
  imagem: product.imagem?.trim() ?? '',
  categoria: product.categoria?.trim() ?? 'Sem categoria',
  createdAt: product.createdAt,
})

// Prepara o payload antes de enviar para a API (limpeza e coerção de tipos).
const toApiPayload = (product: ProductFormData): ProductFormData => ({
  ...product,
  nome: product.nome.trim(),
  descricao: product.descricao.trim(),
  imagem: product.imagem?.trim(),
  categoria: product.categoria.trim(),
  preco: Number(product.preco),
})

// Busca todos os produtos e normaliza cada item para o contrato interno.
export const getProdutos = async (): Promise<Product[]> => {
  const { data } = await api.get<ApiProduct[]>(RESOURCE)
  return data.map(normalizeProduct)
}

// Busca um único produto pelo id e aplica normalização de dados.
export const getProdutoById = async (id: string): Promise<Product> => {
  const { data } = await api.get<ApiProduct>(`${RESOURCE}/${id}`)
  return normalizeProduct(data)
}

// Cria um novo produto na API e retorna o resultado já normalizado.
export const criarProduto = async (product: ProductFormData): Promise<Product> => {
  const payload = toApiPayload(product)
  const { data } = await api.post<ApiProduct>(RESOURCE, payload)
  return normalizeProduct(data)
}

// Atualiza um produto existente na API e devolve a versão persistida.
export const atualizarProduto = async (
  id: string,
  product: ProductFormData,
): Promise<Product> => {
  const payload = toApiPayload(product)
  const { data } = await api.put<ApiProduct>(`${RESOURCE}/${id}`, payload)
  return normalizeProduct(data)
}

// Remove um produto pelo id.
export const deletarProduto = async (id: string): Promise<void> => {
  await api.delete(`${RESOURCE}/${id}`)
}
