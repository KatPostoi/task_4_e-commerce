# Baguette Basket

Frontend-only MVP багетной мастерской на `React + TypeScript + Vite`. Время на выполнение задания 20 часов. Для выполнения работы была использованна нейросеть Open AI Codex, Perplexity AI.

## Что реализовано

- публичные страницы: `О нас`, `Процесс изготовления`, `Контакты`, `Каталог`, `Конструктор`, `Корзина`;
- каталог и конструктор с добавлением товаров в корзину;
- локальная корзина с persisted state через `localStorage`;
- локальное оформление заказа без backend;
- локальные промокоды в корзине;
- хранение заказов и кастомных рам в `localStorage`.

## Скрипты

- `npm run dev` — локальная разработка;
- `npm run typecheck` — проверка TypeScript;
- `npm run lint` — проверка ESLint;
- `npm run test:unit` — unit tests для критичной pure-логики;
- `npm run build` — production build;
- `npm run preview` — локальный preview production build.

## Локальные промокоды

Поддерживаются фиксированные коды (промокоды):

- `ZIMA10`
- `VESNA20`
- `LETO30`
- `OSEN40`

Логика промокодов остаётся чисто фронтовой и вычисляется в pure helper-ах корзины.
