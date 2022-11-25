# Стажировка Itransition, Задание № 4

## Общее описание

Данное веб-приложение осуществляет регистрацию и аутентификацию пользователей.<br/>
- Аутентифицированным пользователям доступно управление базой данных всех пользователей, а именно:<br/>
блокировка, разблокировка и удаление пользователей.<br/>
- В случае удаления или блокировки аутентифицированного на данный момент пользователя происходит автоматический переход на страницу входа.<br/>
- Заблокированные пользователи не могут выполнить аутентификацию.

Фронтенд часть приложения выполнена с использованием фреймворка React JS, CSS-фреймворка Material-UI

Бэкенд часть приложения выполнена на NodeJS с использованием фреймворка ExpressJS.
В качестве СУБД выбрана MongoDB.

## Развертывание проекта локально
```
    git clone https://github.com/alexsk529/Itransition4_UserDatabase.git
```
``` cd server ``` - go to the server folder <br/>
``` npm run install-deps ``` - installing all dependencies (both frontend and backend) <br/>
``` npm run server ``` - run backend side <br/>
``` npm run client ``` - run frontend side <br/>
``` npm run dev ``` - run both backend and frontend sides
