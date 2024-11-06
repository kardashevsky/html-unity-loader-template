// Функция для сбора данных WebApp
function collectWebAppData() {
  const data = {
    initData: Telegram.WebApp.initData || null,
    initDataUnsafe: Telegram.WebApp.initDataUnsafe || null,
    version: Telegram.WebApp.version || null,
    platform: Telegram.WebApp.platform || null,
    colorScheme: Telegram.WebApp.colorScheme || null,
    themeParams: Telegram.WebApp.themeParams || {},
    isExpanded: Telegram.WebApp.isExpanded || false,
    viewportHeight: Telegram.WebApp.viewportHeight || 0,
    viewportStableHeight: Telegram.WebApp.viewportStableHeight || 0,
    headerColor: Telegram.WebApp.headerColor || null,
    backgroundColor: Telegram.WebApp.backgroundColor || null,
    bottomBarColor: Telegram.WebApp.bottomBarColor || null,
    isClosingConfirmationEnabled: Telegram.WebApp.isClosingConfirmationEnabled || false,
    isVerticalSwipesEnabled: Telegram.WebApp.isVerticalSwipesEnabled || false,
    buttons: {
      backButton: Telegram.WebApp.BackButton || null,
      mainButton: Telegram.WebApp.MainButton || null,
      secondaryButton: Telegram.WebApp.SecondaryButton || null,
      settingsButton: Telegram.WebApp.SettingsButton || null,
    },
    features: {
      hapticFeedback: Telegram.WebApp.HapticFeedback || null,
      cloudStorage: Telegram.WebApp.CloudStorage || null,
      biometricManager: Telegram.WebApp.BiometricManager || null
    }
  };

  console.log("WebApp Data Collected:", data);

  return data;
}

// Обработчик нажатия на кнопку
document.getElementById('collect-data-btn').addEventListener('click', () => {
  const webAppData = collectWebAppData();

  // Заменяем экран загрузки данными
  document.getElementById('canvas-overlay').classList.add('hidden');
  const dataDisplay = document.getElementById('data-display');
  dataDisplay.innerHTML = `<h2>Collected WebApp Data</h2><pre>${JSON.stringify(webAppData, null, 2)}</pre>`;
  dataDisplay.classList.remove('hidden');
});
