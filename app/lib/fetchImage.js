export async function fetchImage(filename) {
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/images/${filename}`);
    
    if (!response.ok) {
      throw new Error('Не удалось загрузить изображение');
    }

    const blob = await response.blob();
    const imageURL = URL.createObjectURL(blob);
    return imageURL;
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    return null;
  }
}
