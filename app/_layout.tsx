import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';

// Componente wrapper para o Toast com tema
function ThemedToast() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Cores baseadas no tema
  const background = isDark ? Colors.dark.background : Colors.light.background;
  const text = isDark ? Colors.dark.text : Colors.light.text;
  const success = '#4CAF50';
  const error = '#FF5252';
  const info = '#2196F3';
  const warning = '#FF9800';

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: success,
          backgroundColor: isDark ? '#1B5E20' : '#E8F5E8',
          borderLeftWidth: 6,
          height: 'auto',
          minHeight: 60,
        }}
        contentContainerStyle={{ 
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: isDark ? '#FFFFFF' : '#1B5E20',
        }}
        text2Style={{
          fontSize: 14,
          color: isDark ? '#E0E0E0' : '#2E7D32',
          marginTop: 2,
        }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: error,
          backgroundColor: isDark ? '#B71C1C' : '#FFEBEE',
          borderLeftWidth: 6,
          height: 'auto',
          minHeight: 60,
        }}
        contentContainerStyle={{ 
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: isDark ? '#FFFFFF' : '#C62828',
        }}
        text2Style={{
          fontSize: 14,
          color: isDark ? '#E0E0E0' : '#D32F2F',
          marginTop: 2,
        }}
      />
    ),

    info: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: info,
          backgroundColor: isDark ? '#0D47A1' : '#E3F2FD',
          borderLeftWidth: 6,
          height: 'auto',
          minHeight: 60,
        }}
        contentContainerStyle={{ 
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: isDark ? '#FFFFFF' : '#1565C0',
        }}
        text2Style={{
          fontSize: 14,
          color: isDark ? '#E0E0E0' : '#1976D2',
          marginTop: 2,
        }}
      />
    ),

    warning: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: warning,
          backgroundColor: isDark ? '#E65100' : '#FFF3E0',
          borderLeftWidth: 6,
          height: 'auto',
          minHeight: 60,
        }}
        contentContainerStyle={{ 
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: isDark ? '#FFFFFF' : '#EF6C00',
        }}
        text2Style={{
          fontSize: 14,
          color: isDark ? '#E0E0E0' : '#F57C00',
          marginTop: 2,
        }}
      />
    ),
  };

  return <Toast config={toastConfig} />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="home" />
      </Stack>
      <ThemedToast />
    </>
  );
}