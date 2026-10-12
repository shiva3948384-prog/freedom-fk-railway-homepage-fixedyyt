FROM php:8.3-cli-alpine
WORKDIR /app
COPY . /app
EXPOSE 8080
CMD ["sh", "/app/start.sh"]
