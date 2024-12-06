export default function initializeLoadingPageContent(responseMock) {
  document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".loading-page__content");

    if (!content) {
      console.error("Content not found");
      return;
    }

    const images = content.querySelectorAll("img");
    const totalImages = images.length;

    const textCommentElement = document.getElementById("text-comment");
    const textSubheadingElement = document.getElementById("text-subheading");

    document.fonts.load('1rem "Onest"').then(() => {
      if (textCommentElement && textSubheadingElement) {
        textCommentElement.textContent = responseMock.commentText;
        textCommentElement.classList.remove("hidden");
        textSubheadingElement.textContent = responseMock.subheading;
        textSubheadingElement.classList.remove("hidden");
      }
    });

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
        onImageLoad();
      } else {
        img.onload = onImageLoad;
        img.onerror = onImageLoad;
      }
    });
  });
}
