#!/usr/bin/env bash
# Rebuilds the hero scrub videos + posters from the master render.
# Master = the APPROVED Seedance take (clean windshield — the other 1080p take
# renders a phantom vinyl roll clipping through the glass; never use it).
set -euo pipefail
cd "$(dirname "$0")/.."

M=assets/raw/wrap-install-master.mp4

# Trim: measured motion (consecutive-frame MAD at 320x180) runs frames ~4..81
# of 121; everything after ~85 is a static hold that would waste 30% of the
# scrub distance. Keep 0..84 -> 85 source frames.
T=3.541667

# The clip is only ever SCRUBBED, never played, so fps matters as scroll
# granularity, not smoothness: 18fps -> ~64 frames over ~1600px of travel is
# ~25px of scroll per frame. -g 1 (all-keyframe) is load-bearing: without it,
# seeks land on the nearest keyframe and the scrub visibly snaps.
enc() { ffmpeg -y -v error -i "$M" -t $T -an \
  -vf "fps=18,scale=$1:flags=lanczos" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -g 1 -keyint_min 1 -bf 0 -sc_threshold 0 -crf "$2" -preset veryslow \
  -movflags +faststart "$3"; }

enc 1440:810 24 public/video/wrap-install.mp4
enc 854:480  25 public/video/wrap-install-sm.mp4

# Posters come from the SHIPPED encode's own first/last frames so the
# poster->video handoff is pixel-identical (no pop).
N=$(ffprobe -v error -select_streams v:0 -count_frames \
    -show_entries stream=nb_read_frames -of csv=p=0 public/video/wrap-install.mp4)
LAST=$((N - 1))
ffmpeg -y -v error -i public/video/wrap-install.mp4 -vf "select=eq(n\,0)"      -vframes 1 /tmp/wrap_blank.png
ffmpeg -y -v error -i public/video/wrap-install.mp4 -vf "select=eq(n\,$LAST)" -vframes 1 /tmp/wrap_wrapped.png
node scripts/webp.mjs /tmp/wrap_blank.png   public/images/wrap-hero-blank   1440 854
node scripts/webp.mjs /tmp/wrap_wrapped.png public/images/wrap-hero-wrapped 1440 854

echo "frames: $N  (all-keyframe check below should equal it)"
ffprobe -v error -select_streams v:0 -show_entries frame=key_frame -of csv=p=0 \
  public/video/wrap-install.mp4 | grep -c '1'
ls -la public/video/wrap-install*.mp4
