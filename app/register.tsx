import { useToast } from '@/hooks/useToast';
import { authAPI } from '@/services/api';
import { spacing, typography, useButtonStyles, useColors, useInputStyles, useLayoutStyles } from '@/styles';
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

export default function Register() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const layout = useLayoutStyles();
  const input = useInputStyles();
  const buttons = useButtonStyles();
  const colors = useColors();
  
  const [userType, setUserType] = useState<'user' | 'establishment'>('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      showError('Por favor, preencha todos os campos', 'Campos obrigatórios');
      return;
    }

    if (userType === 'establishment' && !formData.location) {
      showError('Localização é obrigatória para estabelecimentos', 'Campo obrigatório');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError('As senhas não coincidem', 'Erro de validação');
      return;
    }

    if (formData.password.length < 6) {
      showError('A senha deve ter no mínimo 6 caracteres', 'Senha fraca');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType,
        location: userType === 'establishment' ? formData.location : undefined,
      });
      
      if (response.success) {
        // Armazena token e user para sessão
        try {
          if (response.token) await AsyncStorage.setItem('authToken', response.token);
          if (response.user) await AsyncStorage.setItem('user', JSON.stringify(response.user));
        } catch (e) {
          console.error('AsyncStorage error on register:', e);
        }

        showSuccess(response.message, 'Cadastro realizado!');
        router.replace('/(tabs)');
      } else {
        showError(response.message, 'Erro no cadastro');
      }
    } catch (error) {
      showError('Ocorreu um erro durante o cadastro', 'Erro');
      console.error('Register error:', error);
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
                Cadastro
              </Text>

              {/* Seleção de Tipo de Usuário */}
              <View style={[layout.row, { gap: 12 }, spacing.mb6]}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    {
                      backgroundColor: userType === 'user' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                      borderColor: colors.white,
                    },
                  ]}
                  onPress={() => setUserType('user')}
                >
                  <Text
                    style={[
                      typography.bodySmall,
                      typography.bold,
                      { color: userType === 'user' ? colors.primary : colors.white },
                    ]}
                  >
                    Usuário
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    {
                      backgroundColor: userType === 'establishment' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                      borderColor: colors.white,
                    },
                  ]}
                  onPress={() => setUserType('establishment')}
                >
                  <Text
                    style={[
                      typography.bodySmall,
                      typography.bold,
                      { color: userType === 'establishment' ? colors.primary : colors.white },
                    ]}
                  >
                    Estabelecimento
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={input.container}>
                <TextInput
                  style={[input.input, styles.whiteInput]}
                  placeholder="Nome completo"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  editable={!loading}
                />
              </View>

              <View style={input.container}>
                <TextInput
                  style={[input.input, styles.whiteInput]}
                  placeholder="Email"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              {userType === 'establishment' && (
                <View style={input.container}>
                  <TextInput
                    style={[input.input, styles.whiteInput]}
                    placeholder="Localização (Cidade, Estado)"
                    placeholderTextColor="rgba(255, 255, 255, 0.6)"
                    value={formData.location}
                    onChangeText={(text) => setFormData({ ...formData, location: text })}
                    editable={!loading}
                  />
                </View>
              )}

              <View style={input.container}>
                <TextInput
                  style={[input.input, styles.whiteInput]}
                  placeholder="Senha"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  secureTextEntry
                  editable={!loading}
                />
              </View>

              <View style={input.container}>
                <TextInput
                  style={[input.input, styles.whiteInput]}
                  placeholder="Confirmar senha"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  secureTextEntry
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                style={[styles.whiteButton, loading && { opacity: 0.6 }, spacing.mt4]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <Text style={[buttons.primaryText, { color: colors.primary }]}>Cadastrar</Text>
                )}
              </TouchableOpacity>

              <View style={[layout.rowCenter, spacing.mt4]}>
                <Text style={[typography.bodySmall, { color: colors.white }]}>
                  Já tem conta?{' '}
                </Text>
                <Link href="/login" asChild>
                  <TouchableOpacity disabled={loading}>
                    <Text style={[typography.bodySmall, typography.bold, { color: colors.white }]}>
                      Faça Login
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
  userTypeButton: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
