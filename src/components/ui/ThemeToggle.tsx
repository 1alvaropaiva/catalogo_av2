/**
 * Arquivo: ThemeToggle.tsx
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
import {useEffect, useState} from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Button from "./Button.tsx";

const THEME_STORAGE_KEY = 'theme'
type Theme = 'light' | 'dark'

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') {
        return 'light'
    }
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => getInitialTheme())
    useEffect(() => {
        const rootElement = document.documentElement
        rootElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    useEffect(() => {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    }, [theme])

    const handleToggleTheme = (): void => {
        setTheme((previousTheme) => (previousTheme === 'dark' ? 'light' : 'dark'))
    }

    return (
        <Button
            type="button"
            onClick={handleToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="inline-flex h-9 w-9 hover:cursor-pointer items-center justify-center rounded-full bg-[color:var(--color-surface)] text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-hover)]"
        >
            {theme === 'dark'
                ? <DarkModeIcon fontSize="small"/>
                : <LightModeIcon fontSize="small"/>}
        </Button>
    )
}

export default ThemeToggle

