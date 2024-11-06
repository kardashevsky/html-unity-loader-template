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

    if (scaleToFit == true)
      fitGameScreen();
  }).then((unityInstance) => {
    myGameInstance = unityInstance;
    canvasOverlay.style.display = "none";
  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
  document.getElementsByTagName('head')[0].appendChild(meta);
}
