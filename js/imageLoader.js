export default function initializeImageLoader() {
  document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".loading-page__content");

    if (!content) {
      console.error("Content not found");
      return;
    }

    const images = content.querySelectorAll("img");
    const totalImages = images.length;

    if (totalImages === 0) {
      console.warn("No images found, showing content immediately.");
      content.classList.add("visible");
      return;
    }

    let loadedImagesCount = 0;

    const onImageLoad = () => {
      loadedImagesCount++;
      if (loadedImagesCount === totalImages) {
        content.classList.add("visible");
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        onImageLoad(); // Обработать уже загруженные изображения
      } else {
        img.onload = onImageLoad;
        img.onerror = onImageLoad;
      }
    });
  });
}
