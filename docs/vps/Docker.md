# Docker 

- Alles von Docker was eventuell vorinstalliert ist löschen 
- dependencies installieren 

```bash
sudo apt remove docker docker-engine docker.io containerd runc
sudo apt update
sudo apt install ca-certificates curl gnupg -y
```

### Docker  GPG-Key einrichten 

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

### Docker Repository hinzufügen 

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Docker installieren 

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

### Benutzer berechtigungen für docker geben 

```bash
sudo usermod -aG docker benutzername
```

### Docker testen 

```bash
docker --version
docker compose version
```
