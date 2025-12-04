import { StyleSheet } from 'react-native';
import { useColors } from './colors';

export const useCardStyles = () => {
  const colors = useColors();
  
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: colors.isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    
    // Card with border
    bordered: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    
    // Compact card
    compact: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    
    // Card header
    header: {
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    
    // Card content
    content: {
      gap: 12,
    },
    
    // Card footer
    footer: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
  });
};
