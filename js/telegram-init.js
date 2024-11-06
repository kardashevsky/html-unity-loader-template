(function initializeWebApp() {
  if (window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    webApp.ready();
    const webAppData = getWebAppData();

    document.getElementById('show-data-btn').addEventListener('click', () => {
      sendWebAppData(webAppData);
    });
    } else {
    console.warn("Telegram WebApp is not available.");
    alert("Telegram WebApp is not available.");
  }
})();

function getWebAppData() {
  if (!window.Telegram?.WebApp) {
    return { error: "Telegram WebApp API is not available." };
  }

  const webApp = Telegram.WebApp;

  return {
    initData: webApp.initData || null,
    initDataUnsafe: webApp.initDataUnsafe || null,
    version: webApp.version || null,
    platform: webApp.platform || null,
    colorScheme: webApp.colorScheme || null,
    themeParams: webApp.themeParams || {},
    isExpanded: webApp.isExpanded || false,
    viewportHeight: webApp.viewportHeight || 0,
    viewportStableHeight: webApp.viewportStableHeight || 0,
    headerColor: webApp.headerColor || null,
    backgroundColor: webApp.backgroundColor || null,
    bottomBarColor: webApp.bottomBarColor || null,
    isClosingConfirmationEnabled: webApp.isClosingConfirmationEnabled || false,
    isVerticalSwipesEnabled: webApp.isVerticalSwipesEnabled || false,
  };
}

// function sendWebAppData(data) {
//   fetch('https://example.com/api/webapp-data', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response => response.json())
//   .then(result => {
//     console.log('Data sent successfully:', result);
//   })
//   .catch(error => {
//     console.error('Error sending data:', error);
//   });
// }

function sendWebAppData(data) {
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: black;
    color: white;
    padding: 10px;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    font-size: 14px;
    z-index: 1000;
    max-height: 30%;
    overflow-y: auto;
    border-top: 2px solid white;
  `;

  const content = `<h1 style="margin: 0; font-size: 16px;">WebApp Data</h1><pre style="margin: 5px 0;">${JSON.stringify(data, null, 2)}</pre>`;
  container.innerHTML = content;

  document.body.appendChild(container);
}
