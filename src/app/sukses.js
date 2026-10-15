import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../components/Screen';
import InfoCard from '../components/InfoCard';
import BigButton from '../components/BigButton';
import { colors, fontSize, spacing } from '../theme';

// hasil: { success, data: { noantrian, randomkey, NIK, NAMA_LGKP, dateserves, ... } }
export default function Sukses() {
  const { hasil } = useLocalSearchParams();
  const h = JSON.parse(hasil || '{}');
  const d = h.data || {};

  return (
    <Screen showBack={false}>
      <View style={styles.hero}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>Pendaftaran Berhasil!</Text>
        <Text style={styles.subtitle}>Tunjukkan nomor ini ke petugas puskesmas</Text>
      </View>

      <View style={styles.nomorBox}>
        <Text style={styles.nomorLabel}>NOMOR ANTREAN ANDA</Text>
        <Text style={styles.nomor}>{d.noantrian || '-'}</Text>
        {d.randomkey ? <Text style={styles.kode}>Kode: {d.randomkey}</Text> : null}
      </View>

      <InfoCard
        rows={[
          { label: 'Nama', value: d.NAMA_LGKP },
          { label: 'NIK', value: d.NIK },
          { label: 'Jadwal', value: d.dateserves },
        ]}
      />

      <Text style={styles.tip}>
        💡 Screenshot layar ini sebagai bukti pendaftaran.
      </Text>

      <BigButton title="🏠  Kembali ke Beranda" onPress={() => router.replace('/')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.md },
  emoji: { fontSize: 64 },
  title: { fontSize: fontSize.hero, fontWeight: '800', color: colors.success, marginTop: 8, textAlign: 'center' },
  subtitle: { fontSize: fontSize.body, color: colors.muted, marginTop: 6, textAlign: 'center' },
  nomorBox: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  nomorLabel: { color: '#BBDEFB', fontSize: fontSize.small, fontWeight: '700' },
  nomor: { color: colors.white, fontSize: fontSize.queueNumber, fontWeight: '800' },
  kode: { color: colors.white, fontSize: fontSize.body, marginTop: 4 },
  tip: { fontSize: fontSize.body, color: colors.muted, textAlign: 'center', marginBottom: spacing.md },
});
