#!/bin/bash

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null
then
    echo "ffmpeg could not be found. Please install it first."
    exit
fi

# Create directories for converted files
mkdir -p webm_output
mkdir -p mp3_output

# Loop through all .wav files in the current directory
for file in *.wav; do
  if [ -f "$file" ]; then
    # Get base filename without extension
    base="${file%.wav}"

    # Convert to WebM
    ffmpeg -i "$file" -c:a libopus -b:a 128k "webm_output/${base}.webm"

    # Convert to MP3
    ffmpeg -i "$file" -codec:a libmp3lame -qscale:a 2 "mp3_output/${base}.mp3"
  else
    echo "No .wav files found."
  fi
done

echo "Conversion completed."
