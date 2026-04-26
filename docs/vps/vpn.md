# VPN

Hier wird gezeigt wie man Tailscale configuriert 

### Installation aus dem internet erlauben

```bash
sudo nano /etc/apt/sources.list
```

falls vorhanden muss folgende Zeile auskommentiert werden (# davor setzen):

    # deb cdrom:

### Tailscale installieren und starten

```bash
sudo apt update
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Nach `tailscale up` erscheint ein Link – diesen im Browser öffnen und mit dem Tailscale-Account einloggen. Noch keinen Account? Kostenlosen Account erstellen auf [tailscale.com](https://tailscale.com).

Status aller verbundenen Geräte prüfen:

```bash
tailscale status
```
