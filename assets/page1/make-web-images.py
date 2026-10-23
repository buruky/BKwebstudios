# Builds hero 1's web images from page1Assets/buruk-flash.jpg (the original flash photo).
# Run from the repo root: python assets/page1/make-web-images.py
# (buruk-flash-cutout.png and space-needle-cutout.png are kept for later; neither is used now.)
from PIL import Image, ImageChops, ImageFilter
import os

SRC = "assets/page1/page1Assets"
OUT = os.path.join(SRC, "web")
PAGE = (600, 0, 1716, 2576)  # the whole photo, with the "Event Center" sign cropped off the left

os.makedirs(OUT, exist_ok=True)
photo = Image.open(os.path.join(SRC, "buruk-flash.jpg")).convert("RGB")
# The photo's own film grain is most of its weight; smooth it here, the page lays its grain back on top.
page = photo.crop(PAGE).filter(ImageFilter.MedianFilter(5)).resize((760, 1754), Image.LANCZOS)
# Pull the night sky down to true black, so it lands on the page colour (#1a1614) with no visible seam.
BLACK_POINT = 58
page = page.point(lambda v: max(0, v - BLACK_POINT) * 255 // (255 - BLACK_POINT))

# The colour version's night is bluish; floor it at the page colour so it meets the page without an edge too.
page_color = ImageChops.lighter(page, Image.new("RGB", page.size, (26, 22, 20)))

for name, im in [("page-color", page_color)]:  # colour only since 2026-10-22 (the B&W version was dropped)
    path = os.path.join(OUT, name + ".webp")
    im.save(path, "WEBP", quality=62, method=6)
    print(name, im.size, os.path.getsize(path) // 1024, "KB")
