// import { initializeWebApp } from './webApp.js';
import initializeImageLoader from './imageLoader.js';
// import { fit } from './fit.js';
import { responseMock } from './api.js';

// initializeWebApp();
initializeImageLoader();

document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".loading-page__content");
  const images = content.querySelectorAll("img");
  const textCommentElement = document.getElementById("text-comment");
  const textSubheadingElement = document.getElementById("text-subheading");

  console.log("Найденные изображения:", images);
  console.log("Общее количество изображений:", images.length);

  document.fonts.load('1rem "Onest"').then(() => {
    textCommentElement.textContent = responseMock.commentText;
    textCommentElement.classList.remove("hidden");
    textSubheadingElement.textContent = responseMock.subheading;
    textSubheadingElement.classList.remove("hidden");
  });

  let loadedImagesCount = 0;
  const totalImages = images.length;

  const onImageLoad = () => {
    loadedImagesCount++;
    console.log(`Изображение загружено (${loadedImagesCount}/${totalImages})`);
    
    if (loadedImagesCount === totalImages) {
      content.classList.add("visible");
      console.log("Все изображения успешно загружены.");
    }
  };

  images.forEach((img) => {
    if (img.complete) {
      console.log(`Изображение уже загружено из кэша: ${img.src}`);
      onImageLoad();
    } else {
      console.log(`Начата загрузка изображения: ${img.src}`);
      img.onload = onImageLoad;
      img.onerror = () => {
        console.log(`Ошибка загрузки изображения: ${img.src}`);
        onImageLoad(); // Учитываем изображение даже при ошибке
      };
    }
  });  
});

// const buildUrl = "Build";
// const loaderUrl = buildUrl + "/{{{ LOADER_FILENAME }}}";
// const config = {
//   dataUrl: buildUrl + "/{{{ DATA_FILENAME }}}",
//   frameworkUrl: buildUrl + "/{{{ FRAMEWORK_FILENAME }}}",
//   codeUrl: buildUrl + "/{{{ CODE_FILENAME }}}",
// #if MEMORY_FILENAME
//   memoryUrl: buildUrl + "/{{{ MEMORY_FILENAME }}}",
// #endif
// #if SYMBOLS_FILENAME
//   symbolsUrl: buildUrl + "/{{{ SYMBOLS_FILENAME }}}",
// #endif
//   streamingAssetsUrl: "StreamingAssets",
//   companyName: "{{{ COMPANY_NAME }}}",
//   productName: "{{{ PRODUCT_NAME }}}",
//   productVersion: "{{{ PRODUCT_VERSION }}}",
// };

// const container = document.querySelector("#unity-container");
// const canvas = document.querySelector("#unity-canvas");
// const progressBarFill = document.querySelector("#progress-bar-fill");
// const canvasOverlay = document.querySelector("#canvas-overlay");

// let scaleToFit;

// try {
//   scaleToFit = !!JSON.parse("{{{ SCALE_TO_FIT }}}");
// } catch (e) {
//   scaleToFit = false;
// }

// let fitGameScreen = () => {
//   if (scaleToFit == true)
//     fit(container, {{{MIN_RATIO_WIDTH}}}, {{{MIN_RATIO_HEIGHT}}}, {{{MAX_RATIO_WIDTH}}}, {{{MAX_RATIO_HEIGHT}}});
// };

// window.addEventListener('resize', fitGameScreen);

// let myGameInstance = null;

// const script = document.createElement("script");
// script.src = loaderUrl;
// script.onload = () => {
//   createUnityInstance(canvas, config, (progress) => {
//     progressBarFill.style.width = `${100 * progress}%`;

//     const progressPercentage = document.querySelector("#progress-percentage");
//     progressPercentage.textContent = `${Math.round(100 * progress)}%`;

//     if (scaleToFit == true)
//       fitGameScreen();
//   }).then((unityInstance) => {
//     myGameInstance = unityInstance;

//     progressBarFill.style.width = '100%';
//     progressPercentage.textContent = '100%';

//     setTimeout(() => {
//       canvasOverlay.style.display = "none";
//     }, 500);
//   }).catch((message) => {
//     alert(message);
//   });
// };
// document.body.appendChild(script);

// if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
//   const meta = document.createElement('meta');
//   meta.name = 'viewport';
//   meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
//   document.getElementsByTagName('head')[0].appendChild(meta);
// }
