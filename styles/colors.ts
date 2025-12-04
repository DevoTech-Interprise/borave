import { useColorScheme } from '@/hooks/use-color-scheme';

export const useColors = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    // Primary colors
    primary: isDark ? '#7F0CCB' : '#7F0CCB',
    primaryLight: isDark ? '#AB47BC' : '#9B30FF',
    
    // Background colors
    background: isDark ? '#121212' : '#F5F5F5',
    surface: isDark ? '#2D2D2D' : '#FFFFFF',
    
    // Text colors
    text: isDark ? '#E0E0E0' : '#333333',
    textSecondary: isDark ? '#9CA3AF' : '#6B7280',
    textLight: '#FFFFFF',
    
    // Border colors
    border: isDark ? '#424242' : '#E5E7EB',
    borderLight: isDark ? '#2D2D2D' : '#F3F4F6',
    
    // Status colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Icon colors
    icon: isDark ? '#B0B0B0' : '#999999',
    iconSelected: isDark ? '#9370DB' : '#8A2BE2',
    
    // Utility
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    
    // Theme flag
    isDark,
  };
};
