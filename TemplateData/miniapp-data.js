// Функция для сбора всех данных MiniApp в объект
export default function collectMiniAppData() {
  return {
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
}
