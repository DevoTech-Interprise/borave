import { useThemeStyles } from '@/hooks/useThemeStyles';
import { useToast } from '@/hooks/useToast';
import { authAPI } from '@/services/api';
import { LoginCredentials } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login() {
  const router = useRouter();
  const { styles } = useThemeStyles();
  const { showSuccess, showError } = useToast();
  
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
        // Armazena token e user para sessão
        try {
          if (response.token) await AsyncStorage.setItem('authToken', response.token);
          if (response.user) await AsyncStorage.setItem('user', JSON.stringify(response.user));
        } catch (e) {
          console.error('AsyncStorage error on login:', e);
        }

        showSuccess(response.message, 'Login realizado!');
        // Navega para as tabs após login bem-sucedido (imediato)
        router.replace('/(tabs)');
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

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Boravê</Text>
          <Text style={[styles.subtitle, { marginBottom: 20 }]}>Login</Text>
          
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