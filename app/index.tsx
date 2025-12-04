import { useButtonStyles, useColors, useLayoutStyles } from '@/styles';
import { Link } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const layout = useLayoutStyles();
  const buttons = useButtonStyles();
  const colors = useColors();

  return (
    <View style={[layout.container, { backgroundColor: colors.primary }]}>
      <ImageBackground
        source={require('@/assets/images/bg-borave.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        resizeMode="cover"
      >
        <View style={[layout.centered, { flex: 1 }]}>
          <Image 
            source={require('@/assets/images/logo.png')} 
            style={{ width: 192, height: 112, marginBottom: 24}}
            resizeMode="contain"
          />

          <View style={{ width: '100%', maxWidth: 300 }}>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.whiteButton}>
                <Text style={[buttons.primaryText, { color: colors.primary }]}>Fazer Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.1,
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});