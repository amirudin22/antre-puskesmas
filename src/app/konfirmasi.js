import React, { useState } from 'react';
import { Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../components/Screen';
import StepHeader from '../components/StepHeader';
import InfoCard from '../components/InfoCard';
import BigButton from '../components/BigButton';
import { api } from '../api/client';
import { colors, fontSize, spacing } from '../theme';

export default function Konfirmasi() {
  const params = useLocalSearchParams();
  const {
    wilayah, idunitkerja, namaPuskesmas, idbppoli, poli, klaster,
    tanggal, tglformat, nik, idtypepasien, kodekartu,
  } = params;
  const pasien = JSON.parse(params.pasien || '{}');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const daftar = async () => {
    setError('');
    setLoading(true);
    try {
      const arrdata = {
        idunitkerja,
        idunitkerjaasal: idunitkerja,
        unitkerja: namaPuskesmas,
        wilayah,
        NIK: nik,
        NAMA_LGKP: pasien.NAMA_LGKP || '',
        ALAMAT: pasien.ALAMAT || '',
        NO_TLP: pasien.NO_TLP || '',
        TGL_LAHIR: pasien.TGL_LAHIR || '',
        JENIS_KELAMIN: pasien.JENIS_KELAMIN || '',
        kodekartu: kodekartu || '',
        NORUJUKAN: '',
        pasienkode: pasien.pasienkode || '',
        statusnik: pasien.statusnik ?? 0,
        idtypepasien: idtypepasien || '1',
        idbppoli,
        poli,
        klaster,
        tanggal,
        tglformat,
        data_details: '',
      };
      const hasil = await api.daftar(arrdata);
      router.push({ pathname: '/sukses', params: { hasil: JSON.stringify(hasil) } });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <StepHeader
        step={8}
        total={8}
        title="Konfirmasi"
        subtitle="Periksa lagi sebelum daftar"
      />
      <InfoCard
        title="Rencana Kunjungan"
        rows={[
          { label: 'Puskesmas', value: namaPuskesmas },
          { label: 'Poli', value: poli },
          { label: 'Tanggal', value: tglformat },
        ]}
      />
      <InfoCard
        title="Data Pasien"
        rows={[
          { label: 'Nama', value: pasien.NAMA_LGKP },
          { label: 'NIK', value: nik },
          { label: 'Pembayaran', value: idtypepasien === '2' ? 'BPJS Kesehatan' : 'Umum' },
        ]}
      />
      {error ? (
        <Text style={{ color: colors.danger, fontSize: fontSize.body, marginVertical: 8 }}>{error}</Text>
      ) : null}
      {loading ? (
        <Text style={{ fontSize: fontSize.body, color: colors.muted, marginTop: spacing.sm }}>
          Mendaftarkan antrean…
        </Text>
      ) : null}
      <BigButton title="✅  Ya, Daftarkan" variant="success" onPress={daftar} loading={loading} />
    </Screen>
  );
}
