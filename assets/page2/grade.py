# Hero 2 (Summit) photo grade: page2Assets/background.jpg (Katie Lowe, 4096x3072) -> page2Assets/background-graded.webp.
# Same size and framing as the original, so ridge-mask.png still lines up (no re-trace).
# Cleans the phone-camera noise in the dark sand, lifts only the shadows (the sky keeps its contrast), adds a little
# colour and sharpens. Run from the repo root: python assets/page2/grade.py
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps

SRC = "assets/page2/page2Assets/background.jpg"
OUT = "assets/page2/page2Assets/background-graded.webp"

im = Image.open(SRC).convert("RGB")
# noise: a small median takes out the colour speckle without smearing the ridge line
im = im.filter(ImageFilter.MedianFilter(5))

# shadow lift, through a mask of the dark areas: the sand and dunes brighten, the sunset sky is left alone
lifted = im.point([round(255 * ((v / 255) ** 0.62)) for v in range(256)] * 3)
dark = ImageOps.invert(ImageOps.grayscale(im)).filter(ImageFilter.GaussianBlur(24))
dark = dark.point(lambda v: max(0, min(255, round((v - 110) * 2.2))))  # only what's clearly dark
im = Image.composite(lifted, im, dark)

# a touch of midtone contrast and colour, then crisp it up
im = im.point([min(255, max(0, round((v - 128) * 1.06 + 128))) for v in range(256)] * 3)
im = ImageEnhance.Color(im).enhance(1.15)
im = im.filter(ImageFilter.UnsharpMask(radius=2.2, percent=70, threshold=3))
im.save(OUT, "WEBP", quality=82, method=6)
print(im.size)
