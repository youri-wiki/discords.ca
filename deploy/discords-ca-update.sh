#!/bin/sh
set -eu

APP_DIR=/opt/discords-ca

cd "$APP_DIR"
docker compose -f compose.production.yml pull
docker compose -f compose.production.yml up -d --remove-orphans
docker image prune -f
