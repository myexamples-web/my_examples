# SSO (Single Sign-On)

### Ordnerstruktur 

```bash
mkdir -p ~/authentik
nano ~/authentik/docker-compose.yml
```

in die datei dann folgendes Konfigifurieren 

```yaml
services:
  postgresql:
    image: postgres:16
    container_name: authentik-db
    environment:
      POSTGRES_DB: authentik
      POSTGRES_USER: authentik
      POSTGRES_PASSWORD: sicherespasswort123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - proxy

  redis:
    image: redis:alpine
    container_name: authentik-redis
    networks:
      - proxy

  authentik-server:
    image: ghcr.io/goauthentik/server:latest
    container_name: authentik-server
    command: server
    environment:
      AUTHENTIK_REDIS__HOST: redis
      AUTHENTIK_POSTGRESQL__HOST: postgresql
      AUTHENTIK_POSTGRESQL__USER: authentik
      AUTHENTIK_POSTGRESQL__PASSWORD: sicherespasswort123
      AUTHENTIK_POSTGRESQL__NAME: authentik
      AUTHENTIK_SECRET_KEY: einlangersecretkey123456789abc
    volumes:
      - ./media:/media
      - ./custom-templates:/templates
    networks:
      - proxy

  authentik-worker:
    image: ghcr.io/goauthentik/server:latest
    container_name: authentik-worker
    command: worker
    environment:
      AUTHENTIK_REDIS__HOST: redis
      AUTHENTIK_POSTGRESQL__HOST: postgresql
      AUTHENTIK_POSTGRESQL__USER: authentik
      AUTHENTIK_POSTGRESQL__PASSWORD: sicherespasswort123
      AUTHENTIK_POSTGRESQL__NAME: authentik
      AUTHENTIK_SECRET_KEY: einlangersecretkey123456789abc
    volumes:
      - ./media:/media
    networks:
      - proxy

volumes:
  postgres_data:

networks:
  proxy:
    external: true
```

### Config erstellen 

<span style="color:red">Wichtig: </span> vorher folgendes ändern:
- `sicherespasswort123` → ein eigenes sicheres Passwort
- `einlangersecretkey123456789abc` → ein zufälliger langer String, generieren mit:

```bash
openssl rand -base64 32
```

<span style="color:red">Wichtig: </span> domain ersetzten im command

```bash
nano ~/nginx/conf.d/authentik.domain.de.conf
```

```nginx
server {
    listen 80;
    server_name authentik.domain.de;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name authentik.domain.de;

    ssl_certificate /etc/letsencrypt/live/domain.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domain.de/privkey.pem;

    location / {
        proxy_pass http://authentik-server:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Authentik starten 

```bash
cd ~/authentik
docker compose up -d
```
