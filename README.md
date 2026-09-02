# 🧀 Burrata – Empório & Bistrô

Site institucional do restaurante **Burrata – Empório & Bistrô**, construído sobre o template original (antes "Mad Vagão"), preservando toda a arquitetura Next.js 15 + MongoDB e adaptando identidade visual e conteúdo para uma proposta de alta gastronomia italiana.

## Stack
Next.js 15 · React 18 · Tailwind CSS · shadcn/ui · Framer Motion · MongoDB · Axios

## Rodando localmente
```bash
npm install
npm run dev
```
Acesse http://localhost:3000

Configure no `.env`:
```
MONGO_URL=<sua-connection-string-mongodb>
DB_NAME=burrata
ADMIN_PASSWORD=<senha-do-painel-admin>
```

## Painel administrativo
Acesse `/admin` para gerenciar cardápio, galeria e visualizar reservas (CRUD completo, autenticado por senha).

## Estrutura
- `app/page.js` — landing page completa (Hero, cardápio, vinhos & drinks, galeria, avaliações, localização, reservas)
- `app/api/[[...path]]/route.js` — API REST (menu, galeria, reservas, admin) com MongoDB
- `app/admin/page.js` — painel administrativo
- `app/layout.js` — metadata, SEO e schema.org
- `components/ui/*` — componentes shadcn/ui reutilizados do template original
