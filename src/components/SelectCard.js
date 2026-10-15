import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, fontSize, spacing, radius } from '../theme';

// Kartu pilihan besar. Status terpilih: border tebal + latar biru muda + ✓.
export default function SelectCard({ title, subtitle, badge, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.row}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          {badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ) : null}
        </View>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected ? <Text style={styles.check}>✓</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    elevation: 2,
  },
  selected: { borderColor: colors.primary, backgroundColor: '#E8F1FC', borderWidth: 3 },
  row: { flexDirection: 'row', alignItems: 'center' },
  textWrap: { flex: 1 },
  title: { fontSize: fontSize.big, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: fontSize.small, color: colors.muted, marginTop: 4 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.success,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  badgeText: { color: colors.white, fontSize: fontSize.small, fontWeight: '700' },
  radio: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  radioSelected: { borderColor: colors.primary, backgroundColor: colors.primary },
  check: { color: colors.white, fontSize: 20, fontWeight: '800' },
});
