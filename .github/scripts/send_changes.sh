#!/bin/bash

# Exit if any command fails and enable debugging
set -e
set -x

echo $WEBHOOK_URL

# Ensure FILE_TYPE is set
if [ -z "$FILE_TYPE" ]; then
  echo "FILE_TYPE variable is not set. Please provide a file extension (e.g., 'mdx', 'json')."
  exit 1
fi

# Fetch all history for the branch
git fetch --depth=2 origin $GITHUB_REF:refs/remotes/origin/$GITHUB_REF

# Create or update cache index file
cache_file=".file_cache_$FILE_TYPE.txt"
if [ ! -f "$cache_file" ]; then
  # First run: index all files with the specified extension and send all of them
  find . -type f -name "*.$FILE_TYPE" > "$cache_file"
  all_files=$(cat "$cache_file")
else
  # Not the first run: identify new or modified files
  all_files=$(find . -type f -name "*.$FILE_TYPE")
  changed_files=$(git diff --name-only HEAD^ HEAD | grep "\.$FILE_TYPE$" || true)
fi

# Check if there are any new or modified files to send
if [ -z "$changed_files" ] && [ -z "$all_files" ]; then
  echo "No new or modified .$FILE_TYPE files to send."
  exit 0
fi

# Update cache to include any newly added files
if [ -n "$changed_files" ]; then
  # Merge new/modified files with the cache
  printf "%s\n" "$changed_files" >> "$cache_file"
  # Remove duplicates in cache file
  sort -u -o "$cache_file" "$cache_file"
fi

# Choose files to send: first run sends all, subsequent runs send only changed files
files_to_send=${changed_files:-$all_files}

# Iterate over each file and send its content to the webhook
for file in $files_to_send; do
  if [ ! -f "$file" ]; then
    echo "The file $file does not exist or has been deleted."
    continue
  fi

  # Prepare the JSON payload by reading file content into jq
  payload=$(jq -Rs --arg fn "$file" '{filename: $fn, content: .}' "$file")

  # Write the payload to a temporary file
  tmpfile=$(mktemp /tmp/payload.XXXXXX)
  echo "$payload" > "$tmpfile"

  # Send the JSON content to the webhook and capture the response
  response=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $WEBHOOK_KEY" -d @"$tmpfile" "$WEBHOOK_URL")
  rm "$tmpfile"
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')

  # Check the response status code
  if [ "$http_code" -ne 200 ]; then
    echo "Failed to send data for $file to the webhook, server responded with status code: $http_code"
    echo "Response body: $body"
    exit 1
  else
    echo "Successfully sent data for $file to the webhook."
    echo "Response body: $body"
  fi
done
