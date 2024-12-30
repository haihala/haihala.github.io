
rm nums -fr

./gen_nums.py 100


ffmpeg -framerate 1 -pattern_type glob -i 'nums/*.png' \
  -c:v libx264 -pix_fmt yuv420p out.mp4
