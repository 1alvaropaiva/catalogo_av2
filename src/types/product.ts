export interface Product {
  id: string
  nome: string
  preco: number
  descricao: string
  imagem?: string
  categoria: string
  createdAt?: string
}

export type ProductPayload =
    Omit<Product, 'id' | 'createdAt'>

export interface ProductFormValues {
  nome: string
  preco: string
  descricao: string
  imagem: string
  categoria: string
}

export interface ProductFormErrors {
  nome?: string
  preco?: string
  descricao?: string
  imagem?: string
  categoria?: string
}