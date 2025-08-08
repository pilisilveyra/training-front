# Training Front

A React TypeScript application built with Vite, featuring a modern UI using Mantine components and client-side routing with React Router.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn**

You can check your Node.js version by running:
```bash
node --version
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd training-front
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Start Development Server

```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

### 4. Build for Production

```bash
npm run build
```

Or using yarn:
```bash
yarn build
```

### 5. Preview Production Build

```bash
npm run preview
```

Or using yarn:
```bash
yarn preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BookCard.tsx
│   ├── BookForm.tsx
│   └── DeleteDialog.tsx
├── pages/              # Page components
│   ├── AddBook.tsx
│   ├── BookDetail.tsx
│   └── BooksList.tsx
├── routes/             # Routing configuration
│   ├── index.tsx
│   └── paths.ts
├── lib/                # Utility libraries
│   ├── axios.ts
│   └── types.ts
├── assets/             # Static assets
└── App.tsx             # Main application component
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mantine** - UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **ESLint** - Code linting

## Development

The project uses:
- **TypeScript** for type safety
- **ESLint** for code quality
- **Vite** for fast development and building
- **Mantine** for consistent UI components

## Troubleshooting

If you encounter any issues:

1. **Node version**: Ensure you're using Node.js 18 or higher
2. **Dependencies**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
3. **Port conflicts**: If port 5173 is occupied, Vite will automatically use the next available port
4. **TypeScript errors**: Run `npm run build` to check for TypeScript compilation errors
