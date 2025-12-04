import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  
  // Body text
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Labels
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Button text
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextLarge: {
    fontSize: 18,
    fontWeight: '600',
  },
  
  // Text alignment
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  
  // Font weights
  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: '600',
  },
  medium: {
    fontWeight: '500',
  },
  regular: {
    fontWeight: '400',
  },
});
