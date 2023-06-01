FROM node:16.3.0-alpine as builder
COPY . ./app
WORKDIR /app
RUN apk add --no-cache python3 make g++
RUN npm install
RUN npm run build:docker

FROM nginx as runtime
EXPOSE 80
COPY --from=builder /app/public /usr/share/nginx/html/me
CMD ["nginx", "-g", "daemon off;"]
