export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
  userType: 'user' | 'establishment';
  location?: string;
  created_at: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  userType: 'user' | 'establishment';
  location?: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface ProfileResponse {
  user: User;
}

export interface Establishment {
  id: number;
  name: string;
  location: string;
  description?: string;
  image?: string;
  rating?: number;
  ownerId: number;
  createdAt: string;
}export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}