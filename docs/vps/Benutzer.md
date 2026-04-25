# Benutzer

### Benutzer einrichten 

- Benutzer erstellen
- sudo berechtigung hinzufügen   

```bash
sudo adduser deinbenutzername
sudo usermod -aG sudo deinbenutzername
```

### Port für SSH umstellen 

```bash
sudo nano /etc/ssh/sshd_config
```

- SSH port auf 2222 setzten 
- RootLogin abschalten 

Port und PermitRootLogin suchen und ändern zu wichtig Kommentar entfernen also # wegmachen  

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

Windows 
```bash
ssh benutzername@IP-Adresse -p 2222
```

Linux/Mac 
```bash
ssh -p 2222 benutzername@IP-Adresse
```

Optional Automatische Sicherheitsupdates

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure unattended-upgrades
```

