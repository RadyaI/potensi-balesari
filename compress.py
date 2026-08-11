import subprocess
import shutil
from pathlib import Path
from PIL import Image

# ====== KONFIGURASI ======
TARGET_DIR = "public/images"   # folder yang mau di-compress langsung
BACKUP = True                   # True = simpan backup asli ke public/images_backup dulu (lebih aman)
IMAGE_QUALITY = 75
IMAGE_MAX_WIDTH = 1600
VIDEO_CRF = 28
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp"}
VIDEO_EXT = {".mp4", ".mov", ".mkv"}
# ==========================


def compress_image_inplace(path: Path):
    img = Image.open(path)

    if img.mode in ("RGBA", "P") and path.suffix.lower() in {".jpg", ".jpeg"}:
        img = img.convert("RGB")

    if IMAGE_MAX_WIDTH and img.width > IMAGE_MAX_WIDTH:
        ratio = IMAGE_MAX_WIDTH / img.width
        new_size = (IMAGE_MAX_WIDTH, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    save_kwargs = {"optimize": True}
    if path.suffix.lower() in {".jpg", ".jpeg"}:
        save_kwargs["quality"] = IMAGE_QUALITY
    elif path.suffix.lower() == ".webp":
        save_kwargs["quality"] = IMAGE_QUALITY
    elif path.suffix.lower() == ".png":
        save_kwargs["compress_level"] = 9

    img.save(path, **save_kwargs)


def compress_video_inplace(path: Path):
    temp_out = path.with_suffix(".tmp" + path.suffix)

    subprocess.run(
        [
            "ffmpeg", "-y",
            "-i", str(path),
            "-vcodec", "libx264",
            "-crf", str(VIDEO_CRF),
            "-preset", "medium",
            "-acodec", "aac",
            "-b:a", "128k",
            str(temp_out),
        ],
        check=True,
    )

    # replace file asli dengan hasil compress
    temp_out.replace(path)


def main():
    target = Path(TARGET_DIR)

    if not target.exists():
        print(f"Folder '{TARGET_DIR}' gak ketemu.")
        return

    if BACKUP:
        backup_dir = target.parent / (target.name + "_backup")
        if not backup_dir.exists():
            shutil.copytree(target, backup_dir)
            print(f"[BACKUP] File asli disalin ke: {backup_dir}\n")
        else:
            print(f"[BACKUP] Folder backup udah ada, skip backup: {backup_dir}\n")

    for file in target.iterdir():
        if not file.is_file():
            continue

        ext = file.suffix.lower()
        before = file.stat().st_size / 1024

        try:
            if ext in IMAGE_EXT:
                compress_image_inplace(file)
                after = file.stat().st_size / 1024
                print(f"[IMG]  {file.name}: {before:.0f}KB -> {after:.0f}KB")

            elif ext in VIDEO_EXT:
                compress_video_inplace(file)
                after = file.stat().st_size / 1024
                print(f"[VID]  {file.name}: {before:.0f}KB -> {after:.0f}KB")

            else:
                print(f"[SKIP] {file.name}")

        except Exception as e:
            print(f"[ERROR] {file.name}: {e}")


if __name__ == "__main__":
    main()