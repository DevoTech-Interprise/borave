import { useToast } from '@/hooks/useToast';
import { authAPI } from '@/services/api';
import { spacing, typography, useButtonStyles, useCardStyles, useColors, useLayoutStyles } from '@/styles';
import { User } from '@/types/auth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { showSuccess, showError } = useToast();
  const layout = useLayoutStyles();
  const card = useCardStyles();
  const buttons = useButtonStyles();
  const colors = useColors();
  
  const [loading, setLoading] = useState(false);
  
  const user: User = params.user ? JSON.parse(params.user as string) : null;
  const token = params.token as string;

  const handleLogout = async () => {
    setLoading(true);
    
    try {
      const response = await authAPI.logout();
      if (response.success) {
        showSuccess(response.message, 'Logout realizado!');
        setTimeout(() => {
          router.replace('/');
        }, 1500);
      }
    } catch (error) {
      showError('Ocorreu um erro durante o logout', 'Erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={layout.container}>
      <View style={[layout.centered, { flex: 1 }]}>
        <Text style={[typography.h2, { color: colors.text }]}>Bem-vindo!</Text>
        <Text style={[typography.h4, { color: colors.text }, spacing.mb1]}>{user?.name}</Text>
        <Text style={[typography.body, { color: colors.textSecondary }, spacing.mb6]}>{user?.email}</Text>
        
        <View style={[card.container, spacing.mx5]}>
          <Text style={[typography.body, typography.bold, { color: colors.text }, spacing.mb2]}>
            Informações do Usuário
          </Text>
          <Text style={[typography.body, { color: colors.text }]}>ID: {user?.id}</Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
            Token: {token?.substring(0, 20)}...
          </Text>
        </View>
      </View>

      <View style={spacing.p5}>
        <TouchableOpacity
          style={[buttons.danger, loading && buttons.disabled]}
          onPress={handleLogout}
          disabled={loading}
        >
          <Text style={buttons.dangerText}>{loading ? 'Saindo...' : 'Sair'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}