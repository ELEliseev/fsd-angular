export interface LayerInfo {
  name: string;
  alias: string | null;
  used: boolean;
  note?: 'deprecated' | 'discouraged';
  purpose: string;
  contents: readonly string[];
}

export const LAYERS: readonly LayerInfo[] = [
  {
    name: 'app',
    alias: '@app',
    used: true,
    purpose:
      'Всё, что касается приложения целиком: инициализация, роутинг, провайдеры, глобальные стили и общий layout. Слайсов нет — только сегменты.',
    contents: [
      'app.ts / app.config.ts — корневой компонент и провайдеры',
      'routes/ — конфигурация роутов (lazy-загрузка страниц)',
      'styles/ — дизайн-токены и глобальные стили',
      'layout/ — шапка приложения (общий layout)',
    ],
  },
  {
    name: 'processes',
    alias: null,
    used: false,
    note: 'deprecated',
    purpose:
      'Устаревший слой для сквозных сценариев между страницами. Спецификация рекомендует не использовать его и держать такую логику в features и app.',
    contents: [],
  },
  {
    name: 'pages',
    alias: '@pages',
    used: true,
    purpose:
      'Экраны приложения. Страница компонует features и entities в готовый экран; её собственные UI-блоки (колонки, тулбар, статистика) живут внутри слайса страницы.',
    contents: [
      'board/ — канбан-доска: board-page, board-column, board-stats, board-toolbar',
      'archive/ — выполненные задачи, переиспользует фичи доски',
      'task/ — страница задачи с комментариями, роут с параметром :id',
      'architecture/ — эта страница: ui + model с данными карты слоёв',
    ],
  },
  {
    name: 'widgets',
    alias: null,
    used: false,
    note: 'discouraged',
    purpose:
      'Самостоятельные переиспользуемые UI-блоки. В текущей спецификации слой не рекомендуется: композиция для одного экрана остаётся в pages, переиспользуемые действия уходят в features, общий layout — в app.',
    contents: [],
  },
  {
    name: 'features',
    alias: '@features',
    used: true,
    purpose:
      'Пользовательские действия с бизнес-ценностью: то, что люди хотят сделать с сущностями. У каждой фичи свои ui и model; фичи не импортируют друг друга.',
    contents: [
      'create-task/ — форма создания задачи',
      'edit-task/ — редактирование (форма на linkedSignal)',
      'move-task/ — перенос задачи между колонками',
      'delete-task/ — удаление с подтверждением',
      'assign-task/ — назначение исполнителя из entities/user',
      'filter-tasks/ — поиск и фильтр по приоритету (своё состояние)',
      'add-comment/ — добавление комментария к задаче',
      'delete-comment/ — удаление комментария с подтверждением',
    ],
  },
  {
    name: 'entities',
    alias: '@entities',
    used: true,
    purpose:
      'Бизнес-сущности предметной области: данные, API и переиспользуемое представление. Карточка задачи ничего не знает о действиях — кнопки проецируются в слот сверху.',
    contents: [
      'task/model — типы, метаданные статусов, TaskStore на signals',
      'task/api — запросы к mock-бэкенду, стартовые данные',
      'task/ui — task-card, priority-badge',
      'user/ — исполнитель: model, api, ui (user-avatar)',
      'user/@x/task — cross-import API: тип User и UserAvatar для сущности task',
      'comment/ — комментарии: model, api, ui (comment-item); связь с task через taskId',
    ],
  },
  {
    name: 'shared',
    alias: '@shared',
    used: true,
    purpose:
      'Фундамент без бизнес-логики: UI-кит, внутренние библиотеки, клиент API, конфигурация. Слайсов нет, сегменты могут импортировать друг друга.',
    contents: [
      'ui/ — button, icon-button, input, select, icon',
      'lib/ — генерация id, форматирование дат',
      'api/ — синхронный MockDb поверх localStorage',
      'config/ — имя приложения, префикс хранилища',
    ],
  },
];

export interface RuleInfo {
  title: string;
  text: string;
}

export const RULES: readonly RuleInfo[] = [
  {
    title: 'Импорты только вниз',
    text: 'Модуль слайса может импортировать слайсы только со слоёв строго ниже. features не импортирует features, pages не импортирует pages. Исключения — app и shared: внутри них сегменты импортируют друг друга свободно.',
  },
  {
    title: 'Публичный API',
    text: 'Каждый слайс (и сегмент в shared/app) отдаёт наружу только index.ts с явными ре-экспортами — без export *. Внутри слайса импорты относительные, между слайсами — через алиасы: @entities/task, @features/move-task.',
  },
  {
    title: 'Изоляция слайсов и @x',
    text: 'Слайсы одного слоя не знают друг о друге. В проекте два паттерна связи: task → user — снапшот через cross-import API entities/user/@x/task (как Artist.songs в спецификации); comment → task — нормализованный taskId без импорта сущности, а сборка задачи с комментариями происходит выше, в pages/task.',
  },
];

export interface TraceStep {
  step: string;
  where: string;
  detail: string;
}

export const ACTION_TRACE: readonly TraceStep[] = [
  {
    step: 'Клик «→» на карточке',
    where: 'pages/board/ui/board-column',
    detail: 'Страница скомпоновала карточку сущности и кнопки фич в один блок.',
  },
  {
    step: 'MoveTaskButtons.move()',
    where: 'features/move-task/ui',
    detail: 'UI фичи вызывает собственный model, а не стор напрямую.',
  },
  {
    step: 'MoveTask.execute()',
    where: 'features/move-task/model',
    detail: 'Вычисляет соседний статус и передаёт обновлённую задачу в стор сущности.',
  },
  {
    step: 'TaskStore.update()',
    where: 'entities/task/model',
    detail: 'Signal обновляется — все computed (колонки, статистика) пересчитываются сами.',
  },
  {
    step: 'TaskApi → MockDb',
    where: 'entities/task/api → shared/api',
    detail: 'Изменение сохраняется в localStorage через общий клиент из shared.',
  },
];

export interface ExerciseInfo {
  title: string;
  text: string;
}

export const EXERCISES: readonly ExerciseInfo[] = [
  {
    title: 'Фильтр по исполнителю',
    text: 'Расширь filter-tasks полем assignee или добавь отдельную фичу. Состояние фильтра принадлежит фиче, а не сущности — проверь, что TaskStore при этом не меняется.',
  },
  {
    title: 'Сущность project',
    text: 'Добавь проекты и группировку задач. Реши, где живёт связь: снапшот через @x внутри task или композиция на уровне pages. Сравни оба варианта на странице «Архитектура».',
  },
  {
    title: 'Сегмент shared/i18n',
    text: 'Вынеси строки интерфейса в сегмент i18n слоя shared. Заметь, как слайсы становятся чище: в них остаётся только логика, а тексты приходят из фундамента.',
  },
];
