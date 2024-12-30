#!/usr/bin/env python

import os
import sys
from PIL import Image, ImageDraw, ImageFont

TARGET = f'{os.getcwd()}/nums'

if not os.path.exists(TARGET):
    os.mkdir(TARGET)

# You may need to change this, just needs a font
font_path = '/usr/share/fonts/liberation-sans/LiberationSans-Regular.ttf'

W, H = (1280, 720)  # image size
background = (0, 164, 201)  # Blue
fontsize = 512
font = ImageFont.truetype(font_path, fontsize)

for num in range(int(sys.argv[1])):
    image = Image.new('RGBA', (W, H), background)
    draw = ImageDraw.Draw(image)

    txt = str(num)  # text to render
    _, _, w, h = font.getbbox(txt)

    draw.text(((W-w)/2, (H-h)/2), txt, fill='white', font=font)

    image.save(f'{TARGET}/{num:02d}.png')
