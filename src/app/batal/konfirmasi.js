import React, { useState } from 'react';
import { Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../../components/Screen';
import StepHeader from '../../components/StepHeader';
import InfoCard from '../../components/InfoCard';
import BigButton from '../../components/BigButton';
import { api } from '../../api/client';
import { colors, fontSize, spacing } from '../../theme';

export default function BatalKonfirmasi() {
  const { kode } = useLocalSearchParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const batalkan = async () => {
    setError('');
    setLoading(true);
    try {
      const hasil = await api.batal(kode);
      router.push({ pathname: '/batal/hasil', params: { hasil: JSON.stringify(hasil), kode } });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <StepHeader title="Yakin Batalkan?" subtitle="Periksa kodenya sekali lagi" />
      <InfoCard rows={[{ label: 'Kode antrean', value: kode }]} />
      {error ? (
        <Text style={{ color: colors.danger, fontSize: fontSize.body, marginVertical: 8 }}>{error}</Text>
      ) : null}
      {loading ? (
        <Text style={{ fontSize: fontSize.body, color: colors.muted, marginTop: spacing.sm }}>
          Membatalkan…
        </Text>
      ) : null}
      <BigButton title="❌  Ya, Batalkan" variant="danger" onPress={batalkan} loading={loading} />
    </Screen>
  );
}
