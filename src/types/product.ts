/**
 * Modelo principal de produto usado por toda a aplicação.
 * Representa como os dados devem estar no front-end após normalização.
 */
export interface Product {
  id: string
  nome: string
  preco: number
  descricao: string
  imagem?: string
  categoria: string
  createdAt?: string
}

/**
 * Estrutura enviada pelos formulários de criação/edição.
 * Remove campos controlados pela API (`id` e `createdAt`).
 */
export type ProductFormData = Omit<Product, 'id' | 'createdAt'>
