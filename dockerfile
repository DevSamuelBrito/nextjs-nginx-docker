# Etapa 1: Build da aplicação
FROM node:20.15-alpine AS builder

WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app ./
RUN npm run build


FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]