# Builds hero 5's web image from page5Assets/bust-cutout.png.
# The cutout came from met-248579-athlete.jpg (The Met, "Marble head of an athlete", Open Access / public domain):
# background removed with rembg (isnet-general-use) at 2597px tall, then cropped above the display stand.
# Run from the repo root: python assets/page5/make-web-images.py
from PIL import Image, ImageEnhance, ImageOps
import os

SRC = "assets/page5/page5Assets"
OUT = os.path.join(SRC, "web")
os.makedirs(OUT, exist_ok=True)

cut = Image.open(os.path.join(SRC, "bust-cutout.png")).convert("RGBA")
alpha = cut.getchannel("A")
# Greyscale like the reference deck, with the contrast pushed so the carving reads at giant size.
grey = ImageOps.grayscale(cut.convert("RGB"))
grey = ImageEnhance.Contrast(grey).enhance(1.25)
bust = Image.merge("RGBA", (grey, grey, grey, alpha))
bust.thumbnail((1600, 2000), Image.LANCZOS)

path = os.path.join(OUT, "bust.webp")
bust.save(path, "WEBP", quality=74, method=6)
print("bust", bust.size, os.path.getsize(path) // 1024, "KB")

# Stone texture for the torn strip behind the headline: a band of Herakles' curls (met-250678-herakles.jpg, The Met,
# Open Access), greyscale and darkened so it sits on the dune page.
stone = Image.open(os.path.join(SRC, "met-250678-herakles.jpg")).convert("L")
w, h = stone.size
stone = stone.crop((int(w * 0.30), int(h * 0.20), int(w * 0.72), int(h * 0.34)))
stone = ImageEnhance.Contrast(stone).enhance(1.6).point(lambda v: v * 0.62)
stone = stone.resize((1600, round(1600 * stone.height / stone.width)), Image.LANCZOS)
path = os.path.join(OUT, "stone.webp")
stone.save(path, "WEBP", quality=60, method=6)
print("stone", stone.size, os.path.getsize(path) // 1024, "KB")
