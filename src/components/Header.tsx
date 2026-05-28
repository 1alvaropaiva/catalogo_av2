import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ui/ThemeToggle.tsx'

// Estilo base compartilhado por todos os links do menu.
const navLinkBase = 'rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[color:var(--color-hover)]'

// Aplica estilo diferenciado quando a rota correspondente está ativa.
const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  `${navLinkBase} ${isActive ? 'bg-[color:var(--color-input-focus)] text-[color:var(--color-primary)]' : 'text-[color:var(--color-text)]'}`

// Cabeçalho global com navegação desktop e menu móvel.
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = (): void => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 backdrop-blur">
      <nav className="page-container flex items-center justify-between py-4" aria-label="Navegação principal">
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className="text-lg font-bold tracking-tight text-[color:var(--color-primary)] transition-colors hover:text-[color:var(--color-primary-hover)]"
            onClick={closeMenu}
          >
            Catálogo FAETERJ
          </NavLink>
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-[color:var(--color-border)] p-2 text-[color:var(--color-text)] transition hover:bg-[color:var(--color-hover)] md:hidden"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Abrir ou fechar menu"
        >
          <span className="text-lg leading-none">☰</span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={getNavLinkClassName} end>
            Produtos
          </NavLink>
          <NavLink to="/novo" className={getNavLinkClassName}>
            Novo Produto
          </NavLink>
        </div>
      </nav>

          <div
              id="mobile-menu"
              className={`overflow-hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 transition-all duration-300 ease-in-out md:hidden ${
                  isMenuOpen
                      ? 'max-h-40 py-3 opacity-100 translate-y-0'
                      : 'max-h-0 py-0 opacity-0 -translate-y-2'
              }`}
          >
          <div className="flex text-center flex-col gap-2">
            <NavLink to="/" className={getNavLinkClassName} onClick={closeMenu} end>
              Produtos
            </NavLink>
            <NavLink to="/novo" className={getNavLinkClassName} onClick={closeMenu}>
              Novo Produto
            </NavLink>
          </div>
        </div>
    </header>
  )
}

export default Header
