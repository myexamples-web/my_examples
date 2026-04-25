# Server Aufsetzen 

## Server Bestellen 

Es gibt viele Anbieter hierbei wird der fokus auf [netcup](https://www.netcup.com/de?ref=126119&msclkid=c320609db6ea129f5dfc09410d452e09) gelegt 

zunächst muss ein [Server bestellt](https://www.netcup.com/de/server) werden 

sobald dies passiert ist erhält man eine Mail für denn CCP (Customer Control Panel) [hier](https://www.customercontrolpanel.de/?login_language=de-DE) kann man sich dann anmelden

sobald die bezahlung bei netcup eingegangen ist bekommt man eine Mail für SCP (Server Control Panel) anmelden kann [hier](https://www.servercontrolpanel.de/SCP/Home)

## Server Einrichten 

Nun kann man dem [Video](https://www.youtube.com/watch?v=4gu0Chx7poQ) folgen um seinen Server einzurichten mit dem Jeweiligen Betriebssystem

### Tastaturlayout in der VNC-Konsole

Die VNC-Konsole im SCP nutzt standardmäßig ein englisches Tastaturlayout (en-US). Bei einer deutschen Tastatur tippt man dadurch falsche Zeichen (z.B. `z` statt `y`). Es gibt zwei Möglichkeiten:

**Option 1: Im SCP das Layout ändern**
Im SCP oben rechts auf „Optionen" klicken und das Tastaturlayout auf Deutsch umstellen.

**Option 2: Per SSH verbinden (empfohlen)**
Per SSH wird das lokale Tastaturlayout des eigenen PCs verwendet – das Problem tritt dann gar nicht auf.

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

die IP-Adresse findet man im [SCP](https://www.servercontrolpanel.de/SCP/Home)

