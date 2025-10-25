# Настройка структуры проекта для GitHub

## Текущая ситуация
Все файлы проекта сейчас находятся в одной папке. При загрузке на GitHub они попадают в папку `src/`.

## Требуемая структура GitHub репозитория

Вам нужно создать следующую структуру в вашем GitHub репозитории:

```
your-github-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions для автоматического деплоя
├── src/                         # ← Сюда переместить ВСЕ текущие файлы
│   ├── App.tsx
│   ├── i18n.ts
│   ├── components/
│   ├── data/
│   ├── locales/
│   ├── styles/
│   ├── utils/
│   ├── guidelines/
│   └── Attributions.md
├── package.json                 # ← Создать в корне
├── vite.config.ts              # ← Создать в корне
├── tsconfig.json               # ← Создать в корне
├── tailwind.config.js          # ← Создать в корне
├── postcss.config.js           # ← Создать в корне
├── index.html                  # ← Создать в корне
├── .gitignore                  # ← Создать в корне
└── README.md                   # ← Создать в корне
```

## Шаги для настройки

### 1. Скопируйте файлы из этого проекта

Скопируйте следующие файлы, которые я создал:
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tailwind.config.js`
- `postcss.config.js`
- `index.html`
- `.gitignore`
- `README.md`
- `.github/workflows/deploy.yml` (если нужен автодеплой)

### 2. Переместите все остальные файлы в папку `src/`

В GitHub репозитории создайте папку `src/` и переместите туда:
- App.tsx
- i18n.ts
- components/
- data/
- locales/
- styles/
- utils/
- guidelines/
- Attributions.md

### 3. Установите зависимости

```bash
npm install
```

### 4. Проверьте сборку

```bash
npm run build
```

Должна создаться папка `dist/` с собранным проектом.

### 5. Закоммитьте изменения

```bash
git add .
git commit -m "Setup proper project structure"
git push origin master
```

## Настройка GitHub Actions для автодеплоя

Если вы хотите настроить автоматический деплой на Yandex Cloud S3, добавьте следующие секреты в настройках вашего GitHub репозитория:

Settings → Secrets and variables → Actions → New repository secret:

- `YC_ACCESS_KEY_ID` - Ваш Access Key ID от Yandex Cloud
- `YC_SECRET_ACCESS_KEY` - Ваш Secret Access Key от Yandex Cloud
- `S3_BUCKET_NAME` - Имя вашего S3 bucket

После этого при каждом push в ветку `master` проект будет автоматически собираться и деплоиться на S3.
