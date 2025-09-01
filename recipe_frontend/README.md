# Recipe Explorer Frontend (Next.js)

A modern, clean, light-themed Next.js app to browse, search, and manage recipes. Uses the following brand colors:
- Primary: #4CAF50
- Secondary: #2196F3
- Accent: #FF9800

Features:
- Browse recipe list/grid
- Search recipes (client-side filter)
- View recipe details
- User authentication (email/password login)
- Recipe management (add, edit, delete) for authenticated users

## Quick Start

1) Install dependencies
   npm install

2) Configure environment
   cp .env.example .env
   # Set NEXT_PUBLIC_API_BASE_URL to your recipe_database API (e.g., http://localhost:8000)

3) Run dev server
   npm run dev
   # Open http://localhost:3000

## Backend API Contract

This app expects a backend (recipe_database) with these endpoints:

- GET /recipes
  Returns: Recipe[]
- GET /recipes/:id
  Returns: Recipe
- POST /recipes
  Body: RecipeInput
  Returns: Recipe
- PUT /recipes/:id
  Body: RecipeInput
  Returns: Recipe
- DELETE /recipes/:id
  Returns: 204

Auth:
- POST /auth/login
  Body: { email, password }
  Returns: { token, user: { id, email } }

Token is sent as Authorization: Bearer <token>.

## Scripts

- npm run dev    Start dev server
- npm run build  Build production bundle
- npm run start  Start production server
- npm run lint   Lint

## Notes

- For simplicity, tokens are stored in localStorage. In production, prefer HTTP-only cookies managed by the backend.
- Images from external URLs are allowed via next.config.ts remote patterns.
