import { spacing, typography, useButtonStyles, useColors, useInputStyles, useLayoutStyles } from '@/styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mock de mensagens
const MOCK_MESSAGES = [
  {
    id: '1',
    text: 'Olá! Como você está?',
    sent: false,
    time: '10:30',
  },
  {
    id: '2',
    text: 'Oi! Estou bem, e você?',
    sent: true,
    time: '10:32',
  },
  {
    id: '3',
    text: 'Vamos marcar de ir ao Clube Metrópole hoje?',
    sent: false,
    time: '10:35',
  },
  {
    id: '4',
    text: 'Boravê! Que horas?',
    sent: true,
    time: '10:37',
  },
];

const CONTACT = {
  name: 'Mônica Oliveira',
  avatar: 'https://i.pravatar.cc/150?img=5',
};

export default function Chat() {
  const layout = useLayoutStyles();
  const inputs = useInputStyles();
  const buttons = useButtonStyles();
  const colors = useColors();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const renderMessage = ({ item }: { item: typeof MOCK_MESSAGES[0] }) => (
    <View
      style={[
        styles.messageContainer,
        item.sent ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: item.sent ? colors.primary : colors.surface,
          },
        ]}
      >
        <Text
          style={[
            typography.body,
            { color: item.sent ? colors.white : colors.text },
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            typography.bodySmall,
            {
              color: item.sent ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
              marginTop: 4,
            },
          ]}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[layout.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <View style={[layout.row, { flex: 1, marginLeft: 12 }]}>
          <Image source={{ uri: CONTACT.avatar }} style={styles.avatar} />
          <Text style={[typography.body, typography.bold, { color: colors.primary, marginLeft: 8 }]}>
            {CONTACT.name}
          </Text>
        </View>
      </View>

      {/* Lista de mensagens */}
      <FlatList
        data={MOCK_MESSAGES}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={[spacing.p4, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      />

      {/* Input de mensagem */}
      <View style={[styles.inputContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add-circle" size={32} color={colors.primary} />
        </TouchableOpacity>
        
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text }]}
          placeholder="Digite algo..."
          placeholderTextColor={colors.textSecondary}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="image" size={28} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mic" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  messageContainer: {
    marginBottom: 12,
  },
  sentMessage: {
    alignItems: 'flex-end',
  },
  receivedMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  iconButton: {
    padding: 4,
  },
});
