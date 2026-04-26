# VPN

## Anmerkung 

Hier wird gezeigt wie man Tailscale Konfiguriert man kann auch andere verwenden  

## Installation aus dem internet erlauben

```bash
sudo nano /etc/apt/sources.list
```

falls vorhanden muss folgende Zeile auskommentiert werden (# davor setzen):

    # deb cdrom:

## Tailscale installieren und starten

```bash
sudo apt update
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Nach `tailscale up` erscheint ein Link – diesen im Browser öffnen und mit dem Tailscale-Account einloggen. Wenn man keinen hat kann man ihn auf [Tailscale](https://tailscale.com) Kostenlos erstellen.

## Tailscale Testen

Status aller verbundenen Geräte prüfen:

```bash
tailscale status
```
