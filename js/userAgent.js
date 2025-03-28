export async function setViewportForMobile() {
  const userAgent = navigator.userAgent;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const deviceType = innerWidth <= 768 ? "Mobile" : "Desktop/Tablet";

  let device = "Unknown";
  if (/iPhone/i.test(userAgent)) {
    device = "iPhone";
  } else if (/iPad/i.test(userAgent)) {
    device = "iPad";
  } else if (/Android/i.test(userAgent)) {
    device = "Android";
  }

  const language = navigator.language || navigator.userLanguage;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let platform = "Unknown platform";
  if (navigator.userAgentData) {
    try {
      const highEntropyData = await navigator.userAgentData.getHighEntropyValues(['platform']);
      platform = highEntropyData.platform;
    } catch {
      platform = navigator.userAgentData.platform || "Unknown platform";
    }
  } else {
    platform = navigator.platform;
  }

  const deviceInfo = {
    userAgent,
    isTouchDevice,
    screenSize: `${screenWidth}x${screenHeight}`,
    viewportSize: `${innerWidth}x${innerHeight}`,
    deviceType,
    device,
    language,
    platform,
    timeZone,
  };

  localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo));

  return deviceInfo;
}
