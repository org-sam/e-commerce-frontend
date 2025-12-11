# E-Commerce Frontend

Este projeto é o frontend para o E-Commerce Lab, um estudo de arquitetura de microsserviços. Ele usa **Next.js** para suportar Renderização no Lado do Servidor (SSR).

## Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Gerenciamento de Estado**: React Query (TanStack Query) + Context API
- **Formulários**: React Hook Form + Zod
- **Visualização de Dados**: Recharts
- **Ícones**: Lucide React
- **Notificações**: Sonner

## Estrutura do Projeto

```
src/
├── app/              # Páginas e layouts do Next.js App Router
│   ├── globals.css   # Estilos globais
│   ├── layout.tsx    # Layout raiz com providers
│   └── page.tsx      # Página inicial
├── components/       # Componentes React
├── config/           # Arquivos de configuração
├── context/          # Providers de Contexto React
├── hooks/            # Hooks React customizados
└── lib/              # Funções utilitárias
```

## Começando

### Pré-requisitos

- Node.js 22+
- npm

### Instalação

1. Clone o repositório:
   ```bash
   git clone <SEU_GIT_URL>
   cd e-commerce-frontend
   ```

2. Instale as dependências:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Variáveis de Ambiente

Crie um arquivo `.env.local` para desenvolvimento local:

```env
NEXT_PUBLIC_CATALOG_SERVICE_URL=http://localhost:3001
NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:3002
```

### Build da Imagem

```bash
docker build -t e-commerce-frontend .
```

### Executar Container

```bash
docker run -p 3000:3000 e-commerce-frontend
```
