Você irá implementar um sistema completo de dark/light mode no meu projeto React + TypeScript + TailwindCSS seguindo EXATAMENTE a arquitetura abaixo.

IMPORTANTE:

NÃO remover comentários existentes do projeto.
Pode adicionar comentários novos se necessário.
NÃO alterar a estrutura geral do projeto.
NÃO criar overengineering.
NÃO usar Context API agora.
NÃO usar bibliotecas de tema.
Utilizar apenas o que já existe no projeto.
Reaproveitar as variáveis CSS já definidas no index.css.
Garantir que o tema fique consistente em TODO o projeto.
Não deixar componentes usando cores hardcoded (bg-white, text-black, etc.) quando deveriam usar as variáveis do tema.
Manter o código limpo, organizado e comentado.
Seguir a arquitetura atual do projeto.

Implementar:

dark mode
light mode
persistência no localStorage
toggle de tema no Header
troca dinâmica do tema adicionando/removendo a classe dark no <html>
ícone de dark/light usando Material UI Icons

Ícones que DEVEM ser usados:

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

O componente ThemeToggle.tsx será responsável por:

controlar tema
salvar no localStorage
ler preferência salva
aplicar/remover classe dark
renderizar ícone correto

O Header.tsx deve:

apenas renderizar o ThemeToggle
NÃO conter lógica de tema

Já existe:

src/components/ThemeToggle.tsx (vazio)
src/components/Header.tsx
src/index.css

IMPLEMENTAR ThemeToggle.tsx

Requisitos:

usar useEffect
usar useState
tema deve ser:
'light'
'dark'

Fluxo:

ao carregar:
verificar localStorage.getItem('theme')
se existir:
aplicar tema salvo
senão:
usar preferência do sistema (prefers-color-scheme)
atualizar <html class="dark">
salvar no localStorage toda vez que trocar
evitar flicker visual de tema

IMPORTANTE SOBRE O INDEX.CSS:

NÃO remover comentários existentes
NÃO quebrar a estrutura atual
Aproveitar TODAS as variáveis CSS já criadas
Garantir compatibilidade total entre dark/light mode
Se necessário, adicionar comentários extras explicando novas partes
Revisar o restante do projeto para substituir cores hardcoded por:
var(--color-bg)
var(--color-surface)
var(--color-text)
var(--color-primary)
etc.

OBJETIVO:

Todo o projeto deve respeitar automaticamente o tema atual usando as variáveis do index.css.

O toggle deve ficar ao lado do logo/texto “Catálogo FAETERJ”.

ESTRUTURA ESPERADA:

src/
components/
Header.tsx
ThemeToggle.tsx

REGRAS IMPORTANTES:

ThemeToggle deve ser reutilizável
Header apenas renderiza
Não usar Context API
Não usar Redux
Não usar Zustand
Não usar ThemeProvider
Não criar hooks separados ainda
Não criar arquivos desnecessários
Não modificar a arquitetura do projeto sem necessidade

ESTILO VISUAL DO TOGGLE:

pequeno
moderno
minimalista
consistente com as cores lilás/rosa já existentes
hover suave
animação leve
utilizar as classes e variáveis do projeto
botão deve funcionar bem em dark/light

IMPLEMENTAR TUDO DIRETAMENTE NOS ARQUIVOS NECESSÁRIOS.

Ao finalizar:

revisar possíveis cores inconsistentes
revisar inputs/cards/botões
revisar superfícies claras/escuras
revisar hover states
garantir que o dark mode fique agradável visualmente
garantir que o light mode continue clean e elegante
garantir boa legibilidade de texto nos dois temas