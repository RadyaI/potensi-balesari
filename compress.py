import subprocess
import shutil
from pathlib import Path

from PIL import Image
from pillow_heif import register_heif_opener


# Aktifkan dukungan HEIC/HEIF untuk Pillow
register_heif_opener()


# ====== KONFIGURASI ======

TARGET_DIR = "public/images/compress_dulu"

BACKUP = True
IMAGE_QUALITY = 75
IMAGE_MAX_WIDTH = 1600

VIDEO_CRF = 28

IMAGE_EXT = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".heic",
    ".heif",
}

VIDEO_EXT = {
    ".mp4",
    ".mov",
    ".mkv",
}


# ==========================


def compress_image_inplace(path: Path):
    """
    Compress JPG/JPEG/PNG/WebP langsung pada file.
    HEIC/HEIF akan dikonversi menjadi WebP.
    """

    original_ext = path.suffix.lower()

    img = Image.open(path)

    # HEIC/HEIF → WebP
    if original_ext in {".heic", ".heif"}:

        # Resize jika terlalu lebar
        if IMAGE_MAX_WIDTH and img.width > IMAGE_MAX_WIDTH:
            ratio = IMAGE_MAX_WIDTH / img.width
            new_size = (
                IMAGE_MAX_WIDTH,
                int(img.height * ratio)
            )

            img = img.resize(new_size, Image.LANCZOS)

        # HEIC bisa punya mode yang tidak cocok untuk WebP
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGB")

        output_path = path.with_suffix(".webp")

        img.save(
            output_path,
            "WEBP",
            quality=IMAGE_QUALITY,
            method=6,
        )

        # Hapus HEIC asli setelah WebP berhasil dibuat
        path.unlink()

        return output_path

    # JPG/JPEG yang punya alpha/palette → RGB
    if img.mode in ("RGBA", "P") and original_ext in {".jpg", ".jpeg"}:
        img = img.convert("RGB")

    # Resize gambar
    if IMAGE_MAX_WIDTH and img.width > IMAGE_MAX_WIDTH:
        ratio = IMAGE_MAX_WIDTH / img.width

        new_size = (
            IMAGE_MAX_WIDTH,
            int(img.height * ratio)
        )

        img = img.resize(new_size, Image.LANCZOS)

    # Setting compression
    save_kwargs = {
        "optimize": True
    }

    if original_ext in {".jpg", ".jpeg"}:
        save_kwargs["quality"] = IMAGE_QUALITY

    elif original_ext == ".webp":
        save_kwargs["quality"] = IMAGE_QUALITY

    elif original_ext == ".png":
        save_kwargs["compress_level"] = 9

    img.save(path, **save_kwargs)

    return path


def compress_video_inplace(path: Path):
    """
    Compress video menggunakan H.264 + AAC.
    """

    temp_out = path.with_suffix(".tmp" + path.suffix)

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(path),

            "-vcodec",
            "libx264",

            "-crf",
            str(VIDEO_CRF),

            "-preset",
            "medium",

            "-acodec",
            "aac",

            "-b:a",
            "128k",

            str(temp_out),
        ],
        check=True,
    )

    # Replace file asli dengan hasil compression
    temp_out.replace(path)


def main():
    target = Path(TARGET_DIR)

    if not target.exists():
        print(f"Folder '{TARGET_DIR}' gak ketemu.")
        return

    # ===== BACKUP =====

    if BACKUP:
        backup_dir = target.parent / (target.name + "_backup")

        if not backup_dir.exists():
            shutil.copytree(target, backup_dir)

            print(
                f"[BACKUP] File asli disalin ke: "
                f"{backup_dir}\n"
            )

        else:
            print(
                f"[BACKUP] Folder backup udah ada, "
                f"skip backup: {backup_dir}\n"
            )

    # ===== COMPRESS =====

    for file in target.iterdir():

        if not file.is_file():
            continue

        ext = file.suffix.lower()

        before = file.stat().st_size / 1024

        try:

            # ==========================
            # IMAGE
            # ==========================

            if ext in IMAGE_EXT:

                output_path = compress_image_inplace(file)

                after = output_path.stat().st_size / 1024

                if ext in {".heic", ".heif"}:

                    print(
                        f"[HEIC → WEBP] "
                        f"{file.name}: "
                        f"{before:.0f}KB -> "
                        f"{after:.0f}KB "
                        f"({output_path.name})"
                    )

                else:

                    print(
                        f"[IMG]  "
                        f"{file.name}: "
                        f"{before:.0f}KB -> "
                        f"{after:.0f}KB"
                    )

            # ==========================
            # VIDEO
            # ==========================

            elif ext in VIDEO_EXT:

                compress_video_inplace(file)

                after = file.stat().st_size / 1024

                print(
                    f"[VID]  "
                    f"{file.name}: "
                    f"{before:.0f}KB -> "
                    f"{after:.0f}KB"
                )

            # ==========================
            # SKIP
            # ==========================

            else:

                print(
                    f"[SKIP] {file.name}"
                )

        except Exception as e:

            print(
                f"[ERROR] "
                f"{file.name}: {e}"
            )


if __name__ == "__main__":
    main()
