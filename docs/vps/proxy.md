# nginx Reverse Proxy 

wie machen das beispiel mit Portainer einer Managment platform für Docker container 

## nginx Ordnerstruktur

<span style="color:red">Wichtig: </span> domain.de ersetzten im command


```bash
mkdir -p ~/nginx/conf.d
mkdir -p ~/nginx/ssl
```

## Portainer Konfiguration

```bash
nano ~/nginx/conf.d/portainer.domain.de.conf
```

dort wird nun folgendes konfiguriert

<span style="color:red">Wichtig: </span> domain ersetzten im command
```yaml
server {
    listen 80;
    server_name portainer.domain.de;

    location / {
        proxy_pass http://portainer:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

<details>
<summary>Erklärung</summary>

    listen 80;

hört auf dem port 80

    server_name portainer.domain.de;

ist für die Domain portainer.domain.de zuständig 

    proxy_pass http://portainer:9000;

leitet alle anfragen die kommen an den Portainer Container weiter 

        proxy_set_header Host $host;

gibt dem Backend die originale Domain weiter

        proxy_set_header X-Real-IP $remote_addr;

gibt die echte IP des Besuchers weiter

    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

vollständige IP-Kette bei mehreren Proxies

</details>

## nginx Konfiguration

```bash
nano ~/nginx/docker-compose.yml
```

dort wird nun folgendes konfiguriert
```yaml
services:
    nginx:
        image: nginx:latest
        container_name: nginx
        ports:
            - "80:80"
            - "443:443"
        volumes:
            - ./conf.d:/etc/nginx/conf.d
            - ./ssl:/etc/nginx/ssl
        networks:
            - proxy

networks:
    proxy:
        external: true
```

<details>
<summary>Erklärung</summary>

Startet einen nginx Container als reverse Proxy mit folgenden eigenschaften 
- hört auf 80/443
- leitet weiter an 
  - alle Services (conf.d) 
  - alle ssl Zertifikat in ssl 
</details>

## Netzwerk starten

```bash
sudo apt install --reinstall apparmor -y
sudo systemctl restart apparmor
sudo systemctl start docker
sudo systemctl enable docker
docker network create proxy
cd ~/nginx
docker compose up -d
```

## Zertifikat erstellen 

<span style="color:red">Wichtig: </span> domain ersetzten im command

```bash
sudo apt install certbot -y
cd ~/nginx
docker compose down
sudo certbot certonly --standalone -d domain.de -d www.domain.de -d portainer.domain.de
nano ~/nginx/conf.d/portainer.domain.de.conf
```

Die Konfiguration von vorher wird jetzt ersetzt um aus dem HTTP ein HTTPS zu machen 

<span style="color:red">Wichtig: </span> domain ersetzten im command

```yaml
server {
    listen 80;
    server_name portainer.domain.de;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name portainer.domain.de;

    ssl_certificate /etc/letsencrypt/live/domain.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domain.de/privkey.pem;

    location / {
        proxy_pass http://portainer:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
nano ~/nginx/docker-compose.yml
```

hier muss unter volumes folgendes hinzugefügt werden damit nginx die SSL-Zertifikate sehen kann
```yaml
services:
    nginx:
        image: nginx:latest
        container_name: nginx
        ports:
            - "80:80"
            - "443:443"
        volumes:
            - ./conf.d:/etc/nginx/conf.d
            - ./ssl:/etc/nginx/ssl
            - /etc/letsencrypt:/etc/letsencrypt:ro
        networks:
            - proxy

networks:
    proxy:
        external: true
```

## Portainer starten

```bash
docker network create proxy
cd ~/nginx
docker compose up -d
```