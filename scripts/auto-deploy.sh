#!/bin/bash

# Auto-Deploy Script - Compile, Deploy, Verify

set -e

echo "🔨 BUILD..."
npm run build > /dev/null 2>&1 && echo "✅ Build OK" || (echo "❌ Build failed"; exit 1)

echo "🚀 DEPLOYING..."
vercel --prod --yes > /tmp/vercel-deploy.log 2>&1
if grep -q "Deployment.*ready" /tmp/vercel-deploy.log; then
  echo "✅ Deployment OK"
else
  echo "❌ Deployment failed"
  cat /tmp/vercel-deploy.log
  exit 1
fi

echo "⏳ Waiting for production..."
sleep 3

echo "🔍 VERIFY..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://sm-depannage59.fr)
if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Site accessible (HTTP $HTTP_CODE)"
else
  echo "❌ Site error (HTTP $HTTP_CODE)"
  exit 1
fi

echo "📝 GIT COMMIT..."
if [ -n "$1" ]; then
  COMMIT_MSG="$1"
else
  COMMIT_MSG="Auto-update: $(date '+%Y-%m-%d %H:%M')"
fi

git add -A
git commit -m "$COMMIT_MSG" > /dev/null 2>&1 || echo "ℹ️ Nothing to commit"

echo ""
echo "✨ DONE! 🎉"
echo "🌐 https://sm-depannage59.fr"
