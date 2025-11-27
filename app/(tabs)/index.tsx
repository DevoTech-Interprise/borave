import { View, Text, ScrollView } from 'react-native';
import { useThemeStyles } from '@/hooks/useThemeStyles';

export default function TabIndex() {
  const { styles } = useThemeStyles();

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Página Inicial</Text>
        <Text style={styles.text}>
          Bem-vindo à tela inicial do app! Esta é uma das abas disponíveis.
        </Text>
        
        <View style={styles.card}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>
            Conteúdo Exemplo
          </Text>
          <Text style={styles.text}>
            Esta é uma demonstração de como usar tabs com sistema de temas.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}