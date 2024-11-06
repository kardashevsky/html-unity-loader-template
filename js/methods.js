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
