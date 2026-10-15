import React, { useState } from 'react';
import { Text } from 'react-native';
import { router } from 'expo-router';
import Screen from '../../components/Screen';
import StepHeader from '../../components/StepHeader';
import BigInput from '../../components/BigInput';
import BigButton from '../../components/BigButton';
import { colors, fontSize } from '../../theme';

export default function BatalIndex() {
  const [kode, setKode] = useState('');
  const [error, setError] = useState('');

  const lanjut = () => {
    if (!kode.trim()) return setError('Masukkan kode antrean dulu.');
    setError('');
    router.push({ pathname: '/batal/konfirmasi', params: { kode: kode.trim() } });
  };

  return (
    <Screen>
      <StepHeader
        title="Batalkan Antrean"
        subtitle="Tidak jadi berobat? Batalkan di sini."
      />
      <BigInput
        label="Kode Antrean"
        placeholder="Kode dari bukti pendaftaran"
        value={kode}
        onChangeText={setKode}
        error={error}
        hint="Kode tertera di layar bukti pendaftaran (contoh: X7K9P2)"
      />
      <BigButton title="Lanjut →" onPress={lanjut} />
      {error ? null : (
        <Text style={{ color: colors.muted, fontSize: fontSize.small, marginTop: 12 }}>
          Antrean yang dibatalkan tidak bisa dikembalikan.
        </Text>
      )}
    </Screen>
  );
}
