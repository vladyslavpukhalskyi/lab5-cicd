# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Final image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Копіюємо залежності з першого етапу
COPY --from=deps /app/node_modules ./node_modules
# Копіюємо весь код проєкту
COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]