# Benutzer

## Benutzer einrichten

```bash
sudo adduser deinbenutzername
sudo usermod -aG sudo deinbenutzername
```

<details>
<summary>Erklärung</summary>
    
    sudo usermod -aG sudo deinbenutzername

Fügt denn benutzer zur Sudo berechtigung gruppe hinzu
</details>

## Port umstellung für SSH 

```bash
sudo nano /etc/ssh/sshd_config
```

Port und PermitRootLogin suchen und ändern 

<strong style="color: red">Wichtig: </strong> Kommentar entfernen  

    Port 2222
    PermitRootLogin no

dann UFW für neuen SSH-Port anpassen (wichtig: in dieser Reihenfolge!)

```bash
sudo ufw allow 2222
sudo ufw deny 22
sudo systemctl restart ssh
```

<span style="color:red">Wichtig: </span> Bevor die alte SSH-Session geschlossen wird, in einem zweiten Fenster testen ob der neue Login funktioniert:

```bash
ssh benutzername@IP-Adresse -p 2222
```

Erst wenn das klappt die alte Session schließen – sonst ist man ausgesperrt!

Sobald das gemacht wurde muss man den Port immer mit angeben:

```bash
ssh benutzername@IP-Adresse -p 2222
```

## Optional: Automatische Sicherheitsupdates

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure unattended-upgrades
```

