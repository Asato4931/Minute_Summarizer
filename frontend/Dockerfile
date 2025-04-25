# Base Image (Node JSを構築するためのテンプレートっぽい?)
FROM node:23.10.0-slim AS builder

# 作業するディレクトリを指定 (作成するコンテナの名前をつける感じ?)
WORKDIR /front_app

# パッケージファイルをコピー
COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npm run build

# Server
FROM nginx:alpine

# Copy built files to nginx html directory
COPY --from=builder /front_app/dist /usr/share/nginx/html

# Remove default nginx config and use our own
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
