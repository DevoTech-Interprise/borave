import { LoginCredentials, AuthResponse, User } from '../types/auth';

// Dados mockados
const mockUsers: User[] = [
  {
    id: '1',
    email: 'usuario@exemplo.com',
    name: 'Usuário Teste'
  },
  {
    id: '2',
    email: 'admin@exemplo.com',
    name: 'Administrador'
  }
];

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(1000); // Simula tempo de resposta da API

    // Validação básica
    if (!credentials.email || !credentials.password) {
      return {
        success: false,
        message: 'Email e senha são obrigatórios'
      };
    }

    // Verifica se o usuário existe
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      return {
        success: false,
        message: 'Usuário não encontrado'
      };
    }

    // Senha mockada - em app real isso viria do backend
    if (credentials.password !== '123456') {
      return {
        success: false,
        message: 'Senha incorreta'
      };
    }

    // Login bem-sucedido
    return {
      success: true,
      message: 'Login realizado com sucesso',
      user: user,
      token: 'mock-jwt-token-' + user.id
    };
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    await delay(500);
    return {
      success: true,
      message: 'Logout realizado com sucesso'
    };
  }
};