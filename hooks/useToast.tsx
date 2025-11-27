import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

export function useToast() {
  const showSuccess = useCallback((message: string, title?: string) => {
    Toast.show({
      type: 'success',
      text1: title || 'Sucesso',
      text2: message,
      position: 'bottom',
    });
  }, []);

  const showError = useCallback((message: string, title?: string) => {
    Toast.show({
      type: 'error',
      text1: title || 'Erro',
      text2: message,
      position: 'bottom',
    });
  }, []);

  const showInfo = useCallback((message: string, title?: string) => {
    Toast.show({
      type: 'info',
      text1: title || 'Informação',
      text2: message,
      position: 'bottom',
    });
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
  };
}