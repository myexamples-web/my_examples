# Docker Compose Struktur 

## Ordnerstruktur erstellen

Jeder Service bekommt einen eigenen Ordner mit einer `docker-compose.yml`. Die Grundregeln:

- Jeder Service → eigener Ordner unter `~/services/`
- Immer `network: proxy` damit nginx ihn erreichen kann
- Immer `restart: always` damit der Container nach Neustart automatisch startet
- Datenpersistenz immer über `volumes`

```bash
mkdir -p ~/services/portainer
mkdir -p ~/services/authentik
mkdir -p ~/services/grafana
```

## Portainer config

```bash
nano ~/services/portainer/docker-compose.yml
```

```yaml
services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data
    networks:
      - proxy

volumes:
  portainer_data:

networks:
  proxy:
    external: true
```

## Grafana config

```bash
nano ~/services/grafana/docker-compose.yml
```

```yaml
services:
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: always
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=sicherespasswort
    networks:
      - proxy

volumes:
  grafana_data:

networks:
  proxy:
    external: true
```

## Services starten

```bash
cd ~/services/portainer && docker compose up -d
cd ~/services/grafana && docker compose up -d
```

## Alle laufenden Container prüfen

```bash
docker ps
```
