import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { authAPI } from '@/services/api';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';

export default function Profile() {
  const router = useRouter();
  const { styles } = useThemeStyles();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);

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
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Perfil</Text>
        
        <View style={styles.card}>
          <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 10 }]}>
            Informações do Usuário
          </Text>
          <Text style={styles.text}>Nome: Usuário Exemplo</Text>
          <Text style={styles.text}>Email: usuario@exemplo.com</Text>
          <Text style={styles.text}>ID: 12345</Text>
        </View>

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
    </View>
  );
}