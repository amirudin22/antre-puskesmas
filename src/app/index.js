import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Screen from '../components/Screen';
import BigButton from '../components/BigButton';
import { colors, fontSize, spacing } from '../theme';

export default function Beranda() {
  return (
    <Screen showBack={false}>
      <View style={styles.hero}>
        <Text style={styles.emoji}>🏥</Text>
        <Text style={styles.title}>Antre Puskesmas</Text>
        <Text style={styles.subtitle}>
          Daftar antrean puskesmas Surabaya dari HP, tanpa antre di tempat
        </Text>
      </View>

      <BigButton
        title="📝  Daftar Antrean Baru"
        onPress={() => router.push('/pilih-wilayah')}
      />
      <BigButton
        title="❌  Batalkan Antrean"
        variant="secondary"
        onPress={() => router.push('/batal')}
      />

      <Text style={styles.note}>
        Pendaftaran resmi melalui sistem eHealth Dinas Kesehatan Kota Surabaya.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.xl },
  emoji: { fontSize: 72 },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.body,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  note: {
    fontSize: fontSize.small,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
