import fit from './fit.js';

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
const progressPercentage = document.querySelector("#progress-percentage");
const productVersionElement = document.querySelector("#product-version");

let myGameInstance = null;
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

const script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {

  if (productVersionElement) {
    productVersionElement.textContent = `v ${config.productVersion}`;
  }

  createUnityInstance(canvas, config, (progress) => {
    const percentage = Math.round(100 * progress);
    progressBarFill.style.width = `${percentage}%`;
    progressPercentage.textContent = `${percentage}%`;

    if (scaleToFit == true)
      fitGameScreen();
  }).then((unityInstance) => {
    myGameInstance = unityInstance;
    progressBarFill.style.width = '100%';
    progressPercentage.textContent = '100%';
    canvasOverlay.style.display = "none";
    document.documentElement.style.background = "#000";
    document.body.style.background = "#000";
  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);
