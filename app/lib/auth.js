export async function getUserFromServer() {
  const token = localStorage.getItem('token');
  
  const API_URL = process.env.API_URL;
  
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Не удалось получить данные пользователя');
    }

    return await response.json();

  } catch (error) {
    console.error('Ошибка при запросе данных пользователя:', error);
    return null;
  }
}
