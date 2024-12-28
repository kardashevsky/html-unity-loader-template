import initializeLoadingPageContent from './initializeLoadingPageContent.js';
import { setViewportForMobile } from './userAgent.js';
import { getPlayerData, getTranslations } from  './api.js';
import { initData, initDataUnsafe } from  './mockData.js';

const webApp = window.Telegram.WebApp;

if (!webApp) {
  throw new Error("Telegram WebApp is not available. The issue is on Telegram's side. Stopping execution.");
}

webApp.expand();
webApp.lockOrientation();
webApp.disableVerticalSwipes();

// const initData = webApp.initData;
localStorage.setItem('initData', initData);

// const initDataUnsafe = webApp.initDataUnsafe;
localStorage.setItem('initDataUnsafe', JSON.stringify(initDataUnsafe));

const languageCode = initDataUnsafe?.user?.language_code || 'en-en';

(async () => {
  try {
    const textLoaderContent = await getTranslations(languageCode);
    initializeLoadingPageContent(textLoaderContent);

    await getPlayerData();

    setViewportForMobile();

    webApp.ready();
  } catch (error) {
    console.error('Error during initialization:', error);
  }
})();

webApp.ready();
