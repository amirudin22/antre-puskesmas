import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../../components/Screen';
import BigButton from '../../components/BigButton';
import { colors, fontSize, spacing } from '../../theme';

export default function BatalHasil() {
  const { hasil, kode } = useLocalSearchParams();
  const h = JSON.parse(hasil || '{}');

  return (
    <Screen showBack={false}>
      <View style={styles.hero}>
        <Text style={styles.emoji}>🗑️</Text>
        <Text style={styles.title}>Antrean Dibatalkan</Text>
        <Text style={styles.subtitle}>
          Kode {kode} sudah tidak berlaku.{'\n'}
          {typeof h === 'string' ? h : 'Silakan daftar lagi jika berubah pikiran.'}
        </Text>
      </View>
      <BigButton title="🏠  Kembali ke Beranda" onPress={() => router.replace('/')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.xl },
  emoji: { fontSize: 64 },
  title: { fontSize: fontSize.hero, fontWeight: '800', color: colors.text, marginTop: 8, textAlign: 'center' },
  subtitle: { fontSize: fontSize.body, color: colors.muted, marginTop: 8, textAlign: 'center' },
});
