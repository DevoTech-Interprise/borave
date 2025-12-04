import { StyleSheet } from 'react-native';
import { useColors } from './colors';

export const useInputStyles = () => {
  const colors = useColors();
  
  return StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.surface,
    },
    
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    
    inputError: {
      borderColor: colors.error,
    },
    
    inputDisabled: {
      backgroundColor: colors.borderLight,
      opacity: 0.6,
    },
    
    errorText: {
      fontSize: 12,
      color: colors.error,
      marginTop: 4,
    },
    
    helperText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    
    // Textarea variant
    textarea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
  });
};
