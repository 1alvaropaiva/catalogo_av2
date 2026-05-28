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
                ? <LightModeIcon fontSize="small"/>
                : <DarkModeIcon fontSize="small"/>}
        </Button>
    )
}

export default ThemeToggle

