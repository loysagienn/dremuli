#!/bin/bash

SCRIPT="$1"

if [ -z "$SCRIPT" ]; then
  echo "Usage: npm run migration -- <migration-name>"
  exit 1
fi

NODE_ENV=production node --env-file=.env "./dist/migrations/$SCRIPT.js"
