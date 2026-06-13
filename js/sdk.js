const API_KEY = "iurl_b68108649c69f903014439ea61205b1eb2c6917222c596439bdf11afe667d4c8";
const BASE_URL = "https://iurl.uz";

/**
 * API uchun kichik wrapper (yordamchi funksiya)
 */
async function apiRequest(method, path, body = null) {
  try {
    const options = {
      method,
      headers: { "X-API-Key": API_KEY }
    };
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${path}`, options);
    const res = await response.json();

    if (res.status) {
      console.log(res.data);
      return res.data;
    } else {
      console.info("Xatolik:", res.message);
    }
  } catch (error) {
    console.info("Tarmoq xatosi (bu CORS xatoligi bo'lishi mumkin):", error);
  }
}

/**
 * URL qisqartirish
 */
export const createShortLink = (url, code) => apiRequest("POST", "/shorten", { original: url, custom: code });

/**
 * URL statistikasini olish
 */
export const getStats = (shortCode) => apiRequest("GET", `/short/${shortCode}`);

/**
 * Umumiy sayt statistikasini olish
 */
export const globalStats = () => apiRequest("GET", "/api/stats");