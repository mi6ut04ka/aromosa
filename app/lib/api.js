export async function apiRequest(endpoint, method = 'GET', body = null) {
  const API_URL = process.env.API_URL;

  if (!API_URL) {
    throw new Error('API_URL не установлен в переменных окружения');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const options = {
    method,
    headers,
    credentials: 'include',
  };

  if (body) {
    if (typeof body !== 'object') {
      throw new Error('Тело запроса должно быть объектом');
    }
    options.body = JSON.stringify(body);
  }

  try {
    const response = await withTimeout(fetch(`${API_URL}${endpoint}`, options), 10000); // 10 секунд таймаут

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка при выполнении запроса к ${endpoint}: ${errorData.message || 'API Error'}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Ошибка при выполнении запроса к ${endpoint}:`, error.message);
    throw error;
  }
}

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Превышено время ожидания')), ms));
  return Promise.race([promise, timeout]);
}
