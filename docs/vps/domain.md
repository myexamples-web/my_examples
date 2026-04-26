# Domain 

## Bestellen 

Man kann direkt bei Netcup eine Domain bestellen hierbei sollte man beachten das man dies aus dem [CCP](https://www.customercontrolpanel.de/index.php?action=se) tun sollte da sonst ein neues Kundenkonto angelegt wird 

Wenn die domain bestellt wurde, sollte es irgendwann ankommen normalerweise innerhalb einer halben Stunde kann aber bis zu 48 Stunden dauern hierbei sollte man beachten das man denn Browser eventuell Schließen und neu öffnen muss damit die Änderungen sichtbar werden

## Records einrichten 

Wenn das geklappt hat, kann man in die [Domain einstellung](https://www.customercontrolpanel.de/domains.php) über das Lupen symbol kann man die Domain inspizieren und unter DNS die einträge ändern 

Wir gehen hier nur von dem Fall aus das alle subdomains auf denselben Server zeigen sollen, was man dann tun, muss ist Folgendes 

- TTL auf 300 
- Folgende Records haben 
  - A Record mit host `@` und Ziel: IP-Adresse des Servers 
  - A Record mit host `*` und Ziel: IP-Adresse des Servers
  - A Record mit host `www` und Ziel: IP-Adresse des Servers

Der Wildcard-Record (`*`) ist besonders praktisch: alle Subdomains (z.B. `portainer.domain.de`, `grafana.domain.de` usw.) zeigen automatisch auf den Server – ohne dass man für jede neue Subdomain einen eigenen DNS-Eintrag anlegen muss.

## DNS-Propagation prüfen

Nach dem Einrichten der Records kann es bis zu 24 Stunden dauern bis die Änderungen weltweit sichtbar sind (meist aber nur 5–30 Minuten). Ob die Domain schon auf die richtige IP zeigt prüft man mit:

```bash
nslookup domain.de
```

Erst wenn dort die IP-Adresse des Servers erscheint, kann man mit Certbot ein SSL-Zertifikat beantragen.

