document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".loading-page__content");
  const images = content.querySelectorAll("img");

  let loadedImagesCount = 0;
  const totalImages = images.length;

  const onImageLoad = () => {
    loadedImagesCount++;
    if (loadedImagesCount === totalImages) {
      content.classList.add("visible");
    }
  };

  images.forEach((img) => {
    img.onload = onImageLoad;
    img.onerror = onImageLoad;
  });
});

const BASE_URL = 'https://stage-ng-users.neuragames.tech';

/**
 * Generic function to make API requests.
 * @param {string} endpoint - The API endpoint (e.g., "/user/create").
 * @param {string} method - HTTP method (e.g., "POST", "GET", "PUT", "DELETE").
 * @param {Object|null} data - Request body (if applicable).
 * @param {Object} additionalHeaders - Additional headers for the request.
 * @returns {Promise<Object>} - The response data from the API.
 */
export const apiRequest = async (endpoint, method = 'POST', data = null, additionalHeaders = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Request error to ${url}:`, error);
    throw error;
  }
};

(function initializeWebApp() {
  if (window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    webApp.ready();
    const webAppData = getWebAppData();

    apiRequest('/user/createorget', 'POST', webAppData)
    .then(response => {
      console.log('Ответ от сервера:', response);
    })
    .catch(error => {
      console.error('Ошибка при отправке запроса:', error);
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
  };
}