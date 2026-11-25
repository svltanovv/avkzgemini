# КГ Apple Village (`applevillage.kz`) — MVP

Сайт-лендинг клубного коттеджного городка **Apple Village** от застройщика **QZNA Development** (с. Туздыбастау, въезд с Кульджинского тракта).

## Стек
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4 (mobile-first, RU / KZ)
- **Хостинг и serverless:** Netlify (`netlify.toml`, `netlify/functions/submit-lead.mts`)
- **Генплан (39 участков):** локальный `src/data/lots.json` с готовым адаптером под Supabase (`src/services/lotsService.ts`)
- **Аналитика и CRM:** Яндекс.Метрика (Вебвизор + Карта кликов), GA4, делегированный трекинг `[data-track]` и `[data-lot-id]`, honeypot-защита форм и отправка заявок в amoCRM REST API v4.

## Локальный запуск
```bash
npm install
npm run dev
```

## Переменные окружения (Netlify)
См. полный список в [.env.example](./.env.example):
- `VITE_YM_ID`, `VITE_GA_ID` — счётчики Яндекс.Метрики и GA4
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — живые статусы 39 участков из таблицы `public.lots`
- `AMOCRM_SUBDOMAIN`, `AMOCRM_ACCESS_TOKEN`, `AMOCRM_PIPELINE_ID`, `AMOCRM_STATUS_ID` — интеграция `netlify/functions/submit-lead.mts` с amoCRM REST API v4 (scope: Functions)
