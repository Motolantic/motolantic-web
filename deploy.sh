#!/usr/bin/env bash
set -euo pipefail

echo "========================================================"
echo "  MOTOLANTIC PRODUCTION DEPLOYMENT PIPELINE (GERBANG 2)"
echo "  PT Motolantic Teknologi Nusantara (Dalam Perencanaan)"
echo "========================================================"

TARGET="${1:-cloudflare}"

echo "[1/4] Memeriksa struktur file dan konfigurasi deterministik..."
test -f package.json
test -f src/lib/deterministic-engine.ts
test -f src/app/api/governance/route.ts

echo "[2/4] Menginstal dependensi produksi..."
npm install

echo "[3/4] Menjalankan pemeriksaan tipe TypeScript & build produksi Next.js..."
npm run build

if [ "$TARGET" = "cloudflare" ]; then
  echo "[4/4] Mendorong build ke Cloudflare Pages (motolantic-platform)..."
  npm run deploy:cloudflare
elif [ "$TARGET" = "vercel" ]; then
  echo "[4/4] Mendorong build ke Vercel Production..."
  npm run deploy:vercel
else
  echo "[4/4] Menjalankan server produksi mandiri di port 3000..."
  npm run start
fi
