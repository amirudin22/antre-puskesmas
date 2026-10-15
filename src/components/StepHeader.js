import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../theme';

// Header tiap layar: "Langkah 2 dari 6" + progress bar tebal + judul besar.
export default function StepHeader({ step, total, title, subtitle }) {
  const pct = total ? Math.round((step / total) * 100) : 0;
  return (
    <View style={styles.wrap}>
      {total ? (
        <Text style={styles.step}>
          Langkah {step} dari {total}
        </Text>
      ) : null}
      {total ? (
        <View style={styles.bar}>
          <View style={[styles.fill, { width: `${pct}%` }]} />
        </View>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  step: { fontSize: fontSize.small, color: colors.muted, marginBottom: 6 },
  bar: {
    height: 10,
    backgroundColor: '#E3EAF2',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  fill: { height: 10, backgroundColor: colors.primary, borderRadius: 5 },
  title: { fontSize: fontSize.hero, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: fontSize.body, color: colors.muted, marginTop: 6 },
});
