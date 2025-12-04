import { StyleSheet } from 'react-native';
import { useColors } from './colors';

export const useLayoutStyles = () => {
  const colors = useColors();
  
  return StyleSheet.create({
    // Container
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    
    // Centered content
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    // Row layout
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    rowCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    // Column layout
    column: {
      flexDirection: 'column',
    },
    
    // Scroll container
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: 20,
    },
    
    // Content wrapper
    content: {
      padding: 20,
    },
    
    contentHorizontal: {
      paddingHorizontal: 20,
    },
    
    // Separator
    separator: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 16,
    },
    
    separatorThick: {
      height: 2,
      backgroundColor: colors.border,
      marginVertical: 20,
    },
    
    // Divider
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: colors.borderLight,
    },
  });
};
