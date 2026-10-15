import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../components/Screen';
import StepHeader from '../components/StepHeader';
import SelectCard from '../components/SelectCard';
import { api } from '../api/client';
import { colors, fontSize } from '../theme';

export default function PilihPoli() {
  const { wilayah, idunitkerja, namaPuskesmas } = useLocalSearchParams();
  const [list, setList] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .poli()
      .then((all) => setList(all.filter((p) => String(p.idunitkerja) === String(idunitkerja))))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <Screen loading={list === null && !error}>
      <StepHeader step={3} total={8} title="Pilih Poli" subtitle={namaPuskesmas} />
      {error ? <Text style={{ fontSize: fontSize.body, color: colors.danger }}>{error}</Text> : null}
      {(list || []).map((p) => {
        const sisa = (p.servesmax || 0) - (p.servesno || 0);
        return (
          <SelectCard
            key={p.noid}
            title={p.policaption || p.nama}
            subtitle={p.namaklaster}
            badge={p.servesmax > 0 ? `Sisa kuota: ${sisa}` : null}
            onPress={() =>
              router.push({
                pathname: '/pilih-tanggal',
                params: {
                  wilayah,
                  idunitkerja,
                  namaPuskesmas,
                  idbppoli: String(p.noid),
                  poli: p.policaption || p.nama,
                  klaster: p.namaklaster || '',
                },
              })
            }
          />
        );
      })}
    </Screen>
  );
}
