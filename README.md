# web-portfolio

Статическое портфолио для профиля GitHub `artemk1337`.

## Что внутри

- `index.html` - одна страница с hero, проектами, статьями/выступлениями, стеком и контактами
- `styles.css` - вся визуальная часть
- `script.js` - год в футере и мягкие reveal-анимации
- `nginx/site.conf` - пример конфига для VPS
- `Caddyfile` - пример для Caddy, если понадобится

## Локальный запуск

Самый простой вариант:

```bash
python3 -m http.server 8080
```

Откройте `http://localhost:8080`.

## Деплой на VPS

### Nginx

1. Скопируйте файлы сайта в `/var/www/portfolio`.
2. Создайте виртуальный хост на основе `nginx/site.conf`.
3. Укажите `root /var/www/portfolio;`.
4. Проверьте конфиг и перезагрузите nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Подготовка сервера

Если nginx ещё не установлен:

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable --now nginx
```

Откройте в firewall только `80/tcp` и `443/tcp`, если используете HTTPS.

### Caddy

`Caddyfile` оставлен как запасной вариант, но для вашего сценария nginx проще и легче.

## Настройка

Если захотите, можно быстро заменить:

- email и Telegram в блоке контактов
- ссылки на проекты
- ссылки на статьи и выступления
- тексты в hero и about
- домен в nginx или Caddy конфиге
