#!/bin/bash

# Exit if any command fails and enable debugging
set -e
set -x

echo $WEBHOOK_URL

# Fetch all the history for the branch
git fetch --depth=2 origin $GITHUB_REF:refs/remotes/origin/$GITHUB_REF

# Get a list of changed .json files
changed_files=$(git diff --name-only HEAD^ HEAD | grep '\.mdx$') || {
  echo "No JSON files changed or grep command failed."
  exit 0
}

# Check if changed_files is empty
if [ -z "$changed_files" ]; then
  echo "No JSON files have been changed."
  exit 0
fi

# Iterate over each file and send its content to the webhook
for file in $changed_files; do
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
