import { spacing, typography, useColors, useLayoutStyles } from '@/styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock de notificações
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    user: {
      name: 'Matias Farias',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    message: 'Você recebeu R$0,25',
    time: '5 min',
    type: 'payment',
  },
  {
    id: '2',
    user: {
      name: 'Mônica Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    message: 'Você recebeu R$0,25',
    time: '12 min',
    type: 'payment',
  },
  {
    id: '3',
    user: {
      name: 'Gabriela Prazeres',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    message: 'Você recebeu R$0,25',
    time: '1 h',
    type: 'payment',
  },
  {
    id: '4',
    user: {
      name: 'Arthur Simões',
      avatar: 'https://i.pravatar.cc/150?img=68',
    },
    message: 'Você recebeu R$0,25',
    time: '2 h',
    type: 'payment',
  },
  {
    id: '5',
    user: {
      name: 'Nadally Pereira',
      avatar: 'https://i.pravatar.cc/150?img=45',
    },
    message: 'Você recebeu R$0,25',
    time: '3 h',
    type: 'payment',
  },
  {
    id: '6',
    user: {
      name: 'Talita Neco',
      avatar: 'https://i.pravatar.cc/150?img=25',
    },
    message: 'Você recebeu R$0,25',
    time: '5 h',
    type: 'payment',
  },
];

export default function Notifications() {
  const layout = useLayoutStyles();
  const colors = useColors();
  const router = useRouter();

  const renderNotification = ({ item }: { item: typeof MOCK_NOTIFICATIONS[0] }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[typography.body, typography.bold, { color: colors.text }]}>
          {item.user.name}
        </Text>
        <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
          {item.message}
        </Text>
      </View>
      <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
        {item.time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[layout.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.h4, { color: colors.primary }]}>Notificações</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Lista de notificações */}
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={spacing.p4}
        showsVerticalScrollIndicator={false}
      />
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
