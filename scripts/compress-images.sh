#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-public/assets}"
MAX_DIMENSION="${MAX_DIMENSION:-1920}"
JPEG_QUALITY="${JPEG_QUALITY:-80}"
MIN_BYTES="${MIN_BYTES:-200000}"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Target directory $TARGET_DIR does not exist" >&2
  exit 1
fi

if ! command -v sips >/dev/null 2>&1; then
  echo "sips CLI is required but was not found" >&2
  exit 1
fi

format_bytes() {
  local bytes="$1"
  if [ "$bytes" -lt 1024 ]; then
    printf "%sB" "$bytes"
  elif [ "$bytes" -lt 1048576 ]; then
    printf "%.1fKB" "$(awk -v b="$bytes" 'BEGIN { printf "%.1f", b/1024 }')"
  elif [ "$bytes" -lt 1073741824 ]; then
    printf "%.2fMB" "$(awk -v b="$bytes" 'BEGIN { printf "%.2f", b/1048576 }')"
  else
    printf "%.2fGB" "$(awk -v b="$bytes" 'BEGIN { printf "%.2f", b/1073741824 }')"
  fi
}

TOTAL_BEFORE=0
TOTAL_AFTER=0
PROCESSED=0
SKIPPED=0

while IFS= read -r -d '' file; do
  before=$(stat -f%z "$file" 2>/dev/null || stat -c %s "$file")
  if [ "$before" -lt "$MIN_BYTES" ]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  sips -Z "$MAX_DIMENSION" "$file" >/dev/null

  ext="${file##*.}"
  lower=$(printf '%s' "$ext" | tr '[:upper:]' '[:lower:]')
  if [ "$lower" = "jpg" ] || [ "$lower" = "jpeg" ]; then
    sips --setProperty formatOptions "$JPEG_QUALITY" "$file" >/dev/null
  fi

  after=$(stat -f%z "$file" 2>/dev/null || stat -c %s "$file")

  if [ "$after" -lt "$before" ]; then
    diff=$((before - after))
    printf "✔ %s: %s → %s (-%s)\n" "$file" "$(format_bytes "$before")" "$(format_bytes "$after")" "$(format_bytes "$diff")"
  else
    printf "≈ %s: no savings (still %s)\n" "$file" "$(format_bytes "$after")"
  fi

  TOTAL_BEFORE=$((TOTAL_BEFORE + before))
  TOTAL_AFTER=$((TOTAL_AFTER + after))
  PROCESSED=$((PROCESSED + 1))

done < <(find "$TARGET_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0)

SAVED=$((TOTAL_BEFORE - TOTAL_AFTER))

printf "\nProcessed: %d files\n" "$PROCESSED"
printf "Skipped:   %d files (smaller than %s)\n" "$SKIPPED" "$(format_bytes "$MIN_BYTES")"
printf "Total saved: %s\n" "$(format_bytes "$SAVED")"
printf "New total:  %s\n" "$(format_bytes "$TOTAL_AFTER")"
