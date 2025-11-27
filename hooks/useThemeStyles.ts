import { StyleSheet } from 'react-native';
import { useThemeColor } from './use-theme-color';
import { Colors } from '@/constants/theme';
import { useColorScheme } from './use-color-scheme';

export function useThemeStyles() {
  const colorScheme = useColorScheme();
  
  const getColor = (colorName: keyof typeof Colors.light & keyof typeof Colors.dark) => {
    return useThemeColor({}, colorName);
  };

  const background = getColor('background');
  const text = getColor('text');
  const tint = getColor('tint');
  const icon = getColor('icon');

  const styles = StyleSheet.create({
      // Layout styles
      container: {
        flex: 1,
        backgroundColor: background,
      },
      scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: background,
      },
      
      // Card styles
      card: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: background,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      },
      
      // Text styles
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: text,
      },
      subtitle: {
        fontSize: 18,
        color: icon,
        marginBottom: 50,
        textAlign: 'center',
      },
      text: {
        fontSize: 16,
        color: text,
      },
      label: {
        fontSize: 14,
        color: icon,
        marginBottom: 5,
      },
      
      // Input styles
      input: {
        borderWidth: 1,
        borderColor: icon + '40', // Adiciona transparência
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: background,
        color: text,
      },
      
      // Button styles
      buttonPrimary: {
        backgroundColor: tint,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonSecondary: {
        backgroundColor: icon + '20',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonDanger: {
        backgroundColor: '#FF3B30',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonDisabled: {
        backgroundColor: icon + '40',
      },
      
      // Button text styles
      buttonTextPrimary: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
      },
      buttonTextSecondary: {
        color: text,
        fontSize: 16,
        fontWeight: '600',
      },
      
      // Utility styles
      centered: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      separator: {
        height: 1,
        backgroundColor: icon + '20',
        marginVertical: 20,
      },
  });

  return { styles, getColor, colorScheme };
}