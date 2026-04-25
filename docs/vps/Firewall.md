# Firewall

## Anmerkung 

Hierbei wird die ufw (Uncomplicated Firewall) 

ufw Installieren und aktivieren

```bash
sudo ufw allow ssh
sudo ufw enable
```

status prüfen 

```bash
sudo ufw status
```

- Eingehende 
- - 80/443 Erlauben
- - Rest Ablehnen
- Ausgehende 
- - Alles erlauben 
- SSH erlauben 

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow ssh
sudo ufw enable
```

Dann sollte eine Statusabfrage ungefähr folgendes anzeigen 

    To          Action      From
    --          ------      ----
    22/tcp      ALLOW       Anywhere
    80/tcp      ALLOW       Anywhere
    443/tcp     ALLOW       Anywhere