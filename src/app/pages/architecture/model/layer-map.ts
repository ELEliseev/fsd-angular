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
      'move-task/ — перенос задачи между колонками',
      'delete-task/ — удаление с подтверждением',
      'filter-tasks/ — поиск и фильтр по приоритету (своё состояние)',
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
    text: 'Слайсы одного слоя не знают друг о друге. Если entities связаны в реальном мире, связь оформляется явным cross-import API: entities/task/@x/user. Логику взаимодействия лучше держать выше — в features или pages.',
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
    title: 'Фича edit-task',
    text: 'Добавь редактирование задачи: новый слайс features/edit-task (ui + model), кнопку подключи в pages/board. Сущность task при этом почти не меняется — в этом и смысл слоёв.',
  },
  {
    title: 'Сущность user и связь @x',
    text: 'Добавь entities/user и исполнителя задачи. Свяжи сущности через entities/task/@x/user, а действие «назначить исполнителя» вынеси в features/assign-task.',
  },
  {
    title: 'Вторая страница без новых фич',
    text: 'Сделай pages/archive со списком выполненных задач и переиспользуй delete-task и move-task. Фичи не меняются — меняется только композиция на странице.',
  },
];
