import { spacing, typography, useButtonStyles, useColors, useLayoutStyles } from '@/styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock de estabelecimentos
const MOCK_ESTABLISHMENTS = [
  {
    id: '1',
    name: 'Espetinho Do Marcos',
    location: 'João Pessoa',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
  },
  {
    id: '2',
    name: 'Bar do Zé',
    location: 'Recife',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400',
  },
];

const CATEGORIES = ['Cidade', 'Bar', 'Restaurante', 'Boate'];

export default function Filter() {
  const layout = useLayoutStyles();
  const buttons = useButtonStyles();
  const colors = useColors();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Cidade');

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={14}
            color={star <= rating ? '#FFD700' : colors.textSecondary}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[layout.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.h4, { color: colors.primary }]}>Filtro</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={spacing.p4}>
        {/* Barra de pesquisa */}
        <View style={[styles.searchBar, { backgroundColor: colors.primary }]}>
          <Text style={[typography.body, { color: colors.white, flex: 1 }]}>
            Pesquise o estabelecimento
          </Text>
          <Ionicons name="search" size={24} color={colors.white} />
        </View>

        {/* Categorias */}
        <View style={[layout.row, { flexWrap: 'wrap', gap: 8 }, spacing.mb4]}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === category ? colors.primary : 'transparent',
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  typography.bodySmall,
                  {
                    color: selectedCategory === category ? colors.white : colors.primary,
                  },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de estabelecimentos */}
        {MOCK_ESTABLISHMENTS.map((establishment) => (
          <TouchableOpacity key={establishment.id} style={[styles.establishmentCard, spacing.mb3]}>
            <Image
              source={{ uri: establishment.image }}
              style={styles.establishmentImage}
              blurRadius={6}
            />
            <View style={styles.establishmentInfo}>
              <Text style={[typography.body, typography.bold, { color: colors.text }]}>
                {establishment.name}
              </Text>
              <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                {establishment.location}
              </Text>
              {renderStars(establishment.rating)}
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  establishmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  establishmentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  establishmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 2,
  },
});
