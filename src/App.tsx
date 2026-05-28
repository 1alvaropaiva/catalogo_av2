import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home.tsx'
import NewProduct from './pages/NewProduct.tsx'
import ProductPage from './pages/ProductPage.tsx'

// Componente raiz de páginas: define layout global e tabela de rotas da aplicação.
function App() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] transition-colors duration-300">
      <Header />
      <main className="page-container py-8 sm:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/novo" element={<NewProduct />} />
          <Route
            path="*"
            element={
              <section className="surface-card text-center">
                <h1 className="text-2xl font-bold text-[color:var(--color-text)]">Página não encontrada</h1>
                <p className="mt-2 text-[color:var(--color-text-muted)]">
                  A rota acessada não existe. Utilize o menu para voltar à navegação.
                </p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
