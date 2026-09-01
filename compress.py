import subprocess
from pathlib import Path
from PIL import Image
from pillow_heif import register_heif_opener

# Aktifkan dukungan HEIC/HEIF untuk Pillow
register_heif_opener()

# ====== KONFIGURASI ======
TARGET_DIR = "public/images/compress_dulu"
OUTPUT_DIR = "public/images/compress_hasil"

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

# Format target buat konversi gambar
FORMAT_MAP = {
    "1": None,       # biarin format asli
    "2": ".jpg",
    "3": ".png",
    "4": ".webp",
}
# ==========================


def compress_image(path: Path, output_dir: Path, overwrite: bool, target_format: str):
    """
    Compress gambar, dengan opsi convert format.
    Kalau target_format None: pertahankan format asli
    (kecuali HEIC/HEIF yang wajib dikonversi ke WebP).
    """
    original_ext = path.suffix.lower()
    img = Image.open(path)

    # Tentuin ekstensi output
    if target_format is not None:
        out_ext = target_format
    elif original_ext in {".heic", ".heif"}:
        out_ext = ".webp"
    else:
        out_ext = original_ext

    # Resize kalau kelewat lebar
    if IMAGE_MAX_WIDTH and img.width > IMAGE_MAX_WIDTH:
        ratio = IMAGE_MAX_WIDTH / img.width
        new_size = (
            IMAGE_MAX_WIDTH,
            int(img.height * ratio)
        )
        img = img.resize(new_size, Image.LANCZOS)

    # JPG gak support alpha channel / palette
    if out_ext in {".jpg", ".jpeg"} and img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    # WebP dari HEIC juga aman-in mode-nya
    if out_ext == ".webp" and img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")

    # Tentuin path output
    if overwrite:
        output_path = path.with_suffix(out_ext)
    else:
        output_path = output_dir / (path.stem + out_ext)

    # Setting compression per format
    save_kwargs = {"optimize": True}
    pillow_format = {
        ".jpg": "JPEG",
        ".jpeg": "JPEG",
        ".png": "PNG",
        ".webp": "WEBP",
    }[out_ext]

    if pillow_format in ("JPEG", "WEBP"):
        save_kwargs["quality"] = IMAGE_QUALITY
    if pillow_format == "WEBP":
        save_kwargs["method"] = 6
    if pillow_format == "PNG":
        save_kwargs["compress_level"] = 9

    img.save(output_path, pillow_format, **save_kwargs)

    # Kalau overwrite dan ekstensi berubah (misal heic->webp, atau convert format),
    # hapus file asli biar gak numpuk 2 file
    if overwrite and output_path != path:
        path.unlink()

    return output_path


def compress_video(path: Path, output_dir: Path, overwrite: bool):
    """
    Compress video pakai H.264 + AAC. Ekstensi video gak diubah.
    """
    if overwrite:
        temp_out = path.with_suffix(".tmp" + path.suffix)
        final_out = path
    else:
        temp_out = output_dir / (path.stem + ".tmp" + path.suffix)
        final_out = output_dir / path.name

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

    temp_out.replace(final_out)
    return final_out


def ask_mode():
    print("Mau di-compress gimana?")
    print("  1. Timpa langsung di TARGET_DIR")
    print("  2. Simpan hasilnya ke OUTPUT_DIR")
    choice = input("Pilih (1/2): ").strip()
    return choice == "1"  # True = overwrite


def ask_format():
    print("\nFormat gambar hasil compress mau gimana?")
    print("  1. Biarin format asli (HEIC/HEIF tetap jadi WebP)")
    print("  2. Convert semua ke JPG")
    print("  3. Convert semua ke PNG")
    print("  4. Convert semua ke WebP")
    choice = input("Pilih (1/2/3/4): ").strip()
    return FORMAT_MAP.get(choice, None)


def main():
    target = Path(TARGET_DIR)
    if not target.exists():
        print(f"Folder '{TARGET_DIR}' gak ketemu.")
        return

    overwrite = ask_mode()
    target_format = ask_format()

    output_dir = None
    if not overwrite:
        output_dir = Path(OUTPUT_DIR)
        output_dir.mkdir(parents=True, exist_ok=True)

    print()  # spasi biar rapi

    for file in target.iterdir():
        if not file.is_file():
            continue

        ext = file.suffix.lower()
        before = file.stat().st_size / 1024

        try:
            if ext in IMAGE_EXT:
                output_path = compress_image(file, output_dir, overwrite, target_format)
                after = output_path.stat().st_size / 1024
                print(
                    f"[IMG]  {file.name}: "
                    f"{before:.0f}KB -> {after:.0f}KB "
                    f"({output_path.name})"
                )

            elif ext in VIDEO_EXT:
                output_path = compress_video(file, output_dir, overwrite)
                after = output_path.stat().st_size / 1024
                print(
                    f"[VID]  {file.name}: "
                    f"{before:.0f}KB -> {after:.0f}KB "
                    f"({output_path.name})"
                )

            else:
                print(f"[SKIP] {file.name}")

        except Exception as e:
            print(f"[ERROR] {file.name}: {e}")


if __name__ == "__main__":
    main()