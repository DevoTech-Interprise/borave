import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { authAPI } from '@/services/api';
import { User } from '@/types/auth';
import { useState } from 'react';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { useToast } from '@/hooks/useToast';

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { styles } = useThemeStyles();
  const { showSuccess, showError } = useToast();
  
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
    <View style={styles.container}>
      <View style={[styles.centered, { flex: 1 }]}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={[styles.text, { fontSize: 20, fontWeight: '600', marginBottom: 5 }]}>
          {user?.name}
        </Text>
        <Text style={[styles.text, { marginBottom: 30 }]}>{user?.email}</Text>
        
        <View style={styles.card}>
          <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 10 }]}>
            Informações do Usuário
          </Text>
          <Text style={styles.text}>ID: {user?.id}</Text>
          <Text style={styles.text}>Token: {token?.substring(0, 20)}...</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.buttonDanger, loading && styles.buttonDisabled]}
        onPress={handleLogout}
        disabled={loading}
      >
        <Text style={styles.buttonTextPrimary}>
          {loading ? 'Saindo...' : 'Sair'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}