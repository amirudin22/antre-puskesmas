import React, { useState } from 'react';
import { Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../components/Screen';
import StepHeader from '../components/StepHeader';
import SelectCard from '../components/SelectCard';
import BigInput from '../components/BigInput';
import BigButton from '../components/BigButton';
import { colors, fontSize } from '../theme';

export default function PilihPenjamin() {
  const params = useLocalSearchParams();
  const [tipe, setTipe] = useState(''); // '2' = BPJS, '1' = Umum
  const [noka, setNoka] = useState('');
  const [error, setError] = useState('');

  const lanjut = () => {
    if (!tipe) return setError('Pilih salah satu: BPJS atau Umum.');
    if (tipe === '2' && noka.replace(/\D/g, '').length !== 13)
      return setError('Nomor kartu BPJS harus 13 angka.');
    setError('');
    router.push({
      pathname: '/konfirmasi',
      params: {
        ...params,
        idtypepasien: tipe,
        kodekartu: tipe === '2' ? noka.replace(/\D/g, '') : '',
      },
    });
  };

  return (
    <Screen>
      <StepHeader
        step={7}
        total={8}
        title="Pembayaran"
        subtitle="Berobat pakai apa?"
      />
      <SelectCard
        title="💳 BPJS Kesehatan"
        subtitle="Punya kartu BPJS / KIS"
        selected={tipe === '2'}
        onPress={() => setTipe('2')}
      />
      <SelectCard
        title="💵 Umum"
        subtitle="Bayar sendiri / asuransi lain"
        selected={tipe === '1'}
        onPress={() => setTipe('1')}
      />
      {tipe === '2' ? (
        <BigInput
          label="Nomor Kartu BPJS (13 angka)"
          placeholder="Contoh: 0001234567890"
          keyboardType="numeric"
          maxLength={13}
          value={noka}
          onChangeText={(t) => setNoka(t.replace(/\D/g, ''))}
          hint={`${noka.length}/13 digit`}
        />
      ) : null}
      {error ? (
        <Text style={{ color: colors.danger, fontSize: fontSize.body, marginVertical: 8 }}>{error}</Text>
      ) : null}
      <BigButton title="Lanjut →" onPress={lanjut} />
    </Screen>
  );
}
