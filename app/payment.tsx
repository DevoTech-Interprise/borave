import { spacing, typography, useButtonStyles, useColors, useLayoutStyles } from '@/styles';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const layout = useLayoutStyles();
  const buttons = useButtonStyles();
  const colors = useColors();

  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const userName = (params.userName as string) || 'Usuário';
  const establishmentName = (params.establishment as string) || 'Estabelecimento';
  const amount = (params.amount as string) || 'R$10,00';
  const mediaCount = (params.mediaCount as string) || '5';

  const handlePayment = () => {
    // Simula o pagamento
    setPaymentCompleted(true);
    setTimeout(() => {
      router.push('/chat');
    }, 2000);
  };

  if (paymentCompleted) {
    return (
      <View style={[layout.centered, { flex: 1, backgroundColor: colors.background }]}>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={80} color={colors.primary} />
          <Text style={[typography.h3, typography.bold, { color: colors.text }, spacing.mt4]}>
            Pagamento Realizado!
          </Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt2]}>
            Redirecionando para o chat...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[layout.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.h4, { color: colors.primary }]}>Desbloqueio</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={[spacing.p4, spacing.p5]}
        showsVerticalScrollIndicator={false}
      >
        {/* Establishment Info */}
        <View style={styles.infoCard}>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
            Desbloqueie a conversa com
          </Text>
          <Text style={[typography.h3, typography.bold, { color: colors.primary }, spacing.mt2]}>
            {userName}
          </Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt2]}>
            Para ver como está em {establishmentName}
          </Text>
        </View>

        {/* Price Section */}
        <View style={[styles.priceContainer, spacing.mt4]}>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }, { textAlign: 'center' }]}>
            Valor do desbloqueio
          </Text>
          <Text style={[typography.h1, typography.bold, { color: colors.primary }, spacing.mt2, { textAlign: 'center' }]}>
            {amount}
          </Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt2, { textAlign: 'center' }]}>
            Direito a {mediaCount} mídias
          </Text>
        </View>

        {/* QR Code Section */}
        <View style={[styles.qrContainer, spacing.mt4]}>
          <Text style={[typography.body, typography.bold, { color: colors.text }, spacing.mb4]}>
            Escaneie o QR Code
          </Text>
          <Image
            source={{
              uri: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020126360014br.gov.bcb.brcode0136123e4567-e12b-12d1-a456-426655440000520400005303986540510.005802BR5913ExemploName6009SaoPaulo62070503***63041D3D',
            }}
            style={styles.qrCode}
          />
          <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt4, { textAlign: 'center' }]}>
            Ou copie a chave PIX
          </Text>
        </View>

        {/* PIX Key Copy Section */}
        <TouchableOpacity
          style={[styles.pixKeyContainer, spacing.mt4]}
          onPress={() => {
            // Simula copiar a chave
          }}
        >
          <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
            Chave PIX (Aleatória)
          </Text>
          <View style={[layout.rowBetween, spacing.mt2]}>
            <Text 
              style={[typography.bodySmall, { color: colors.text }]} 
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              550c0580bb-0215-4580-83e0-3e3600000000
            </Text>
            <Ionicons name="copy" size={20} color={colors.primary} style={{ marginLeft: 8 }} />
          </View>
        </TouchableOpacity>

        {/* Payment Instructions */}
        <View style={[spacing.mt6]}>
          <Text style={[typography.bodySmall, typography.bold, { color: colors.text }]}>
            Instruções:
          </Text>
          <View style={spacing.mt3}>
            <View style={[layout.row, spacing.mb2]}>
              <Text style={[typography.body, { color: colors.primary }]}>• </Text>
              <Text style={[typography.bodySmall, { color: colors.text }, { flex: 1 }]}>
                Abra seu banco ou app PIX
              </Text>
            </View>
            <View style={[layout.row, spacing.mb2]}>
              <Text style={[typography.body, { color: colors.primary }]}>• </Text>
              <Text style={[typography.bodySmall, { color: colors.text }, { flex: 1 }]}>
                Escaneie o código QR ou copie a chave
              </Text>
            </View>
            <View style={[layout.row]}>
              <Text style={[typography.body, { color: colors.primary }]}>• </Text>
              <Text style={[typography.bodySmall, { color: colors.text }, { flex: 1 }]}>
                Confirme o pagamento de {amount}
              </Text>
            </View>
          </View>
        </View>

        {/* Confirm Payment Button */}
        <TouchableOpacity
          style={[buttons.primary, spacing.mt6]}
          onPress={handlePayment}
        >
          <Text style={buttons.primaryText}>Confirmar Pagamento</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[spacing.mt3]}
          onPress={() => router.back()}
        >
          <Text style={[typography.body, { color: colors.primary, textAlign: 'center' }]}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priceContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  qrContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  qrCode: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  pixKeyContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  successContainer: {
    alignItems: 'center',
  },
});
