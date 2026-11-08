# R & M Favorites — микрофронт

Виджет «Избранные персонажи», вынесенный в отдельное приложение и подключаемый к хосту через Module Federation. Хост загружает `remoteEntry.js` и рендерит виджет, передавая данные и тексты через props.

## Стек

- React 19
- TypeScript
- Vite
- Module Federation (`@originjs/vite-plugin-federation`)
- SCSS Modules
- ESLint + Stylelint + Prettier + Husky + lint-staged

## Установка

```bash
npm install
```

## Скрипты

```bash
npm run dev     # запуск dev-сервера (порт 5001)
npm run build   # сборка продакшн-версии
npm run preview # предпросмотр сборки
npm run lint    # ESLint
npm run lint:css        # Stylelint
npm run prettier:fix    # форматирование всех файлов
```

## Функционал

- **Избранные персонажи** — панель со списком, открывается по клику на иконку
- **Удаление из избранного** — кнопка `×` у каждого элемента
- **Счётчик** — показывает количество избранного (показывает `9+` при превышении порога)
- **Тёмная тема** — переключение через CSS-переменные (атрибут `data-theme="dark"`)
- **Стенд** — в dev-режиме поднимается standalone-страница с моковыми данными, чтобы отлаживать виджет без хоста

## Структура проекта

```
src/
├── assets/       # Иконки
├── styles/       # SCSS: тема, стили стенда
└── widgets/
    └── FavoriteCharacters/   # Виджет избранного
```

## Особенности

- **Module Federation (remote):** `FavoriteCharacters` экспортируется как `./FavoriteCharacters` и загружается хостом динамически
- **Динамический `base`** путь для деплоя на Vercel и GitHub Pages — задаётся через `VITE_BASE_PATH` при сборке. На Pages подставляется в CI, на Vercel используется `/` по умолчанию
- **Стенд:** в dev-режиме `main.tsx` подключает `standalone.scss` и рендерит `App` с моковыми данными. В продакшн-сборке `index.html` из `dist` удаляется
- **Husky + lint-staged:** на коммит прогоняются `eslint --fix`, `prettier --write`, `stylelint --fix`
