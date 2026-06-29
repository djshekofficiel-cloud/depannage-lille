#!/bin/bash

echo "🔍 AUDIT LIGHTHOUSE EN COURS..."
echo ""

# Installer lighthouse si absent
if ! command -v lighthouse &> /dev/null; then
  npm install -g lighthouse
fi

# URLs à tester
URLS=(
  "http://localhost:3000"
  "http://localhost:3000/zones-intervention/lille"
  "http://localhost:3000/"
)

for url in "${URLS[@]}"; do
  echo "📊 Test: $url"
  lighthouse "$url" --output json --output-path /tmp/lighthouse-report.json --chrome-flags="--headless --no-sandbox" 2>/dev/null
  
  if [ -f /tmp/lighthouse-report.json ]; then
    SCORES=$(jq '.categories | {performance: .performance.score, accessibility: .accessibility.score, best_practices: .best-practices.score, seo: .seo.score, pwa: .pwa.score}' /tmp/lighthouse-report.json)
    echo "$SCORES" | jq . | sed 's/null/0/g' | sed 's/"//g' | sed 's/://g'
    echo ""
  fi
done

echo "✅ Audit complété"
