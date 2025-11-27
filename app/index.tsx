import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { styles } = useThemeStyles(); // Use styles diretamente, não createStyles

  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={styles.title}>Boravê</Text>
      <Text style={styles.subtitle}>Bem-vindo ao Boravê</Text>
      
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