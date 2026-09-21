#!/usr/bin/env bash
# Deploy DOAR pagina workshop pe Vercel (proiectul "hidook"), la adresa principală "/".
# Restul site-ului HiDook nu se urcă.
# Folosire: ./scripts/deploy-workshop.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/.workshop-dist"

cd "$ROOT"
npm run build

rm -rf "$DIST"
mkdir -p "$DIST/src/js" "$DIST/imagess" "$DIST/.vercel"

cp workshop.html              "$DIST/index.html"
cp workshop.html              "$DIST/workshop.html"
cp cookies.html               "$DIST/cookies.html"
cp src/output.css             "$DIST/src/output.css"
cp src/js/cookies.js          "$DIST/src/js/cookies.js"
cp src/js/components.js       "$DIST/src/js/components.js"
cp src/js/ticket-form.js      "$DIST/src/js/ticket-form.js"
cp imagess/workshop-hero.webp "$DIST/imagess/"
cp "imagess/SD - photo.jpg"   "$DIST/imagess/"
cp imagess/logo.png           "$DIST/imagess/"

# același proiect Vercel ca folderul principal
cp .vercel/project.json "$DIST/.vercel/project.json"

# site static, fără build pe Vercel
cat > "$DIST/vercel.json" <<'JSON'
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "buildCommand": "",
  "installCommand": "",
  "outputDirectory": "."
}
JSON

cd "$DIST"
npx -y vercel@latest deploy --prod --yes
