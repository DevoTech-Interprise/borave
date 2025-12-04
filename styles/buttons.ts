import { StyleSheet } from 'react-native';
import { useColors } from './colors';

export const useButtonStyles = () => {
  const colors = useColors();
  
  return StyleSheet.create({
    // Primary button
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: '600',
    },
    
    // Secondary button
    secondary: {
      backgroundColor: 'transparent',
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    secondaryText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    
    // Danger button
    danger: {
      backgroundColor: colors.error,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dangerText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: '600',
    },
    
    // Success button
    success: {
      backgroundColor: colors.success,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    successText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
    
    // Outline button
    outline: {
      backgroundColor: 'transparent',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    outlineText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '500',
    },
    
    // Disabled state
    disabled: {
      opacity: 0.5,
    },
    
    // Small button
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    smallText: {
      fontSize: 14,
      fontWeight: '600',
    },
    
    // Large button
    large: {
      paddingVertical: 18,
      paddingHorizontal: 32,
      borderRadius: 14,
    },
    largeText: {
      fontSize: 20,
      fontWeight: '600',
    },
  });
};
