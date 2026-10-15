import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, fontSize, buttonHeight, radius } from '../theme';

// Tombol raksasa full-width. Satu-satunya tombol aksi di tiap layar.
export default function BigButton({
  title,
  onPress,
  variant = 'primary', // primary | secondary | danger | success
  disabled = false,
  loading = false,
}) {
  const bg =
    variant === 'primary'
      ? colors.primary
      : variant === 'danger'
        ? colors.danger
        : variant === 'success'
          ? colors.success
          : colors.white;
  const fg = variant === 'secondary' ? colors.primary : colors.white;
  const border =
    variant === 'secondary'
      ? { borderWidth: 2, borderColor: colors.primary }
      : null;

  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: bg }, border, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={fg} size="large" />
      ) : (
        <Text style={[styles.label, { color: fg }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: buttonHeight,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  label: { fontSize: fontSize.big, fontWeight: '700' },
  disabled: { opacity: 0.5 },
});
