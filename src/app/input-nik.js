import React, { useState } from 'react';
import { Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../components/Screen';
import StepHeader from '../components/StepHeader';
import BigInput from '../components/BigInput';
import BigButton from '../components/BigButton';
import { api } from '../api/client';
import { colors, fontSize, spacing } from '../theme';

export default function InputNik() {
  const params = useLocalSearchParams();
  const { idunitkerja } = params;
  const [nik, setNik] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const cek = async () => {
    const bersih = nik.replace(/\D/g, '');
    if (bersih.length !== 16) {
      setError('NIK harus 16 angka. Periksa lagi ya.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const hasil = await api.cekNik(idunitkerja, bersih);
      router.push({
        pathname: '/data-pasien',
        params: { ...params, nik: bersih, hasil: JSON.stringify(hasil || []) },
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <StepHeader
        step={5}
        total={8}
        title="Masukkan NIK"
        subtitle="16 angka sesuai KTP"
      />
      <BigInput
        label="Nomor Induk Kependudukan (NIK)"
        placeholder="Contoh: 3578xxxxxxxxxx"
        keyboardType="numeric"
        maxLength={16}
        value={nik}
        onChangeText={(t) => setNik(t.replace(/\D/g, ''))}
        error={error}
        hint={`${nik.length}/16 digit`}
      />
      {loading ? (
        <Text style={{ fontSize: fontSize.body, color: colors.muted, marginTop: spacing.sm }}>
          Mengecek data ke puskesmas…
        </Text>
      ) : null}
      <BigButton title="Cek Data →" onPress={cek} loading={loading} />
    </Screen>
  );
}
