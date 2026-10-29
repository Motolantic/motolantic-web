# Motolantic Official Platform (`motolantic-web`)

**Tagline Utama:** *Global Parts. Local Confidence.* ("Suku cadang dunia. Kepastian untuk mobilmu.")  
**Pesan Pendukung:** *Keahlian bengkel. Jangkauan global.*  
**Semangat Merek:** *"Mobilmu boleh langka. Jalan keluarnya harus ada."*  
**Penggagas & Pendiri:** Tydi Humaini (Ted / Tedy)  
**Nama Perusahaan (Dalam Perencanaan):** PT Motolantic Teknologi Nusantara  
**Asisten Operasional Internal:** MotoSol  

## Prinsip Arsitektur Inti
1. **Kejujuran Epistemik (Anti-Halusinasi):** Dilarang menampilkan persentase kecocokan karangan. Sistem hanya menggunakan 3 status kecocokan resmi berbasis bukti:
   - `Terkonfirmasi berdasarkan bukti`
   - `Indikasi cocok tetapi perlu verifikasi tambahan`
   - `Belum dapat dipastikan`
2. **Prinsip Deterministik:** *"AI merekomendasikan. Kode menghitung. Database mencatat."* Seluruh perhitungan biaya (`calculateDeterministicQuote`), keekonomian unit pilot (`calculatePilotUnitEconomics`), dan penegakan hak akses RBAC/MAGS (`enforceMAGSPermission`) dieksekusi secara deterministik oleh kode TypeScript.
3. **Satu Platform, Empat Antarmuka Peran (RBAC):** Pelanggan, Staf Operasional (+MotoSol), Teknisi Pemeriksa, dan Pemilik/Eksekutif (+MAGS).

## Panduan Deployment Produksi
- **Cloudflare Pages (Rekomendasi Evaluasi Startup Global):**
  ```bash
  chmod +x deploy.sh
  ./deploy.sh cloudflare
  ```
- **Vercel Production:**
  ```bash
  ./deploy.sh vercel
  ```
- **Docker Container / Self-Hosted Server:**
  ```bash
  docker build -t motolantic-platform:1.0.0 .
  docker run -p 3000:3000 motolantic-platform:1.0.0
  ```
