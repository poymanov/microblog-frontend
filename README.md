# Microblog (frontend)

## Описание

Микроблог, повторяющий идеи Twitter.

**Single Page Application** для работы с API - https://github.com/poymanov/microblog-api

## Установка

- Расположить проект в необходимой директории
- В консоли перейти в директорию проекта
- Выполнить:
```
npm install
```

## Настройка

В корне директории проекта создать файл `.env.local`.

В нём необходимо задать адрес по которому будет доступно API:
```
VUE_APP_API_URL=http://microblog-api.test/api/
```

## Запуск

- В консоли перейти в директорию проекта
- Выполнить:
```
npm run serve
```
Проект будет запущен локально и доступен по адресу http://localhost:8080/

## Деплой

- Разместить проект в необходимой директории на сервере
- Задать адрес API в `.env.local`
- Выполнить консольную команду:
```
npm run build
```
- Настроить nginx. Примерная конфигурация:
```
server {
  server_name microblog-frontend.test;
  root /path/to/microblog-frontend/dist;

  index index.html index.htm;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## Цели проекта

Код создан в учебных целях.
