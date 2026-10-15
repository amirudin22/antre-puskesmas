import React from 'react';
import { router } from 'expo-router';
import Screen from '../components/Screen';
import StepHeader from '../components/StepHeader';
import SelectCard from '../components/SelectCard';
import { WILAYAH } from '../data/puskesmas';

const EMOJI = { BARAT: '🌅', TIMUR: '🌄', UTARA: '⚓', SELATAN: '🏘️', PUSAT: '🏛️' };

export default function PilihWilayah() {
  return (
    <Screen>
      <StepHeader
        step={1}
        total={8}
        title="Pilih Wilayah"
        subtitle="Puskesmas ada di wilayah mana?"
      />
      {WILAYAH.map((w) => (
        <SelectCard
          key={w}
          title={`${EMOJI[w] || '📍'} Surabaya ${w.charAt(0) + w.slice(1).toLowerCase()}`}
          onPress={() => router.push({ pathname: '/pilih-puskesmas', params: { wilayah: w } })}
        />
      ))}
    </Screen>
  );
}
