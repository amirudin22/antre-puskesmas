import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { colors, fontSize, spacing } from '../theme';

// Pembungkus tiap layar: safe area + scroll + tombol kembali besar.
export default function Screen({ children, showBack = true, loading = false }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left', 'right']}>
      {showBack ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
      ) : null}
      <ScrollView
        contentContainerStyle={styles.body}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Mengambil data…</Text>
          </View>
        ) : (
          children
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  back: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  backText: { fontSize: fontSize.body, fontWeight: '700', color: colors.primary },
  body: { padding: spacing.md, paddingBottom: spacing.xl, flexGrow: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  loadingText: { fontSize: fontSize.body, color: colors.muted, marginTop: spacing.md },
});
