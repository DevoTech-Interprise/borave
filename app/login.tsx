import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { authAPI } from '@/services/api';
import { LoginCredentials } from '@/types/auth';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { useToast } from '@/hooks/useToast';

export default function Login() {
  const router = useRouter();
  const { styles } = useThemeStyles();
  const { showSuccess, showError, showInfo } = useToast();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      showError('Por favor, preencha todos os campos', 'Campos obrigatórios');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login(credentials);
      
      if (response.success) {
        showSuccess(response.message, 'Login realizado!');
        // Navega para as tabs após login bem-sucedido
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 1500); // Pequeno delay para mostrar o toast
      } else {
        showError(response.message, 'Erro no login');
      }
    } catch (error) {
      showError('Ocorreu um erro durante o login', 'Erro');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = (type: 'user' | 'admin') => {
    if (type === 'user') {
      setCredentials({
        email: 'usuario@exemplo.com',
        password: '123456'
      });
      showInfo('Credenciais de usuário preenchidas', 'Teste');
    } else {
      setCredentials({
        email: 'admin@exemplo.com',
        password: '123456'
      });
      showInfo('Credenciais de administrador preenchidas', 'Teste');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>
          
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor={styles.input.color + '80'}
            value={credentials.email}
            onChangeText={(text) => setCredentials({ ...credentials, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={styles.input.color + '80'}
            value={credentials.password}
            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
            secureTextEntry
            editable={!loading}
          />
          
          <TouchableOpacity 
            style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonTextPrimary}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.separator} />
          
          <Text style={[styles.label, { textAlign: 'center' }]}>Credenciais de teste:</Text>
          
          <TouchableOpacity 
            style={styles.buttonSecondary}
            onPress={() => fillTestCredentials('user')}
            disabled={loading}
          >
            <Text style={styles.buttonTextSecondary}>Usuário Teste</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.buttonSecondary}
            onPress={() => fillTestCredentials('admin')}
            disabled={loading}
          >
            <Text style={styles.buttonTextSecondary}>Administrador</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.buttonSecondary, { marginTop: 20 }]}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.buttonTextSecondary}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}