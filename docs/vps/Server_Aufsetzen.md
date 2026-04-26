# Server Aufsetzen 

## Server Bestellen 

zunächst muss ein [Server bestellt](https://www.netcup.com/de/server) werden 

sobald dies passiert ist erhält man eine Mail für denn [CCP (Customer Control Panel)](https://www.customercontrolpanel.de/?login_language=de-DE) wo man sich dann anmelden kann 

sobald die bezahlung bei netcup eingegangen ist bekommt man eine Mail für den [SCP (Server Control Panel)](https://www.servercontrolpanel.de/SCP/Home), bei dem man sich anmelden kann [hier]

## Server Einrichten 

Nun kann man dem [Video](https://www.youtube.com/watch?v=4gu0Chx7poQ) folgen, um seinen Server einzurichten

## Tastaturlayout

Die VNC-Konsole im SCP nutzt standardmäßig ein englisches Tastaturlayout (en-US). Bei einer deutschen Tastatur tippt man dadurch falsche Zeichen (z.B. `z` statt `y`).

Im SCP oben rechts auf „Optionen" klicken und das Tastaturlayout auf Deutsch umstellen.

## SSH Aktivieren

Wenn dies erfolgt ist kann man im [SCP](https://www.servercontrolpanel.de/SCP/Home) ein Terminal öffnen und folgenden Kommand eingeben um SSH zu aktivieren 

```bash
sudo apt update
sudo apt install openssh-server -y
sudo systemctl enable ssh
sudo systemctl start ssh
```

danach kann man sich via ssh verbinden (Windows und Linux ist in diesem fall gleich)

```bash
ssh benutzername@IP-ADRESSE
```
