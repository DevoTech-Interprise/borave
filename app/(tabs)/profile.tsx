import { useToast } from '@/hooks/useToast';
import { authAPI, usersAPI } from '@/services/api';
import { spacing, typography, useButtonStyles, useCardStyles, useColors, useInputStyles, useLayoutStyles } from '@/styles';
import { User } from '@/types/auth';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const layout = useLayoutStyles();
  const card = useCardStyles();
  const buttons = useButtonStyles();
  const inputs = useInputStyles();
  const colors = useColors();
  
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
      <View style={[layout.centered, { flex: 1 }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={layout.container}>
        <View style={spacing.p5}>
          <Text style={[typography.h2, { color: colors.text }]}>Perfil</Text>
          <View style={[card.container, spacing.mt4]}>
            <Text style={[typography.body, { color: colors.text }]}>Erro ao carregar perfil do usuário</Text>
          </View>
          <TouchableOpacity
            style={[buttons.outline, spacing.mt4]}
            onPress={loadUserProfile}
          >
            <Text style={buttons.outlineText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[layout.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.h4, { color: colors.primary }]}>Perfil</Text>
        <TouchableOpacity>
          <Ionicons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={spacing.mb5} showsVerticalScrollIndicator={false}>
        {/* Avatar e Info do Usuário */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` }}
            style={styles.avatar}
          />
          <Text style={[typography.h3, typography.bold, { color: colors.text }, spacing.mt3]}>
            {user?.name}
          </Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt1]}>
            @{user?.name.toLowerCase().replace(/\s+/g, '')}
          </Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt2]}>
            Avaliado por 68 Pessoas
          </Text>

          {/* Rating */}
          <View style={[styles.starsContainer, spacing.mt2]}>
            {[1, 2, 3, 4].map((star) => (
              <Ionicons
                key={star}
                name="star"
                size={16}
                color="#FFD700"
                style={{ marginRight: 2 }}
              />
            ))}
            <Ionicons name="star-outline" size={16} color={colors.textSecondary} />
          </View>

          {/* Excelente classificação */}
          <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt2]}>
            Excelente classificação
          </Text>
        </View>

        {/* Stats */}
        <View style={[styles.statsContainer, spacing.mx4, spacing.my5]}>
          <View style={styles.statItem}>
            <Text style={[typography.h3, typography.bold, { color: colors.primary }]}>2728</Text>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt1]}>
              Seguidores
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[typography.h3, typography.bold, { color: colors.primary }]}>1986</Text>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt1]}>
              Seguindo
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[typography.h3, typography.bold, { color: colors.primary }]}>201</Text>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt1]}>
              Logins
            </Text>
          </View>
        </View>

        {/* Check-ins */}
        <View style={spacing.px4}>
          <View style={[layout.rowBetween, spacing.mb4]}>
            <Text style={[typography.body, typography.bold, { color: colors.primary }]}>
              CHECK IN ANTERIORES
            </Text>
            <TouchableOpacity>
              <Text style={[typography.bodySmall, { color: colors.primary }]}>Ver tudo</Text>
            </TouchableOpacity>
          </View>

          {/* Check-in Item 1 */}
          <TouchableOpacity style={[styles.checkinItem, spacing.mb3]}>
            <View style={layout.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={[typography.body, typography.bold, { color: colors.text }]}>
                  Boi na brasa
                </Text>
                <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt1]}>
                  Sazubim - PE
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* Check-in Item 2 */}
          <TouchableOpacity style={styles.checkinItem}>
            <View style={layout.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={[typography.body, typography.bold, { color: colors.text }]}>
                  A Moenda
                </Text>
                <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt1]}>
                  João Alfredo - PE
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[buttons.danger, spacing.mx4, spacing.mt5, spacing.mb5 ,{ marginTop: 32 }]}
          onPress={handleLogout}
          disabled={loading}
        >
          <Text style={buttons.dangerText}>{loading ? 'Saindo...' : 'Sair da Conta'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  checkinItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
});