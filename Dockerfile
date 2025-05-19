# Dockerfile.dev
FROM node:23

# Робоча директорія в контейнері
WORKDIR app

# Копіюємо лише залежності на початку (для кешу)
COPY package*.json ./

RUN npm install

# Копіюємо решту коду
COPY . .

# Запускаємо Next.js у dev-режимі
CMD ["npm", "run", "dev"]
