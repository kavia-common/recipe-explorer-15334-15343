export type ID = string | number;

export interface Recipe {
  id?: ID;
  title: string;
  description?: string;
  image?: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export interface RecipeInput {
  title: string;
  description?: string;
  image?: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

export interface User {
  id: ID;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
