#!/usr/bin/env bash
# Public preview URL for local dev (FE + API + local MySQL). No signup required.
# Requires: npm run dev on port 8080, local MySQL with portal data.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CF="${CLOUDFLARED_BIN:-/tmp/cloudflared}"
PORT="${PORT:-8080}"

if [[ ! -x "$CF" ]]; then
  echo "Downloading cloudflared…"
  curl -fsSL -o "$CF" "https://github.com/cloudflare/cloudflared/releases/download/2024.8.3/cloudflared-linux-amd64"
  chmod +x "$CF"
fi

if ! curl -fsS "http://127.0.0.1:${PORT}/login" -o /dev/null; then
  echo "Start the app first: cd \"$ROOT\" && npm run dev"
  exit 1
fi

echo "Opening quick tunnel to http://127.0.0.1:${PORT} (keep this terminal open during the demo)."
export CLOUDFLARED_NO_UPDATE=true
exec "$CF" tunnel --url "http://127.0.0.1:${PORT}"
