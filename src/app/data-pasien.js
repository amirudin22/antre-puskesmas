import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../components/Screen';
import StepHeader from '../components/StepHeader';
import InfoCard from '../components/InfoCard';
import BigInput from '../components/BigInput';
import BigButton from '../components/BigButton';
import SelectCard from '../components/SelectCard';
import { colors, fontSize, spacing } from '../theme';

function TglLahirInput({ value, onChange }) {
  // value: {d, m, y}
  const set = (k) => (t) => onChange({ ...value, [k]: t.replace(/\D/g, '') });
  return (
    <View>
      <Text style={{ fontSize: fontSize.body, fontWeight: '700', marginBottom: 8 }}>
        Tanggal Lahir
      </Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <BigInput label="Tgl" placeholder="17" keyboardType="numeric" maxLength={2} value={value.d} onChangeText={set('d')} />
        </View>
        <View style={{ flex: 1 }}>
          <BigInput label="Bln" placeholder="08" keyboardType="numeric" maxLength={2} value={value.m} onChangeText={set('m')} />
        </View>
        <View style={{ flex: 1.4 }}>
          <BigInput label="Tahun" placeholder="1945" keyboardType="numeric" maxLength={4} value={value.y} onChangeText={set('y')} />
        </View>
      </View>
    </View>
  );
}

export default function DataPasien() {
  const params = useLocalSearchParams();
  const { nik } = params;
  const hasil = JSON.parse(params.hasil || '[]');
  const data = Array.isArray(hasil) ? hasil[0] : hasil;
  const ketemu = !!data;

  const [manual, setManual] = useState(!ketemu);
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telp, setTelp] = useState('');
  const [tgl, setTgl] = useState({ d: '', m: '', y: '' });
  const [jk, setJk] = useState('');
  const [error, setError] = useState('');

  const lanjut = (pasien) => {
    router.push({
      pathname: '/pilih-penjamin',
      params: { ...params, pasien: JSON.stringify(pasien) },
    });
  };

  const simpanManual = () => {
    if (!nama.trim()) return setError('Nama lengkap wajib diisi.');
    if (!tgl.d || !tgl.m || !tgl.y) return setError('Tanggal lahir wajib lengkap.');
    setError('');
    lanjut({
      NIK: nik,
      NAMA_LGKP: nama.trim().toUpperCase(),
      ALAMAT: alamat.trim().toUpperCase(),
      NO_TLP: telp.trim(),
      TGL_LAHIR: `${tgl.y}-${tgl.m.padStart(2, '0')}-${tgl.d.padStart(2, '0')}`,
      JENIS_KELAMIN: jk === 'L' ? 'Laki-laki' : 'Perempuan',
      pasienkode: '',
      statusnik: 0,
    });
  };

  return (
    <Screen>
      <StepHeader step={6} total={8} title="Data Pasien" subtitle={`NIK: ${nik}`} />

      {!manual && ketemu ? (
        <>
          <InfoCard
            title="Data ditemukan ✅"
            rows={[
              { label: 'Nama lengkap', value: data.NAMA_LGKP },
              { label: 'Alamat', value: data.ALAMAT },
              { label: 'Tanggal lahir', value: data.TGL_LAHIR },
              { label: 'Jenis kelamin', value: data.JENIS_KELAMIN },
            ]}
          />
          <BigButton title="Data Benar, Lanjut →" onPress={() => lanjut(data)} />
          <BigButton title="Isi Manual Saja" variant="secondary" onPress={() => setManual(true)} />
        </>
      ) : (
        <>
          {!ketemu ? (
            <Text style={{ fontSize: fontSize.body, color: colors.muted, marginBottom: spacing.md }}>
              Data tidak ditemukan di puskesmas. Isi manual ya:
            </Text>
          ) : null}
          <BigInput label="Nama lengkap (sesuai KTP)" placeholder="Contoh: Siti Aminah" value={nama} onChangeText={setNama} />
          <BigInput label="Alamat" placeholder="Contoh: Jl. Kenjeran 123" value={alamat} onChangeText={setAlamat} multiline />
          <BigInput label="No. HP / Telepon" placeholder="Contoh: 08123456789" keyboardType="phone-pad" value={telp} onChangeText={setTelp} />
          <TglLahirInput value={tgl} onChange={setTgl} />
          <Text style={{ fontSize: fontSize.body, fontWeight: '700', marginTop: spacing.sm, marginBottom: 8 }}>
            Jenis Kelamin
          </Text>
          <SelectCard title="👨 Laki-laki" selected={jk === 'L'} onPress={() => setJk('L')} />
          <SelectCard title="👩 Perempuan" selected={jk === 'P'} onPress={() => setJk('P')} />
          {error ? <Text style={{ color: colors.danger, fontSize: fontSize.body, marginVertical: 8 }}>{error}</Text> : null}
          <BigButton title="Simpan & Lanjut →" onPress={simpanManual} />
        </>
      )}
    </Screen>
  );
}
