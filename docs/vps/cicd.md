# CI/CD Pipeline & Repository-Struktur

## GitHub Personal Access Token

Um private Repositories auf dem Server zu clonen oder zu pullen braucht man einen GitHub Personal Access Token.

**Token erstellen** auf github.com:
1. Oben rechts auf Profilbild → **Settings**
2. Links ganz unten → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)**
5. Note: z.B. `vserver`, Expiration: z.B. 90 days
6. Scope: Haken bei **`repo`** setzen
7. **Generate token** → Token sofort kopieren (wird nur einmal angezeigt!)

Token beim Clonen verwenden:

```bash
git clone https://TOKEN@github.com/BENUTZERNAME/REPONAME.git
```

---

## Repository-Struktur

Trenne deinen Code in zwei Arten von Repositories:

- **Infrastruktur-Repo** – enthält alle Docker Compose Dateien, nginx-Configs und Deployment-Skripte
- **App-Repos** – enthalten den Quellcode deiner Anwendungen (z.B. Java-Projekte)

## Infrastruktur-Repo einrichten

Auf GitHub ein neues privates Repository erstellen (z.B. `homelab-infra`), dann auf dem Server:

```bash
mkdir -p ~/infra
cd ~/infra
git init
git remote add origin https://TOKEN@github.com/BENUTZERNAME/homelab-infra.git
```

Empfohlene Ordnerstruktur:

```bash
mkdir -p ~/infra/nginx/conf.d
mkdir -p ~/infra/services/portainer
mkdir -p ~/infra/services/authentik
mkdir -p ~/infra/services/grafana
```

Bestehende Configs rüberkopieren:

```bash
cp ~/nginx/docker-compose.yml ~/infra/nginx/
cp ~/nginx/conf.d/* ~/infra/nginx/conf.d/
cp ~/services/portainer/docker-compose.yml ~/infra/services/portainer/
```

`.gitignore` erstellen damit keine Secrets ins Repo kommen:

```bash
nano ~/infra/.gitignore
```

```
*.env
.env
secrets/
```

Alles committen und pushen:

```bash
cd ~/infra
git add .
git commit -m "Initial infrastructure setup"
git branch -M main
git push -u origin main
```

---

## CI/CD Pipeline mit GitHub Actions

Eine typische Pipeline:
1. Code wird auf GitHub gepusht
2. GitHub Actions baut das Docker-Image
3. Image wird zu Docker Hub gepusht
4. Pipeline verbindet sich per SSH zum VPS
5. Führt `docker compose pull` + `docker compose up -d` aus

## GitHub Actions Workflow erstellen

Im App-Repo:

```bash
mkdir -p .github/workflows
nano .github/workflows/deploy.yml
```

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment: prod

    steps:
      - name: Code auschecken
        uses: actions/checkout@v3

      - name: Docker login
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Image bauen und pushen
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/IMAGENAME:latest

      - name: Per SSH deployen
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT }}
          script: |
            cd ~/services/SERVICENAME
            docker compose pull
            docker compose up -d
```

## SSH Key für GitHub Actions generieren

Auf dem Server:

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions -N ""
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_actions
```

Den kompletten Inhalt (von `-----BEGIN` bis `-----END`) kopieren → wird als `VPS_SSH_KEY` Secret gespeichert.

## GitHub Secrets einrichten

Im App-Repo: **Settings → Environments → prod → Add secret**

| Secret | Wert |
|---|---|
| `DOCKER_USERNAME` | Docker Hub Benutzername |
| `DOCKER_PASSWORD` | Docker Hub Passwort |
| `VPS_HOST` | IP-Adresse des Servers |
| `VPS_USER` | SSH-Benutzername (z.B. `steuerung`) |
| `VPS_SSH_KEY` | Inhalt von `~/.ssh/github_actions` |
| `VPS_PORT` | SSH-Port (z.B. `2222`) |

<span style="color:red">Wichtig: </span> Die Secrets müssen im selben Environment angelegt werden das im Workflow unter `environment:` angegeben ist (hier: `prod`).

## docker-compose.yml im Service-Ordner

Damit der Deploy-Schritt funktioniert, muss eine `docker-compose.yml` im Service-Ordner auf dem Server liegen:

```yaml
services:
  SERVICENAME:
    image: DOCKERHUB_BENUTZERNAME/IMAGENAME:latest
    container_name: SERVICENAME
    restart: always
    networks:
      - proxy

networks:
  proxy:
    external: true
```

## Pipeline testen

Eine kleine Änderung comitten und pushen:

```bash
git add .
git commit -m "test pipeline"
git push
```

Dann im GitHub Repo unter **Actions** den Status prüfen:
- Gelb = läuft gerade
- Grün = erfolgreich
- Rot = Fehler mit Logs
