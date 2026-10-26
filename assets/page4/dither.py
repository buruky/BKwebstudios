# Hero 4 (Retro) screen picture: a 1-bit Atkinson dither (the MacPaint look) of page4Assets/seattle-skyline-cc0.jpg
# ("Mt Rainier (236988355)", Wikimedia Commons, CC0: downtown Seattle with Rainier behind).
# Run from the repo root: python assets/page4/dither.py assets/page4/page4Assets/seattle-skyline-cc0.jpg assets/page4/page4Assets/web/skyline-1bit.png 360
import sys
from PIL import Image, ImageOps, ImageEnhance
# Atkinson dither (MacPaint): spreads 6/8 of the error to 6 neighbours.
def atkinson(im):
    w, h = im.size; data = list(im.getdata()); px = [data[y*w:(y+1)*w] for y in range(h)]
    px = [[float(v) for v in row] for row in px]
    out = Image.new("1", (w, h))
    for y in range(h):
        for x in range(w):
            old = px[y][x]; new = 255 if old > 127 else 0
            out.putpixel((x, y), 1 if new else 0)
            err = (old - new) / 8
            for dx, dy in ((1,0),(2,0),(-1,1),(0,1),(1,1),(0,2)):
                if 0 <= x+dx < w and y+dy < h: px[y+dy][x+dx] += err
    return out
src, out, W = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = Image.open(src).convert("L")
im = ImageOps.autocontrast(ImageEnhance.Contrast(im).enhance(1.2), cutoff=1)
im = im.resize((W, round(W * im.height / im.width)), Image.LANCZOS)
# 1-bit -> the site's own two colours: dune for black, bone for white
bits = atkinson(im)
pal = Image.new("P", bits.size)
pal.putdata([1 if v else 0 for v in bits.convert("L").getdata()])  # index 0 = black, 1 = white
pal.putpalette([0x2a, 0x2f, 0x33, 0xf4, 0xef, 0xe8] + [0] * 762)
pal.save(out, optimize=True)
