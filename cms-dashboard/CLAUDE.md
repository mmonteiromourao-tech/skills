@AGENTS.md

# CMS Dashboard — Guia de Desenvolvimento

## Stack Utilizada

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Next.js | 16.x | Framework React com App Router |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | 4.x | Estilização utility-first |
| shadcn/ui | latest | Componentes de UI (Radix UI + Tailwind) |
| lucide-react | latest | Ícones SVG |

## Estrutura de Pastas

```
cms-dashboard/
├── app/
│   ├── layout.tsx              # Root layout — aplica dark mode e fontes globais
│   ├── page.tsx                # Redireciona / → /instagram
│   ├── globals.css             # Variáveis CSS de tema escuro + reset global
│   └── (dashboard)/            # Route group — compartilha o layout com sidebar
│       ├── layout.tsx          # Dashboard layout: sidebar + main content
│       ├── instagram/page.tsx  # Gestor de Instagram
│       ├── analytics/page.tsx  # Analytics
│       ├── calendario/page.tsx # Calendário de Conteúdo
│       ├── concorrentes/page.tsx # Rastreador de Concorrentes
│       └── noticias/page.tsx   # Consolidador de Notícias
├── components/
│   ├── sidebar.tsx             # Navegação lateral compartilhada (Client Component)
│   └── ui/                     # Componentes shadcn/ui (gerados automaticamente)
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── scroll-area.tsx
│       └── separator.tsx
└── lib/
    └── utils.ts                # Utilitário cn() para merge de classes Tailwind
```

## Padrões de Componentes

### Páginas
Cada página segue o padrão:
```tsx
export default function NomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header com ícone, título, subtítulo e badge "Em desenvolvimento" */}
      {/* Grid de métricas (Card) */}
      {/* Seções placeholder */}
    </div>
  );
}
```

### Server vs Client Components
- **Server Components** (padrão): todas as páginas em `app/`
- **Client Components** (`"use client"`): apenas componentes com interatividade — ex: `sidebar.tsx` usa `usePathname()` para highlight de rota ativa

### Tema Escuro
O tema escuro é aplicado em camadas:
1. `app/layout.tsx`: `<html className="... dark">` — ativa a classe `dark` do Tailwind
2. `app/globals.css`: variáveis CSS de tema escuro definidas em `:root` (sem media query)
3. `html { color-scheme: dark }` — instrui o browser a renderizar elementos nativos no tema escuro

### Paleta de Cores
- Background: `zinc-950` / `zinc-900` (cards)
- Bordas: `zinc-800`
- Texto primário: `zinc-100`
- Texto secundário: `zinc-400` / `zinc-500`
- Destaque/Ativo: `indigo-400` / `indigo-500`
- Sucesso/Crescimento: `emerald-400`
- Alerta: `amber-400`
- Erro: `red-400`

### Sidebar
- Largura fixa: `w-60` (240px)
- Highlight de rota ativa via `usePathname()` com match por prefixo `pathname.startsWith(href)`
- Indicador visual: dot `indigo-400` + fundo `indigo-500/15`

## Decisões Importantes

### Route Groups `(dashboard)`
Usado para agrupar rotas que compartilham o mesmo layout (com sidebar) sem afetar a URL. A pasta `(dashboard)` não aparece no path das rotas.

### Tailwind CSS v4
Esta versão usa `@import "tailwindcss"` em vez de `@tailwind base/components/utilities`. Não há `tailwind.config.ts` — a configuração de tema é feita via variáveis CSS em `globals.css` com o bloco `@theme inline {}`.

### Componentes shadcn/ui
Os componentes são copiados para `components/ui/` e podem ser modificados livremente. Não são importados de um pacote npm externo.

### Ícone do Instagram
`lucide-react` não possui um ícone `Instagram`. Foi usado `Camera` como substituto visual adequado para o contexto.
