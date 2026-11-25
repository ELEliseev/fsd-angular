# FSD Tasks

Учебный канбан-менеджер задач на **Angular 21** для тренировки понимания
**Feature-Sliced Design**. Структура сверена с официальной спецификацией
[fsd.how](https://fsd.how/) (включая [документацию для агентов](https://fsd.how/docs/llms/)).

Страница **«Архитектура»** — это интерактивная карта слоёв именно этого проекта:
правила импортов, путь одного действия по слоям и упражнения. Всего в приложении
четыре страницы: доска, архив, страница задачи с комментариями и карта архитектуры.

## Быстрый старт

```bash
npm install
npm start          # dev-сервер на http://localhost:4200
npm test           # юнит-тесты (vitest, один прогон: ng test --watch=false)
npm run build      # production-сборка
npm run lint:fsd   # проверка архитектуры линтером Steiger
```

## Стек

- Angular 21: standalone-компоненты, signals, zoneless, новый control flow (`@if`/`@for`)
- TypeScript (strict), SCSS
- Vitest для тестов, [Steiger](https://github.com/feature-sliced/steiger) для проверки FSD
- Синхронный mock-бэкенд на localStorage (`shared/api`) — стор и фичи полностью на signals, без промисов

## Структура

```
src/app/
├── app/                  # слой app: всё, что касается приложения целиком
│   ├── app.ts            # корневой компонент (layout)
│   ├── app.config.ts     # провайдеры
│   ├── routes/           # конфигурация роутов, lazy-загрузка страниц
│   ├── styles/           # дизайн-токены и глобальные стили
│   └── layout/           # шапка приложения
├── pages/                # слой pages: экраны
│   ├── board/            # канбан-доска (композиция features + entities)
│   ├── archive/          # выполненные задачи, переиспользует фичи доски
│   ├── task/             # страница задачи с комментариями (роут /task/:id)
│   └── architecture/     # карта архитектуры проекта
├── features/             # слой features: действия пользователя
│   ├── create-task/
│   ├── edit-task/        # форма на linkedSignal
│   ├── move-task/
│   ├── delete-task/
│   ├── assign-task/      # назначает исполнителя из entities/user
│   ├── filter-tasks/
│   ├── add-comment/
│   └── delete-comment/
├── entities/             # слой entities: бизнес-сущности
│   ├── task/             # model (types, store), api, ui (task-card, priority-badge)
│   ├── user/             # model, api, ui (user-avatar) + @x/task для сущности task
│   └── comment/          # model, api, ui (comment-item); связь с task через taskId
└── shared/               # слой shared: фундамент без бизнес-логики
    ├── ui/               # button, icon-button, input, select, icon
    ├── lib/              # id, даты
    ├── api/              # MockDb поверх localStorage
    └── config/           # константы приложения
```

Алиасы в `tsconfig.json`: `@app/*`, `@pages/*`, `@features/*`, `@entities/*`, `@shared/*`.

## Правила, которые соблюдает проект

1. **Импорты только вниз.** Модуль слайса импортирует слайсы только со слоёв строго
   ниже. `features` не импортирует `features`, `pages` не импортирует `pages`.
   Исключения — `app` и `shared`: внутри них сегменты импортируют друг друга свободно.
2. **Публичный API.** Каждый слайс (и сегмент в `shared`) отдаёт наружу только
   `index.ts` с явными ре-экспортами, без `export *`. Внутри слайса — относительные
   импорты, между слайсами — алиасы.
3. **Изоляция слайсов и `@x`.** Слайсы одного слоя не знают друг о друге.
   В проекте два паттерна связи сущностей:
   - `task → user`: снапшот через cross-import API `entities/user/@x/task`
     (отдаёт тип `User` и `UserAvatar` только для task) — как `Artist.songs`
     в примере из спецификации; логику назначения держит `features/assign-task`;
   - `comment → task`: нормализованный `taskId` без импорта сущности;
     сборка задачи с комментариями происходит выше — в `pages/task`.

### Почему нет слоя widgets

В текущей спецификации FSD слой `widgets` **не рекомендуется**: композиция для
одного экрана живёт в `pages`, переиспользуемые действия — в `features`, общий
layout — в `app`. Поэтому колонки, тулбар и статистика доски лежат в
`pages/board/ui`, а шапка — в `app/layout`. Слой `processes` объявлен
устаревшим и тоже не используется. Подробнее — на странице «Архитектура».

### Про предупреждения Steiger

`npm run lint:fsd` выдаёт три предупреждения `fsd/insignificant-slice`: фичи
`create-task`, `add-comment` и `delete-comment` использует только одна страница,
и в реальном проекте линтер советовал бы слить их в `pages`. Остальные фичи
переиспользуются доской и архивом. Разделение намеренное — проект тренирует
именно слой `features`. Правило переведено в `warn` в `steiger.config.mjs`
с комментарием.

## Как прочитать код за 5 минут

1. `entities/task/model/types.ts` — что такое задача в этом проекте; импорт
   `User` через `@entities/user/@x/task` — связь сущностей в действии.
2. `entities/task/model/task-store.ts` — состояние на signals и CRUD.
3. `features/move-task/` — типичная фича: `ui` вызывает свой `model`,
   `model` обновляет стор сущности.
4. `pages/board/ui/board-page.ts` — композиция: стор сущности + фильтр фичи
   собираются в колонки через `computed`.
5. `pages/archive/ui/archive-page.ts` — те же фичи в другой композиции.
6. `pages/task/ui/task-page.ts` — нормализованная связь: задача + комментарии
   собираются через `computed` на странице, сущности друг о друге не знают.
7. `app/routes/app.routes.ts` — как страницы подключаются к приложению.

Полный путь действия «клик → сохранение» расписан на странице «Архитектура».

## Упражнения

Предыдущие три упражнения (edit-task, user + @x, archive) уже реализованы —
разбирай их как образцы. Следующие шаги:

1. **Фильтр по исполнителю** — расширь `filter-tasks` полем `assignee` или
   добавь отдельную фичу. `TaskStore` при этом не должен измениться.
2. **Сущность `project`** — группировка задач по проектам. Реши, где живёт
   связь: снапшот через `@x` внутри `task` или композиция на уровне `pages`.
3. **Сегмент `shared/i18n`** — вынеси строки интерфейса в фундамент,
   чтобы в слайсах осталась только логика.

## Полезные ссылки

- Спецификация: https://fsd.how/
- Документация для LLM/агентов: https://fsd.how/docs/llms/
- Линтер Steiger: https://github.com/feature-sliced/steiger
