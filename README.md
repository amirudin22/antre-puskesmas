# Antre Puskesmas

Aplikasi pendaftaran antrean puskesmas Surabaya — frontend mobile untuk
API eHealth Surabaya via backend proxy. Mobile-first, UI dirancang untuk
orang gaptek: font besar, tombol raksasa, satu aksi per layar.

## Arsitektur

```
HP (Expo) → https://ehealth-achmad-amirudin-s-projects.vercel.app → ehealth.surabaya.go.id
```

Backend: https://github.com/amirudin22/ehealth-proxy

> **PENTING:** Matikan *Deployment Protection* di dashboard Vercel
> (Project → Settings → Deployment Protection), kalau tidak API meminta
> login Vercel dan aplikasi tidak bisa mengaksesnya.

## Alur layar

1. Beranda — Daftar Baru / Batalkan Antrean
2. Pilih Wilayah (Barat/Timur/Utara/Selatan/Pusat)
3. Pilih Puskesmas (+ pencarian)
4. Pilih Poli (dengan sisa kuota)
5. Pilih Tanggal (tanggal asli + sisa kuota per tanggal)
6. Input NIK (16 digit)
7. Data Pasien (otomatis / isi manual)
8. Pembayaran (BPJS / Umum)
9. Konfirmasi → Sukses (nomor antrean raksasa)

Alur batal: kode antrean → konfirmasi → hasil.

## Jalankan

```bash
npm install
npx expo start
```

Scan QR dengan aplikasi **Expo Go** di HP.

## Build APK (EAS)

```bash
npx eas-cli@latest build --platform android --profile preview
```

APK di-build di cloud EAS — tidak perlu Android Studio lokal.
