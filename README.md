# FSD Tasks

Учебный канбан-менеджер задач на **Angular 21** для тренировки понимания
**Feature-Sliced Design**. Структура сверена с официальной спецификацией
[fsd.how](https://fsd.how/) (включая [документацию для агентов](https://fsd.how/docs/llms/)).

Вторая страница приложения — **«Архитектура»** — это интерактивная карта слоёв
именно этого проекта: правила импортов, путь одного действия по слоям и упражнения.

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
│   └── architecture/     # карта архитектуры проекта
├── features/             # слой features: действия пользователя
│   ├── create-task/
│   ├── move-task/
│   ├── delete-task/
│   └── filter-tasks/
├── entities/             # слой entities: бизнес-сущности
│   └── task/             # model (types, store), api, ui (task-card, priority-badge)
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
3. **Изоляция слайсов.** Слайсы одного слоя не знают друг о друге. Связи между
   entities оформляются через cross-imports `@x` (в этом проекте одна сущность,
   поэтому `@x` не используется — см. упражнение ниже).

### Почему нет слоя widgets

В текущей спецификации FSD слой `widgets` **не рекомендуется**: композиция для
одного экрана живёт в `pages`, переиспользуемые действия — в `features`, общий
layout — в `app`. Поэтому колонки, тулбар и статистика доски лежат в
`pages/board/ui`, а шапка — в `app/layout`. Слой `processes` объявлен
устаревшим и тоже не используется. Подробнее — на странице «Архитектура».

### Про предупреждения Steiger

`npm run lint:fsd` выдаёт 4 предупреждения `fsd/insignificant-slice`: каждую фичу
использует только одна страница, и в реальном проекте линтер советовал бы слить
их в `pages`. Здесь разделение намеренное — проект тренирует именно слой
`features`. Правило переведено в `warn` в `steiger.config.mjs` с комментарием.

## Как прочитать код за 5 минут

1. `entities/task/model/types.ts` — что такое задача в этом проекте.
2. `entities/task/model/task-store.ts` — состояние на signals и CRUD.
3. `features/move-task/` — типичная фича: `ui` вызывает свой `model`,
   `model` обновляет стор сущности.
4. `pages/board/ui/board-page.ts` — композиция: стор сущности + фильтр фичи
   собираются в колонки через `computed`.
5. `app/routes/app.routes.ts` — как страницы подключаются к приложению.

Полный путь действия «клик → сохранение» расписан на странице «Архитектура».

## Упражнения

1. **Фича `edit-task`** — добавь редактирование задачи отдельным слайсом в
   `features`, подключи кнопку в `pages/board`. Сущность почти не меняется.
2. **Сущность `user` и связь `@x`** — добавь исполнителя задачи, свяжи сущности
   через `entities/task/@x/user`, действие вынеси в `features/assign-task`.
3. **Страница `archive`** — список выполненных задач с переиспользованием
   `delete-task` и `move-task`. Фичи не меняются — меняется только композиция.

## Полезные ссылки

- Спецификация: https://fsd.how/
- Документация для LLM/агентов: https://fsd.how/docs/llms/
- Линтер Steiger: https://github.com/feature-sliced/steiger
