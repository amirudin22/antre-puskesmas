import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../components/Screen';
import StepHeader from '../components/StepHeader';
import SelectCard from '../components/SelectCard';
import { api } from '../api/client';
import { colors, fontSize } from '../theme';

// tglformat mengikuti situs asli: "Kamis, 15 Oktober 2026"
function fmtTanggal(val, dayStr, monthStr) {
  const [y, m, d] = val.split('-');
  return `${dayStr}, ${parseInt(d, 10)} ${monthStr} ${y}`;
}

export default function PilihTanggal() {
  const params = useLocalSearchParams();
  const { idunitkerja, idbppoli, namaPuskesmas, poli } = params;
  const [dates, setDates] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .tanggal(idunitkerja, idbppoli)
      .then((d) => setDates(d.listdate || []))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <Screen loading={dates === null && !error}>
      <StepHeader
        step={4}
        total={8}
        title="Pilih Tanggal"
        subtitle={`${namaPuskesmas} — ${poli}`}
      />
      {error ? <Text style={{ fontSize: fontSize.body, color: colors.danger }}>{error}</Text> : null}
      {(dates || []).map((t) => {
        const sisa = t.max ? t.max.sisa : null;
        const penuh = sisa !== null && sisa <= 0;
        return (
          <SelectCard
            key={t.val}
            title={fmtTanggal(t.val, t.dayofweek_string, t.month_string)}
            subtitle={t.isholidays ? 'Hari libur' : null}
            badge={sisa !== null ? (penuh ? 'PENUH' : `Sisa kuota: ${sisa}`) : null}
            onPress={
              penuh
                ? undefined
                : () =>
                    router.push({
                      pathname: '/input-nik',
                      params: {
                        ...params,
                        tanggal: t.val,
                        tglformat: fmtTanggal(t.val, t.dayofweek_string, t.month_string),
                      },
                    })
            }
          />
        );
      })}
    </Screen>
  );
}
