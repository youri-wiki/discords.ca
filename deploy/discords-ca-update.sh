#!/bin/sh
set -eu

APP_DIR=/opt/discords-ca
SOURCE_DIR=/opt/discords-ca-src
DEPLOYED_REVISION_FILE="$APP_DIR/.deployed-revision"

cd "$SOURCE_DIR"
git fetch origin main
remote_revision=$(git rev-parse origin/main)
deployed_revision=$(cat "$DEPLOYED_REVISION_FILE" 2>/dev/null || true)

if [ "$remote_revision" = "$deployed_revision" ]; then
  exit 0
fi

if cd "$APP_DIR" && docker compose -f compose.production.yml pull; then
  docker compose -f compose.production.yml up -d --remove-orphans
else
  cd "$SOURCE_DIR"
  git switch --detach "$remote_revision"
  docker build -t ghcr.io/youri-wiki/discords.ca:latest .
  cd "$APP_DIR"
  docker compose -f compose.production.yml up -d --force-recreate --remove-orphans
fi

printf '%s\n' "$remote_revision" > "$DEPLOYED_REVISION_FILE"
docker image prune -f
