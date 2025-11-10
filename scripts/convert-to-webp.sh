#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-public/assets}"
MAX_DIMENSION="${MAX_DIMENSION:-1600}"
QUALITY="${QUALITY:-70}"
BACKUP_DIR="${BACKUP_DIR:-.original_images}"
DRY_RUN="${DRY_RUN:-false}"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Target directory $TARGET_DIR does not exist" >&2
  exit 1
fi

command -v cwebp >/dev/null 2>&1 || {
  echo "cwebp is required but not installed" >&2
  exit 1
}
command -v sips >/dev/null 2>&1 || {
  echo "sips is required but not installed" >&2
  exit 1
}
command -v rg >/dev/null 2>&1 || {
  echo "ripgrep is required but not installed" >&2
  exit 1
}

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

get_dimensions() {
  local file="$1"
  local dims
  dims=$(sips -g pixelWidth -g pixelHeight "$file" 2>/dev/null | awk '/pixelWidth/ { w=$2 } /pixelHeight/ { h=$2 } END { printf "%s %s", w, h }')
  if [ -z "$dims" ]; then
    echo "0 0"
  else
    echo "$dims"
  fi
}

replace_in_files() {
  local search="$1"
  local replace="$2"
  local matches
  matches=$(rg -l --fixed-strings --glob '!.git/**' --glob '!node_modules/**' --glob '!scripts/convert-to-webp.sh' "$search" || true)
  if [ -z "$matches" ]; then
    return
  fi
  while IFS= read -r file; do
    [ -z "$file" ] && continue
    if [ "$DRY_RUN" = "true" ]; then
      printf "    ↳ would update %s\n" "$file"
    else
      perl -0pi -e "s|\Q$search\E|$replace|g" "$file"
    fi
  done <<< "$matches"
}

file_size() {
  local target="$1"
  if stat -f%z "$target" >/dev/null 2>&1; then
    stat -f%z "$target"
  else
    stat -c %s "$target"
  fi
}

process_file() {
  local file="$1"
  local before after diff
  local rel="${file#public/}"
  local assets_path="$rel"
  local webp_path="${file%.*}.webp"
  local assets_webp="${assets_path%.*}.webp"

  # Skip if WebP already exists
  if [ -f "$webp_path" ]; then
    printf "⏭ %s already has WebP variant, skipping\n" "$assets_path"
    return
  fi

  read -r width height < <(get_dimensions "$file")
  local needs_resize=false
  local resize_w=0
  local resize_h=0
  if [ "$width" -gt "$MAX_DIMENSION" ] || [ "$height" -gt "$MAX_DIMENSION" ]; then
    needs_resize=true
    if [ "$width" -ge "$height" ]; then
      resize_w="$MAX_DIMENSION"
      resize_h=0
    else
      resize_w=0
      resize_h="$MAX_DIMENSION"
    fi
  fi

  before=$(file_size "$file")

  if [ "$DRY_RUN" = "true" ]; then
    printf "• would convert %s -> %s\n" "$assets_path" "$assets_webp"
  else
    if [ "$needs_resize" = "true" ]; then
      cwebp -quiet -q "$QUALITY" -resize "$resize_w" "$resize_h" "$file" -o "$webp_path"
    else
      cwebp -quiet -q "$QUALITY" "$file" -o "$webp_path"
    fi
  fi

  after=$(file_size "$webp_path")

  if [ "$DRY_RUN" = "false" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$assets_path")"
    mv "$file" "$BACKUP_DIR/$assets_path"
  fi

  replace_in_files "$assets_path" "$assets_webp"
  replace_in_files "public/$assets_path" "public/$assets_webp"

  diff=$((before - after))
  printf "✔ %s: %s → %s (-%s)\n" "$assets_path" "$(format_bytes "$before")" "$(format_bytes "$after")" "$(format_bytes "$diff")"
  TOTAL_BEFORE=$((TOTAL_BEFORE + before))
  TOTAL_AFTER=$((TOTAL_AFTER + after))
  PROCESSED=$((PROCESSED + 1))
}

TOTAL_BEFORE=0
TOTAL_AFTER=0
PROCESSED=0

declare -a FILES=()
while IFS= read -r -d '' file; do
  FILES+=("$file")
done < <(find "$TARGET_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0)

if [ ${#FILES[@]} -eq 0 ]; then
  echo "No JPG/PNG files found under $TARGET_DIR"
else
  for file in "${FILES[@]}"; do
    [ -z "$file" ] && continue
    process_file "$file"
  done
fi

SAVED=$((TOTAL_BEFORE - TOTAL_AFTER))
printf "\nConverted: %d files\n" "$PROCESSED"
printf "Total saved vs originals: %s\n" "$(format_bytes "$SAVED")"
printf "Backups stored under: %s\n" "$BACKUP_DIR"
