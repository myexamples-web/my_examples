# Firewall

## Anmerkung 

Hierbei wird die ufw (Uncomplicated Firewall) verwendet man kann auch andere benutzen 

## ufw Installieren und aktivieren

```bash
sudo ufw allow ssh
sudo ufw enable
```

status prüfen 

```bash
sudo ufw status
```

## ufw Konfigurieren 

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow ssh
sudo ufw enable
```

```bash
sudo ufw status
```

Dann sollte eine Statusabfrage ungefähr folgendes anzeigen 

    To          Action      From
    --          ------      ----
    22/tcp      ALLOW       Anywhere
    80/tcp      ALLOW       Anywhere
    443/tcp     ALLOW       Anywhere