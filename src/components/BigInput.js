import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, fontSize, spacing, radius } from '../theme';

// Input besar: label SELALU di atas (jangan placeholder saja), font 21.
export default function BigInput({
  label,
  hint,
  error,
  ...props
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#9E9E9E"
        {...props}
      />
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  label: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    fontSize: fontSize.big,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    backgroundColor: colors.white,
    minHeight: 60,
  },
  inputError: { borderColor: colors.danger },
  hint: { fontSize: fontSize.small, color: colors.muted, marginTop: 6 },
  error: { fontSize: fontSize.small, color: colors.danger, marginTop: 6, fontWeight: '700' },
});
