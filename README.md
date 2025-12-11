# E-Commerce Frontend

This project is the frontend for the E-Commerce Lab, a microservices architecture study. It has been migrated from Vite/React to **Next.js** to support Server-Side Rendering (SSR) and Datadog APM.

## Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query (TanStack Query) + Context API
- **Infrastructure**: Docker + Kubernetes (EKS)

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── globals.css   # Global styles
│   ├── layout.tsx    # Root layout with providers
│   └── page.tsx      # Home page
├── components/       # React components
├── config/           # Configuration files
├── context/          # React Context providers
├── hooks/            # Custom React hooks
└── lib/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <YOUR_GIT_URL>
   cd e-commerce-frontend
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_CATALOG_SERVICE_URL=http://localhost:3001
NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:3002
```

### Build Image

```bash
docker build -t e-commerce-frontend .
```

### Run Container

```bash
docker run -p 3000:3000 e-commerce-frontend
```
