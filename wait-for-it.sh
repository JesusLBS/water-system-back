#!/usr/bin/env sh

# Wait for a service to become available

set -e

HOST="$1"
PORT="$2"
shift 2

while ! nc -z "$HOST" "$PORT"; do
  echo "Waiting for $HOST:$PORT to become available..."
  sleep 1
done

echo "$HOST:$PORT is available"
exec "$@"
