import { useThemeStyles } from '@/hooks/useThemeStyles';
import { useToast } from '@/hooks/useToast';
import { authAPI, usersAPI } from '@/services/api';
import { User } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const router = useRouter();
  const { styles } = useThemeStyles();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '' });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoadingProfile(true);
      const token = await AsyncStorage.getItem('authToken');
      const userStr = await AsyncStorage.getItem('user');

      if (!token || !userStr) {
        showError('Sessão expirada', 'Erro');
        router.replace('/login');
        return;
      }

      const userData: User = JSON.parse(userStr);
      const response = await usersAPI.getUser(userData.id, token);

      if (response.success && response.user) {
        setUser(response.user);
        setEditData({ name: response.user.name, email: response.user.email });
      } else {
        showError(response.message, 'Erro ao carregar perfil');
      }
    } catch (error) {
      showError('Erro ao carregar perfil', 'Erro');
      console.error('Load profile error:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!editData.name.trim() || !editData.email.trim()) {
      showError('Nome e email são obrigatórios', 'Campos inválidos');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      const userStr = await AsyncStorage.getItem('user');

      if (!token || !userStr) {
        showError('Sessão expirada', 'Erro');
        return;
      }

      const userData: User = JSON.parse(userStr);
      const response = await usersAPI.updateUser(userData.id, editData, token);

      if (response.success && response.user) {
        setUser(response.user);
        setIsEditing(false);
        showSuccess('Perfil atualizado com sucesso', 'Sucesso');
        
        // Atualiza o token armazenado
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
      } else {
        showError(response.message, 'Erro ao atualizar perfil');
      }
    } catch (error) {
      showError('Erro ao atualizar perfil', 'Erro');
      console.error('Update profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await authAPI.logout();
      if (response.success) {
        // authAPI.logout já limpa AsyncStorage
        showSuccess(response.message, 'Logout realizado!');
        router.replace('/login');
      }
    } catch (error) {
      showError('Ocorreu um erro durante o logout', 'Erro');
    } finally {
      setLoading(false);
    }
  };

  if (loadingProfile) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>Perfil</Text>
          <View style={styles.card}>
            <Text style={styles.text}>Erro ao carregar perfil do usuário</Text>
          </View>
          <TouchableOpacity 
            style={styles.buttonSecondary}
            onPress={loadUserProfile}
          >
            <Text style={styles.buttonTextSecondary}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.card}>
          <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 15, fontSize: 18 }]}>
            Informações do Usuário
          </Text>

          {isEditing ? (
            <>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                value={editData.name}
                onChangeText={(text) => setEditData({ ...editData, name: text })}
                editable={!loading}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                value={editData.email}
                onChangeText={(text) => setEditData({ ...editData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </>
          ) : (
            <>
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.label}>Nome</Text>
                <Text style={styles.text}>{user.name}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.text}>{user.email}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={styles.label}>ID</Text>
                <Text style={styles.text}>{user.id}</Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={styles.label}>Função</Text>
                <Text style={styles.text}>
                  {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                </Text>
              </View>

              <View>
                <Text style={styles.label}>Data de Criação</Text>
                <Text style={styles.text}>{user.created_at}</Text>
              </View>
            </>
          )}
        </View>

        {isEditing ? (
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
            <TouchableOpacity
              style={[styles.buttonPrimary, loading && styles.buttonDisabled, { flex: 1 }]}
              onPress={handleSaveChanges}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonTextPrimary}>Salvar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonSecondary, { flex: 1 }]}
              onPress={() => {
                setIsEditing(false);
                setEditData({ name: user.name, email: user.email });
              }}
              disabled={loading}
            >
              <Text style={styles.buttonTextSecondary}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.buttonSecondary, { marginTop: 20 }]}
            onPress={() => setIsEditing(true)}
            disabled={loading}
          >
            <Text style={styles.buttonTextSecondary}>Editar Perfil</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.buttonDanger, loading && styles.buttonDisabled, { marginTop: 20 }]}
          onPress={handleLogout}
          disabled={loading}
        >
          <Text style={styles.buttonTextPrimary}>
            {loading ? 'Saindo...' : 'Sair da Conta'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}