// Client untuk backend proxy eHealth (Vercel).
// GANTI BASE_URL dengan URL production Vercel kamu setelah deploy.
//
// PENTING: di dashboard Vercel, matikan "Deployment Protection"
// (Project → Settings → Deployment Protection), kalau tidak API
// meminta login Vercel dan aplikasi tidak bisa mengaksesnya.

export const BASE_URL = 'https://ehealth-achmad-amirudin-s-projects.vercel.app';

async function req(path, { method = 'GET', body } = {}) {
  const res = await fetch(BASE_URL + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error('Server tidak merespons dengan benar. Coba lagi.');
  }
  if (!json.ok) throw new Error(json.error || 'Terjadi kesalahan. Coba lagi.');
  return json.data;
}

export const api = {
  health: () => req('/api/health'),
  poli: () => req('/api/poli'),
  tanggal: (idunitkerja, idbppoli) =>
    req(`/api/tanggal?idunitkerja=${idunitkerja}&idbppoli=${idbppoli}`),
  cekNik: (idunitkerja, NIK) =>
    req('/api/cek-nik', { method: 'POST', body: { idunitkerja, NIK } }),
  cekBpjs: (idunitkerja, NIK) =>
    req('/api/cek-bpjs', { method: 'POST', body: { idunitkerja, NIK } }),
  daftar: (arrdata) => req('/api/daftar', { method: 'POST', body: arrdata }),
  batal: (id) => req(`/api/batal?id=${encodeURIComponent(id)}`),
  master: (jenis) => req(`/api/master?jenis=${jenis}`),
  refresh: () => req('/api/refresh', { method: 'POST' }),
};
