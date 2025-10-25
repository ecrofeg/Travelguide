# Инструкция по настройке деплоя на Yandex Cloud S3

## Необходимые GitHub Secrets

Для работы автоматического деплоя необходимо добавить следующие secrets в настройках вашего GitHub репозитория:

### Обязательные secrets:

1. **YC_ACCESS_KEY_ID** - Yandex Cloud Static Access Key ID
2. **YC_SECRET_ACCESS_KEY** - Yandex Cloud Secret Access Key
3. **S3_BUCKET_NAME** - Название S3 бакета (например, `my-travel-guide-app`)

## Как добавить secrets:

1. Откройте ваш GitHub репозиторий
2. Перейдите в `Settings` → `Secrets and variables` → `Actions`
3. Нажмите `New repository secret`
4. Добавьте каждый secret с соответствующим названием и значением

## Настройка Yandex Cloud

### Создание S3 бакета:

#### Через веб-консоль:

1. Откройте [Yandex Cloud Console](https://console.cloud.yandex.ru/)
2. Выберите каталог, в котором хотите создать бакет
3. Выберите сервис **Object Storage**
4. Нажмите **Создать бакет**
5. Укажите имя бакета (например, `my-travel-guide-app`)
6. Выберите **Публичный** доступ для чтения
7. Включите **Хостинг статического сайта**:
   - Главная страница: `index.html`
   - Страница ошибки: `index.html`
8. Нажмите **Создать бакет**

#### Через YC CLI:

```bash
# Установите YC CLI
curl https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash

# Инициализация
yc init

# Создание бакета
yc storage bucket create --name your-bucket-name --default-storage-class standard --public-read

# Настройка хостинга статического сайта
yc storage bucket update --name your-bucket-name --website-settings index=index.html,error=index.html
```

#### Через AWS CLI:

```bash
# Настройте AWS CLI с endpoint для Yandex Cloud
aws configure set aws_access_key_id YOUR_ACCESS_KEY_ID
aws configure set aws_secret_access_key YOUR_SECRET_ACCESS_KEY
aws configure set region ru-central1

# Создание бакета
aws --endpoint-url=https://storage.yandexcloud.net s3 mb s3://your-bucket-name

# Настройка для хостинга статического сайта
aws --endpoint-url=https://storage.yandexcloud.net s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

### Создание статических ключей доступа:

1. В [Yandex Cloud Console](https://console.cloud.yandex.ru/) перейдите в сервис **Service accounts**
2. Создайте новый сервисный аккаунт или выберите существующий
3. Назначьте роль `storage.editor` для редактирования объектов в бакете
4. Создайте статический ключ доступа:
   - Откройте сервисный аккаунт
   - Перейдите на вкладку **Статические ключи доступа**
   - Нажмите **Создать новый ключ**
   - Сохраните **Идентификатор ключа** (Access Key ID) и **Секретный ключ** (Secret Key)
5. Добавьте эти ключи в GitHub Secrets:
   - `YC_ACCESS_KEY_ID` = Идентификатор ключа
   - `YC_SECRET_ACCESS_KEY` = Секретный ключ

### Настройка публичного доступа:

Для публичного доступа к файлам установите ACL бакета через консоль или CLI:

```bash
# Через AWS CLI
aws --endpoint-url=https://storage.yandexcloud.net s3api put-bucket-acl --bucket your-bucket-name --acl public-read
```

Или настройте политику доступа в веб-консоли:
1. Откройте бакет в Object Storage
2. Перейдите на вкладку **Права доступа**
3. Выберите **Публичный** доступ на чтение

## Настройка CDN (опционально, но рекомендуется):

Yandex Cloud CDN обеспечивает:
- Быструю доставку контента через точки присутствия по всему миру
- HTTPS сертификат
- Защиту от DDoS
- Кеширование статических файлов

### Настройка через веб-консоль:

1. В [Yandex Cloud Console](https://console.cloud.yandex.ru/) выберите сервис **CDN**
2. Нажмите **Создать ресурс**
3. В качестве источника выберите **Бакет Object Storage**
4. Выберите ваш бакет из списка
5. Укажите доменное имя для CDN или используйте предоставленное
6. Настройте параметры кеширования:
   - Для статических файлов (JS, CSS, изображения): 1 год
   - Для HTML файлов: без кеширования
7. Включите HTTPS (сертификат Let's Encrypt или загрузите свой)
8. Нажмите **Создать**

### Настройка через YC CLI:

```bash
yc cdn resource create \
  --origin-bucket-name your-bucket-name \
  --origin-bucket-source your-bucket-name.storage.yandexcloud.net \
  --cname your-domain.com
```

## CORS настройки для S3:

Если приложение использует внешние API, добавьте CORS конфигурацию:

### Через веб-консоль:

1. Откройте бакет в Object Storage
2. Перейдите на вкладку **CORS**
3. Добавьте правило:
   - Allowed origins: `*`
   - Allowed methods: `GET`, `HEAD`
   - Allowed headers: `*`

### Через AWS CLI:

Создайте файл `cors.json`:

```json
{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": [],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

Примените конфигурацию:

```bash
aws --endpoint-url=https://storage.yandexcloud.net s3api put-bucket-cors --bucket your-bucket-name --cors-configuration file://cors.json
```

## Процесс деплоя:

После настройки всех secrets, деплой будет происходить автоматически:

1. При каждом push в ветку `master`
2. GitHub Actions выполнит:
   - Установку зависимостей
   - Сборку проекта
   - Загрузку файлов в Yandex Cloud S3

**Важно**: Workflow использует флаг `--delete` для удаления устаревших файлов, но исключает из удаления:
- Папку `images/` (где хранятся изображения для гайдов)
- Файл `travel-guides-data.json` (данные путеводителей)

Если вам нужно защитить другие файлы/папки от удаления, добавьте дополнительные `--exclude` параметры в файл `.github/workflows/deploy.yml`:

```yaml
--exclude "your-folder/*" --exclude "your-file.json"
```

## Проверка статуса деплоя:

Перейдите в раздел `Actions` вашего GitHub репозитория, чтобы увидеть статус и логи деплоя.

## URL для доступа:

После успешного деплоя ваше приложение будет доступно по адресу:

- **S3 (Website hosting)**: `http://your-bucket-name.website.yandexcloud.net`
- **S3 (прямой доступ)**: `https://storage.yandexcloud.net/your-bucket-name/index.html`
- **CDN** (если настроен): `https://your-cdn-domain.com` или автоматически созданный домен

## Кастомный домен (опционально):

Для использования собственного домена с CDN:

1. **Добавьте домен в CDN ресурс**:
   - Откройте ресурс CDN в консоли
   - Добавьте ваш домен в поле CNAME

2. **Настройте DNS**:
   - Создайте CNAME запись в вашем DNS провайдере
   - Укажите значение: `<cdn-resource-name>.gcdn.co` (см. в консоли CDN)

3. **Настройте SSL сертификат**:
   - Используйте Let's Encrypt (автоматически через Yandex Cloud)
   - Или загрузите свой сертификат в Certificate Manager

4. **Проверьте настройки**:
   ```bash
   # Проверьте DNS
   nslookup your-domain.com
   
   # Проверьте HTTPS
   curl -I https://your-domain.com
   ```

## Дополнительные настройки:

### Очистка кеша CDN:

Если используете CDN, для обновления закешированных файлов:

```bash
# Через YC CLI
yc cdn cache purge --resource-id <resource-id> --path /*
```

Или через веб-консоль:
1. Откройте ресурс CDN
2. Перейдите на вкладку **Кеш**
3. Нажмите **Очистить кеш**

### Мониторинг и логи:

1. **Статистика использования S3**:
   - В консоли Object Storage откройте бакет
   - Вкладка **Мониторинг** покажет объем хранилища и трафик

2. **CDN статистика**:
   - В консоли CDN откройте ресурс
   - Вкладка **Мониторинг** покажет трафик и количество запросов

3. **Логирование**:
   - Можно включить логирование запросов в отдельный бакет
   - Настраивается в свойствах бакета на вкладке **Логирование**

## Полезные ссылки:

- [Документация Object Storage](https://yandex.cloud/ru/docs/storage/)
- [Документация CDN](https://yandex.cloud/ru/docs/cdn/)
- [AWS CLI для Object Storage](https://yandex.cloud/ru/docs/storage/tools/aws-cli)
- [Хостинг статического сайта](https://yandex.cloud/ru/docs/storage/concepts/hosting)
