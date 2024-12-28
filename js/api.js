import { playerData, translationsData } from  './mockData.js';

const BASE_URL_USERS_API = 'https://stage-ma-ng-users.neuragames.tech';
const BASE_URL_CONTENT_API = 'https://stage-ma-ng-content.neuragames.tech';

export const apiRequest = async (baseUrl, endpoint, method, data = null) => {
  const initData = localStorage.getItem('initData');

  if (!initData) {
    throw new Error('initData is missing in localStorage');
  }

  const url = `${baseUrl}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    'TelegramAuthorization': initData,
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

export const getPlayerData = async () => {
  try {
    // const playerData = await apiRequest(BASE_URL_USERS_API, '/player', 'GET');
    
    localStorage.setItem('playerData', JSON.stringify(playerData));

    return playerData;
  } catch (error) {
    console.error('Error fetching player data:', error);
    throw error;
  }
};

export const getTranslations = async (languageCode) => {
  try {
    const requestBody = {
      language: languageCode,
    };

    // const translationsData = await apiRequest(BASE_URL_CONTENT_API, '/translations', 'POST', requestBody);

    localStorage.setItem('translationsData', JSON.stringify(translationsData));

    const textLoaderContent = {
      subheading: translationsData.find(item => item.id === 'screen00_subheading')?.text || '',
      commentText: translationsData.find(item => item.id === 'screen00_heading')?.text || ''
    };

    return textLoaderContent;
  } catch (error) {
    console.error('Error fetching player data:', error);
    throw error;
  }
};
