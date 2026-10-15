import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing, radius } from '../theme';

// Kartu ringkasan label + nilai besar (untuk konfirmasi data).
export default function InfoCard({ rows, title }) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {rows.map((r, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.label}>{r.label}</Text>
          <Text style={styles.value}>{r.value || '-'}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#D5DDE5',
  },
  title: {
    fontSize: fontSize.big,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: { marginBottom: spacing.sm },
  label: { fontSize: fontSize.small, color: colors.muted },
  value: { fontSize: fontSize.big, fontWeight: '700', color: colors.text, marginTop: 2 },
});
