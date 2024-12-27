# Используем официальный образ Node.js для сборки
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальную часть приложения
COPY . .

# Сборка проекта
RUN npm run build

# Переход к минимальному образу для запуска
FROM node:18-alpine AS production

WORKDIR /app

# Копируем файлы из стадии сборки
COPY --from=build /app ./

# Устанавливаем только production-зависимости
RUN npm prune --production

# Указываем порт приложения
EXPOSE 3000

# Команда запуска
CMD ["npm", "run", "start"]
