# Используем базовый образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Собираем проект Next.js
RUN npm run build

# Указываем порт, на котором будет работать приложение
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
