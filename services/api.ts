import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, LoginCredentials, LoginResponse, ProfileResponse, RegisterCredentials } from '../types/auth';

const API_BASE_URL = 'https://backend-developer-sigma.vercel.app/api';

// Função auxiliar para fazer requisições
const apiCall = async <T,>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  token?: string
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    // backend returns errors in the shape: { error: "Credenciais inválidas" }
    const errorData = await response.json().catch(() => ({}));
    const errMsg = (errorData && (errorData.error || errorData.message)) || `HTTP ${response.status}`;
    throw new Error(errMsg);
  }

  // successful response
  return response.json();
};

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiCall<LoginResponse>(
        '/auth/login',
        'POST',
        credentials
      );

      return {
        success: true,
        message: response.message,
        user: response.user,
        token: response.token,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao fazer login',
      };
    }
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiCall<LoginResponse>(
        '/auth/register',
        'POST',
        credentials
      );

      return {
        success: true,
        message: response.message,
        user: response.user,
        token: response.token,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao registrar',
      };
    }
  },

  getProfile: async (token: string): Promise<AuthResponse> => {
    try {
      const response = await apiCall<ProfileResponse>(
        '/auth/profile',
        'GET',
        undefined,
        token
      );

      return {
        success: true,
        message: 'Perfil obtido com sucesso',
        user: response.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao obter perfil',
      };
    }
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      // limpa credenciais locais
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    } catch (e) {
      console.error('Error clearing AsyncStorage on logout:', e);
    }

    return {
      success: true,
      message: 'Logout realizado com sucesso',
    };
  },
};

export const usersAPI = {
  getUser: async (userId: number, token: string): Promise<AuthResponse> => {
    try {
      const response = await apiCall<ProfileResponse>(
        `/users/${userId}`,
        'GET',
        undefined,
        token
      );

      return {
        success: true,
        message: 'Usuário obtido com sucesso',
        user: response.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao obter usuário',
      };
    }
  },

  updateUser: async (userId: number, data: Partial<{ name: string; email: string }>, token: string): Promise<AuthResponse> => {
    try {
      const response = await apiCall<ProfileResponse>(
        `/users/${userId}`,
        'PUT',
        data,
        token
      );

      return {
        success: true,
        message: 'Usuário atualizado com sucesso',
        user: response.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao atualizar usuário',
      };
    }
  },
};