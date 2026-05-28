import { useState } from 'react'
import type { ProductFormData } from '../types/product'

/** Valores controlados pelo formulário na UI (preço como string para facilitar digitação). */
interface ProductFormValues {
  nome: string
  preco: string
  descricao: string
  imagem: string
  categoria: string
}

interface ProductFormErrors {
  nome?: string
  preco?: string
  descricao?: string
  imagem?: string
  categoria?: string
}

/** Contrato do componente de formulário. */
interface ProductFormProps {
  /** Callback assíncrono para persistir o produto. */
  onSubmit: (data: ProductFormData) => Promise<void>
  /** Informa se o envio está em andamento para desabilitar ações. */
  isSubmitting: boolean
}

// Estado inicial do formulário ao carregar a página.
const INITIAL_VALUES: ProductFormValues = {
  nome: '',
  preco: '',
  descricao: '',
  imagem: '',
  categoria: '',
}

const IMAGE_URL_REGEX = /^https?:\/\/.+/i

// Formulário de cadastro com validação local antes do envio.
function ProductForm({ onSubmit, isSubmitting }: ProductFormProps) {
  // Estado dos campos do formulário.
  const [values, setValues] = useState<ProductFormValues>(INITIAL_VALUES)
  // Estado dos erros por campo.
  const [errors, setErrors] = useState<ProductFormErrors>({})

  // Atualiza o campo alterado e limpa o erro daquele campo para novo feedback.
  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }))
  }

  // Validação simples de regras obrigatórias e formato mínimo dos dados.
  const validate = (): ProductFormErrors => {
    const nextErrors: ProductFormErrors = {}
    const parsedPrice = Number(values.preco)

    if (!values.nome.trim()) {
      nextErrors.nome = 'Informe o nome do produto.'
    }

    if (!values.preco || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      nextErrors.preco = 'Informe um preço válido maior que zero.'
    }

    if (!values.descricao.trim() || values.descricao.trim().length < 10) {
      nextErrors.descricao = 'A descrição deve ter ao menos 10 caracteres.'
    }

    if (!values.imagem.trim() || !IMAGE_URL_REGEX.test(values.imagem.trim())) {
      nextErrors.imagem = 'Informe uma URL de imagem válida (http/https).'
    }

    if (!values.categoria.trim()) {
      nextErrors.categoria = 'Informe a categoria do produto.'
    }

    return nextErrors
  }

  // Intercepta o submit do navegador, valida e delega envio para o callback pai.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    await onSubmit({
      nome: values.nome.trim(),
      preco: Number(values.preco),
      descricao: values.descricao.trim(),
      imagem: values.imagem.trim(),
      categoria: values.categoria.trim(),
    })
  }

  return (
    <form className="surface-card space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="nome" className="field-label">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          className="field-input"
          placeholder="Ex.: Headset sem fio"
          value={values.nome}
          onChange={handleFieldChange}
        />
        {errors.nome && <p className="field-error">{errors.nome}</p>}
      </div>

      <div>
        <label htmlFor="preco" className="field-label">
          Preço
        </label>
        <input
          id="preco"
          name="preco"
          type="number"
          min="0"
          step="0.01"
          className="field-input"
          placeholder="Ex.: 199.90"
          value={values.preco}
          onChange={handleFieldChange}
        />
        {errors.preco && <p className="field-error">{errors.preco}</p>}
      </div>

      <div>
        <label htmlFor="descricao" className="field-label">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows={4}
          className="field-textarea"
          placeholder="Descreva os principais pontos do produto..."
          value={values.descricao}
          onChange={handleFieldChange}
        />
        {errors.descricao && <p className="field-error">{errors.descricao}</p>}
      </div>

      <div>
        <label htmlFor="imagem" className="field-label">
          Imagem (URL)
        </label>
        <input
          id="imagem"
          name="imagem"
          type="url"
          className="field-input"
          placeholder="https://site.com/imagem.jpg"
          value={values.imagem}
          onChange={handleFieldChange}
        />
        <p className="field-helper">
          Dica: Não tem um link? Transforme sua foto em URL usando o{' '}
          <a
              href="https://pages.edgeone.ai/drop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-hover)] underline transition-colors"
          >
            EdgeOne Drop
          </a>.
        </p>
        {errors.imagem && <p className="field-error">{errors.imagem}</p>}
      </div>

      <div>
        <label htmlFor="categoria" className="field-label">
          Categoria
        </label>
        <input
          id="categoria"
          name="categoria"
          type="text"
          className="field-input"
          placeholder="Ex.: Periféricos"
          value={values.categoria}
          onChange={handleFieldChange}
        />
        {errors.categoria && <p className="field-error">{errors.categoria}</p>}
      </div>

      <button type="submit" className="btn-primary w-full sm:w-fit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando produto...' : 'Cadastrar produto'}
      </button>
    </form>
  )
}

export default ProductForm
