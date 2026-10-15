import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../components/Screen';
import StepHeader from '../components/StepHeader';
import SelectCard from '../components/SelectCard';
import BigInput from '../components/BigInput';
import { PUSKESMAS } from '../data/puskesmas';

export default function PilihPuskesmas() {
  const { wilayah } = useLocalSearchParams();
  const [cari, setCari] = useState('');

  const daftar = PUSKESMAS.filter(
    (p) =>
      p.wilayah === wilayah &&
      p.nama.toLowerCase().includes(cari.trim().toLowerCase())
  );

  return (
    <Screen>
      <StepHeader
        step={2}
        total={8}
        title="Pilih Puskesmas"
        subtitle={`Wilayah Surabaya ${wilayah.charAt(0) + wilayah.slice(1).toLowerCase()}`}
      />
      <BigInput
        label="Cari nama puskesmas"
        placeholder="Contoh: Asemrowo"
        value={cari}
        onChangeText={setCari}
      />
      {daftar.map((p) => (
        <SelectCard
          key={p.id}
          title={p.nama}
          onPress={() =>
            router.push({
              pathname: '/pilih-poli',
              params: { wilayah, idunitkerja: String(p.id), namaPuskesmas: p.nama },
            })
          }
        />
      ))}
    </Screen>
  );
}
