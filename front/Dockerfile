# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copia package.json e package-lock.json para cache de dependências
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copia o restante do código e builda
COPY . .
RUN npm run build

# Run stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Opcional: nginx.conf para React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
