import { fit } from './fit.js';

const buildUrl = "Build";
const loaderUrl = buildUrl + "/{{{ LOADER_FILENAME }}}";

const config = {
  dataUrl: buildUrl + "/{{{ DATA_FILENAME }}}",
  frameworkUrl: buildUrl + "/{{{ FRAMEWORK_FILENAME }}}",
  codeUrl: buildUrl + "/{{{ CODE_FILENAME }}}",
#if MEMORY_FILENAME
  memoryUrl: buildUrl + "/{{{ MEMORY_FILENAME }}}",
#endif
#if SYMBOLS_FILENAME
  symbolsUrl: buildUrl + "/{{{ SYMBOLS_FILENAME }}}",
#endif
  streamingAssetsUrl: "StreamingAssets",
  companyName: "{{{ COMPANY_NAME }}}",
  productName: "{{{ PRODUCT_NAME }}}",
  productVersion: "{{{ PRODUCT_VERSION }}}",
};

const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");
const progressBarFill = document.querySelector("#progress-bar-fill");
const canvasOverlay = document.querySelector("#canvas-overlay");

let scaleToFit;

try {
  scaleToFit = !!JSON.parse("{{{ SCALE_TO_FIT }}}");
} catch (e) {
  scaleToFit = false;
}

let fitGameScreen = () => {
  if (scaleToFit == true)
    fit(container, {{{MIN_RATIO_WIDTH}}}, {{{MIN_RATIO_HEIGHT}}}, {{{MAX_RATIO_WIDTH}}}, {{{MAX_RATIO_HEIGHT}}});
};

window.addEventListener('resize', fitGameScreen);

let myGameInstance = null;

const script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFill.style.width = `${100 * progress}%`;

    const progressPercentage = document.querySelector("#progress-percentage");
    progressPercentage.textContent = `${Math.round(100 * progress)}%`;

    if (scaleToFit == true)
      fitGameScreen();
  }).then((unityInstance) => {
    myGameInstance = unityInstance;

    progressBarFill.style.width = '100%';
    progressPercentage.textContent = '100%';

    setTimeout(() => {
      canvasOverlay.style.display = "none";
    }, 500);
  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);
