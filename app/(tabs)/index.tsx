import { checkInAPI } from '@/services/api';
import { spacing, typography, useButtonStyles, useCardStyles, useColors, useLayoutStyles } from '@/styles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MOCK_ESTABLISHMENTS = [
  {
    id: '1',
    name: 'Clube Metrópole',
    location: 'São Paulo, SP',
    description: 'DJs, drinks, festas e atmosfera energética.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
  },
  {
    id: '2',
    name: 'Bar Rio',
    location: 'São Paulo, SP',
    description: 'Ambiente descontraído com música ao vivo.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',
  },
  {
    id: '3',
    name: 'Pizza House',
    location: 'São Paulo, SP',
    description: 'Pizzaria tradicional com receita original.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c6677eae7?w=800',
  },
  {
    id: '4',
    name: 'Restaurante Italia',
    location: 'Rio de Janeiro, RJ',
    description: 'Culinária italiana autêntica.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1504674900967-cf16fe37e989?w=800',
  },
];

// Mock de dados de check-ins
const MOCK_CHECKINS = [
  {
    id: '1',
    user: {
      name: 'Fagner Hay',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    establishment: {
      name: 'Clube Metrópole',
      description: 'DJs, drinks, festas e atmosfera energética. Clube dançante com vários ambientes, bares e estilos de música.',
    },
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    rating: 4,
    timeAgo: 'Fez checkin há 29 minutos em Clube Metrópole',
  },
  {
    id: '2',
    user: {
      name: 'Mônica Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    establishment: {
      name: 'Bar Rio',
      description: 'Ambiente descontraído com música ao vivo e petiscos variados.',
    },
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',
    rating: 5,
    timeAgo: 'Fez checkin há 52 minutos em Bar Rio',
  },
];

export default function TabIndex() {
  const layout = useLayoutStyles();
  const card = useCardStyles();
  const buttons = useButtonStyles();
  const colors = useColors();
  const router = useRouter();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStage, setModalStage] = useState<'establishment' | 'details'>('establishment');
  const [selectedEstablishment, setSelectedEstablishment] = useState<typeof MOCK_ESTABLISHMENTS[0] | null>(null);
  const [checkInText, setCheckInText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchEstablishment, setSearchEstablishment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenCamera = () => {
    // Simulação de seleção de imagem
    setSelectedImage('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800');
  };

  const handlePublish = async () => {
    if (!selectedEstablishment) {
      alert('Por favor, selecione um estabelecimento');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        alert('Sessão expirada. Faça login novamente.');
        return;
      }

      const response = await checkInAPI.createCheckIn(
        {
          establishmentId: selectedEstablishment.id,
          description: checkInText,
          image: selectedImage || undefined,
        },
        token
      );

      if (response.success) {
        // Limpar dados após publicação bem-sucedida
        setModalVisible(false);
        setModalStage('establishment');
        setCheckInText('');
        setSelectedImage(null);
        setSelectedEstablishment(null);
        setSearchEstablishment('');
        alert('Check-in publicado com sucesso!');
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert('Erro ao publicar check-in');
      console.error('Publish error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEstablishment = (establishment: typeof MOCK_ESTABLISHMENTS[0]) => {
    setSelectedEstablishment(establishment);
    setModalStage('details');
  };

  const handleBackToEstablishments = () => {
    setSelectedEstablishment(null);
    setModalStage('establishment');
    setCheckInText('');
    setSelectedImage(null);
  };

  const filteredEstablishments = MOCK_ESTABLISHMENTS.filter((est) =>
    est.name.toLowerCase().includes(searchEstablishment.toLowerCase()) ||
    est.location.toLowerCase().includes(searchEstablishment.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color={star <= rating ? '#FFD700' : colors.textSecondary}
          />
        ))}
      </View>
    );
  };

  const renderCheckIn = ({ item }: { item: typeof MOCK_CHECKINS[0] }) => (
    <View style={[card.container, spacing.mb4]}>
      {/* Header do usuário */}
      <View style={[layout.rowBetween, spacing.mb3]}>
        <View style={[layout.row, { flex: 1 }]}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[typography.body, typography.bold, { color: colors.text }]}>
              {item.user.name}
            </Text>
            <Text 
              style={[typography.bodySmall, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {item.timeAgo}
            </Text>
            {renderStars(item.rating)}
          </View>
        </View>
      </View>

      {/* Imagem do estabelecimento com blur */}
      <Image
        source={{ uri: item.image }}
        style={styles.establishmentImage}
        blurRadius={8}
      />

      {/* Informações do estabelecimento */}
      <View style={spacing.mt3}>
        <Text style={[typography.body, typography.bold, { color: colors.text }]}>
          {item.establishment.name}
        </Text>
        <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt1]}>
          {item.establishment.description}
        </Text>
      </View>

      {/* Botão de ação */}
      <TouchableOpacity 
        style={[buttons.primary, spacing.mt3]}
        onPress={() => router.push({
          pathname: '/payment',
          params: {
            userName: item.user.name,
            establishment: item.establishment.name,
            amount: 'R$10,00',
            mediaCount: '5'
          }
        })}
      >
        <Text style={buttons.primaryText}>Pagar para vê!</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[layout.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/filter')}>
          <Ionicons name="options" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.h4, { color: colors.primary }]}>Feed</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/notifications')}>
          <Ionicons name="notifications" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Feed de check-ins */}
      <FlatList
        data={MOCK_CHECKINS}
        keyExtractor={(item) => item.id}
        renderItem={renderCheckIn}
        contentContainerStyle={spacing.p4}
        showsVerticalScrollIndicator={false}
      />

      {/* Botão flutuante para criar publicação */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="camera" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal de criação de check-in */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          handlePublish();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={[layout.rowBetween, spacing.mb4]}>
              <Text style={[typography.h4, { color: colors.text }]}>
                {modalStage === 'establishment' ? 'Selecione um local' : 'Sua vez de publicar!'}
              </Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(false);
                handlePublish();
              }}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* STAGE 1: Seleção de Estabelecimento */}
            {modalStage === 'establishment' ? (
              <>
                {/* Search input */}
                <TextInput
                  style={[styles.searchInput, { borderColor: colors.border, color: colors.text }]}
                  placeholder="Buscar estabelecimento..."
                  placeholderTextColor={colors.textSecondary}
                  value={searchEstablishment}
                  onChangeText={setSearchEstablishment}
                />

                {/* Lista de estabelecimentos */}
                <FlatList
                  data={filteredEstablishments}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.establishmentCard, { borderColor: colors.border }]}
                      onPress={() => handleSelectEstablishment(item)}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.establishmentCardImage}
                        blurRadius={4}
                      />
                      <View style={[styles.establishmentCardContent, spacing.p3]}>
                        <Text style={[typography.body, typography.bold, { color: colors.text }]}>
                          {item.name}
                        </Text>
                        <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt1]}>
                          {item.location}
                        </Text>
                        <View style={[layout.row, spacing.mt2]}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons
                              key={star}
                              name={star <= item.rating ? 'star' : 'star-outline'}
                              size={14}
                              color={star <= item.rating ? '#FFD700' : colors.textSecondary}
                            />
                          ))}
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                />
              </>
            ) : (
              <>
                {/* STAGE 2: Detalhes do Check-in */}
                {/* Info do estabelecimento selecionado */}
                {selectedEstablishment && (
                  <View style={[styles.selectedEstablishmentInfo, spacing.mb4]}>
                    <Image
                      source={{ uri: selectedEstablishment.image }}
                      style={styles.selectedEstablishmentImage}
                      blurRadius={4}
                    />
                    <View style={spacing.p2}>
                      <Text style={[typography.bodySmall, typography.bold, { color: colors.text }]}>
                        {selectedEstablishment.name}
                      </Text>
                      <Text style={[typography.bodySmall, { color: colors.textSecondary }, spacing.mt1]}>
                        {selectedEstablishment.location}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Preview da imagem */}
                {selectedImage ? (
                  <View style={spacing.mb4}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.previewImage}
                      blurRadius={8}
                    />
                    <TouchableOpacity
                      style={styles.changeImageButton}
                      onPress={handleOpenCamera}
                    >
                      <Ionicons name="camera" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[styles.cameraButton, { borderColor: colors.primary }]}
                    onPress={handleOpenCamera}
                  >
                    <Ionicons name="camera" size={48} color={colors.primary} />
                    <Text style={[typography.body, { color: colors.primary }, spacing.mt2]}>
                      Adicionar foto
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Input de texto */}
                <TextInput
                  style={[styles.textInput, { borderColor: colors.border, color: colors.text }]}
                  placeholder="Descreva sua experiência..."
                  placeholderTextColor={colors.textSecondary}
                  multiline
                  numberOfLines={4}
                  value={checkInText}
                  onChangeText={setCheckInText}
                />

                {/* Botões de ação */}
                <View style={[layout.row, { gap: 12 }]}>
                  <TouchableOpacity
                    style={[buttons.primary, { flex: 1 }, spacing.mt4, loading && { opacity: 0.6 }]}
                    onPress={handleBackToEstablishments}
                    disabled={loading}
                  >
                    <Text style={buttons.primaryText}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[buttons.primary, { flex: 1 }, spacing.mt4, loading && { opacity: 0.6 }]}
                    onPress={handlePublish}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text style={buttons.primaryText}>Publicar</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 2,
  },
  establishmentImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
    minHeight: '60%',
  },
  cameraButton: {
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#8A2BE2',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  establishmentCard: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  establishmentCardImage: {
    width: 80,
    height: 80,
  },
  establishmentCardContent: {
    flex: 1,
  },
  selectedEstablishmentInfo: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
  },
  selectedEstablishmentImage: {
    width: 60,
    height: 60,
  },
});