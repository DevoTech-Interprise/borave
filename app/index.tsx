import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useThemeStyles } from '@/hooks/useThemeStyles';

export default function Index() {
  const { styles } = useThemeStyles(); // Use styles diretamente, não createStyles

  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>Template de Login com Expo</Text>
      
      <View style={{ width: '100%', maxWidth: 300 }}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonTextPrimary}>Fazer Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}