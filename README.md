# Вакансия разработчик (фронтенд)

ТЕСТОВОЕ ЗАДАНИЕ

Есть апи, возвращающее json с данными.

Описание тут:
https://github.com/cy322666/wb-api/blob/master/README.md

Хост:
109.73.206.144:6969

Ключ:
E6kUTYrYwZq2tN4QEtyzsbEBk3ie

Коллекция-дока с примерами запросов на постман:
https://www.postman.com/cy322666/workspace/app-api-test/overview

Задача:
Создать spa приложение на Vue3 с использованием composition api
с 4-мя страницами, соответствующими эндпоинтам апи(incomes, orders, sales, stocks).
На каждой странице добавить график по любому полю, таблицу с данными, несколько фильтров по любым полям, пагинацию.

Можно использовать любые дополнительные библиотеки.
Код проекта выложить в git. Приложение развернуть на любом бесплатном хостинге, предоставить ссылку на него.
Время на выполнение - 3 дня.

---

### Продажи

Параметры:

dateFrom

dateTo

Путь: GET /api/sales

#### Заказы

Параметры:

dateFrom

dateTo

Путь: GET /api/orders

#### Склады

Выгрузка только за текущий день

Параметры:

dateFrom

Путь: GET /api/stocks

#### Доходы

Параметры:

dateFrom

dateTo

Путь: GET /api/incomes

---

Примеры api запросов

Incomes:
http://109.73.206.144:6969/api/incomes?dateFrom=2025-05-01&dateTo=2025-06-01&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100

Orders:
http://109.73.206.144:6969/api/orders?dateFrom=2025-05-01&dateTo=2025-06-01&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100

Sales:
http://109.73.206.144:6969/api/sales?dateFrom=2025-05-01&dateTo=2025-06-01&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100

Stocks:
http://109.73.206.144:6969/api/stocks?dateFrom=2025-05-01&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100
