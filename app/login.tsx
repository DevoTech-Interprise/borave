import { useToast } from '@/hooks/useToast';
import { authAPI } from '@/services/api';
import { spacing, typography, useButtonStyles, useColors, useInputStyles, useLayoutStyles } from '@/styles';
import { LoginCredentials } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Login() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const layout = useLayoutStyles();
  const input = useInputStyles();
  const buttons = useButtonStyles();
  const colors = useColors();
  
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
    <View style={[layout.container, { backgroundColor: colors.primary }]}>
      <ImageBackground
        source={require('@/assets/images/bg-borave.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Image 
              source={require('@/assets/images/logo.png')} 
              style={{ width: 160, height: 93, marginBottom: 40 }}
              resizeMode="contain"
            />

            <View style={styles.formContainer}>
              <Text style={[typography.h3, { color: colors.white, textAlign: 'center' }, spacing.mb6]}>
                Login
              </Text>

              <View style={input.container}>
                <TextInput
                  style={[input.input, styles.whiteInput]}
                  placeholder="Email"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={credentials.email}
                  onChangeText={(text) => setCredentials({ ...credentials, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              <View style={input.container}>
                <TextInput
                  style={[input.input, styles.whiteInput]}
                  placeholder="Senha"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={credentials.password}
                  onChangeText={(text) => setCredentials({ ...credentials, password: text })}
                  secureTextEntry
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                style={[styles.whiteButton, loading && { opacity: 0.6 }, spacing.mt4]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <Text style={[buttons.primaryText, { color: colors.primary }]}>Entrar</Text>
                )}
              </TouchableOpacity>

              <View style={[layout.rowCenter, spacing.mt4]}>
                <Text style={[typography.bodySmall, { color: colors.white }]}>
                  Não tem conta?{' '}
                </Text>
                <Link href="/register" asChild>
                  <TouchableOpacity disabled={loading}>
                    <Text style={[typography.bodySmall, typography.bold, { color: colors.white }]}>
                      Cadastre-se
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>

              <TouchableOpacity
                style={[spacing.mt5]}
                onPress={() => router.back()}
                disabled={loading}
              >
                <Text style={[typography.bodySmall, { color: colors.white, textAlign: 'center' }]}>
                  Voltar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
  },
  whiteInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    color: '#FFFFFF',
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});