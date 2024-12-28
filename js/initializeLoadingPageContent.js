export default function initializeLoadingPageContent(textLoaderContent) {
  document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".loading-page__content");

    if (!content) {
      console.error("Content not found");
      return;
    }

    const images = content.querySelectorAll("img");
    const textCommentElement = document.getElementById("text-comment");
    const textSubheadingElement = document.getElementById("text-subheading");

    document.fonts.load('1rem "Onest"').then(() => {
      if (textCommentElement && textSubheadingElement) {
        textCommentElement.textContent = textLoaderContent.commentText;
        textCommentElement.classList.remove("hidden");
        textSubheadingElement.textContent = textLoaderContent.subheading;
        textSubheadingElement.classList.remove("hidden");
      }
    });

    if (images.length === 0) {
      console.warn("No images found, showing content immediately.");
      content.classList.add("visible");
      return;
    }

    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    const imageSources = Array.from(images).map((img) => img.src);

    Promise.all(imageSources.map(preloadImage))
      .then(() => {
        content.classList.add("visible");
        console.log("Все изображения успешно предзагружены.");
      })
      .catch((error) => {
        console.error("Ошибка при предзагрузке изображений:", error);
      });
  });
}
