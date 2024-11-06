// telegram-methods.js

// Показать главную кнопку с текстом
function showMainButton(text = "Click Me") {
  if (isTelegramWebAppAvailable()) {
      const mainButton = window.Telegram.WebApp.MainButton;
      mainButton.setText(text);
      mainButton.show();
      mainButton.enable();
  }
}

// Скрыть главную кнопку
function hideMainButton() {
  if (isTelegramWebAppAvailable()) {
      window.Telegram.WebApp.MainButton.hide();
  }
}

// Установить текст главной кнопки
function setMainButtonText(text) {
  if (isTelegramWebAppAvailable()) {
      window.Telegram.WebApp.MainButton.setText(text);
  }
}

// Закрыть WebApp
function closeWebApp() {
  if (isTelegramWebAppAvailable()) {
      window.Telegram.WebApp.close();
  }
}

// Отправить данные в Telegram
function sendDataToTelegram(data) {
  if (isTelegramWebAppAvailable()) {
      window.Telegram.WebApp.sendData(data);
  }
}

// Установить обработчик для нажатия на главную кнопку
function setMainButtonClickHandler(callback) {
  if (isTelegramWebAppAvailable() && typeof callback === "function") {
      window.Telegram.WebApp.MainButton.onClick(callback);
  }
}

// Получить данные о теме (светлая/тёмная)
function getThemeParams() {
  if (isTelegramWebAppAvailable()) {
      return window.Telegram.WebApp.themeParams;
  }
  return null;
}

/**
 * Triggers haptic feedback in Telegram Mini App using the WebApp HapticFeedback API.
 * 
 * @param {string} [type="impact"] - The type of haptic feedback to trigger.
 * Supported types:
 *   - "impact": Generates an impact feedback (default).
 *   - "notification": Generates a notification feedback of type "success".
 *   - "selection": Generates feedback when the user changes a selection.
 * 
 * Usage:
 *   - triggerTelegramHapticFeedback("impact"); // For light impact feedback.
 *   - triggerTelegramHapticFeedback("notification"); // For success notification.
 *   - triggerTelegramHapticFeedback("selection"); // For selection change feedback.
 * 
 * Notes:
 *   - This function requires Telegram WebApp HapticFeedback API (Bot API 6.1+).
 *   - If the API is unavailable, it will log a warning in the console.
 * 
 * Example:
 *   triggerTelegramHapticFeedback("notification");
 * 
 * @throws {Error} Will warn in the console if HapticFeedback is not supported.
 */
function triggerTelegramHapticFeedback(type = "impact") {
  if (window.Telegram?.WebApp?.HapticFeedback) {
    switch (type) {
      case "impact":
        window.Telegram.WebApp.HapticFeedback.impactOccurred();
        break;
      case "notification":
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
        break;
      case "selection":
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
        break;
      default:
        console.warn("Invalid Haptic Feedback type.");
        break;
    }
  } else {
    console.warn("Telegram WebApp HapticFeedback is not available.");
  }
}

document.getElementById('show-data-btn').addEventListener('click', () => {
  triggerTelegramHapticFeedback('impact'); // Можете изменить тип на "notification" или "selection"
});