import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';
import { useColorScheme } from './use-color-scheme';
import { useThemeColor } from './use-theme-color';

export function useThemeStyles() {
  const colorScheme = useColorScheme();
  
  const getColor = (colorName: keyof typeof Colors.light & keyof typeof Colors.dark) => {
    return useThemeColor({}, colorName);
  };

  const background = getColor('background');
  const text = getColor('text');
  const tint = getColor('tint');
  const icon = getColor('icon');
  const surface = getColor('surface');
  const success = getColor('success');
  const error = getColor('error');
  const warning = getColor('warning');
  const info = getColor('info');

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
        backgroundColor: surface,
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
        borderColor: tint + '30', // Roxo com transparência
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: surface,
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
        backgroundColor: tint + '20',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: tint + '40',
      },
      buttonDanger: {
        backgroundColor: error,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonSuccess: {
        backgroundColor: success,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonWarning: {
        backgroundColor: warning,
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
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
      },
      buttonTextSecondary: {
        color: tint,
        fontSize: 16,
        fontWeight: '600',
      },
      
      // Message styles
      messageSuccess: {
        color: success,
        fontSize: 14,
        fontWeight: '500',
      },
      messageError: {
        color: error,
        fontSize: 14,
        fontWeight: '500',
      },
      messageWarning: {
        color: warning,
        fontSize: 14,
        fontWeight: '500',
      },
      messageInfo: {
        color: info,
        fontSize: 14,
        fontWeight: '500',
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
        backgroundColor: tint + '20',
        marginVertical: 20,
      },
  });

  return { styles, getColor, colorScheme };
}