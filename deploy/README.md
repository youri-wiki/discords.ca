# Déploiement de discords.ca

Le workflow GitHub construit `ghcr.io/youri-wiki/discords.ca:latest`. Le LXC de production ne contient aucun runner GitHub : il récupère cette image toutes les cinq minutes avec un minuteur systemd.

## Installation dans le LXC

Après l'installation de Docker et du plugin Docker Compose :

```sh
install -d -m 0755 /opt/discords-ca
install -m 0644 compose.production.yml /opt/discords-ca/compose.production.yml
install -m 0755 deploy/discords-ca-update.sh /usr/local/sbin/discords-ca-update
install -m 0644 deploy/discords-ca-update.service /etc/systemd/system/discords-ca-update.service
install -m 0644 deploy/discords-ca-update.timer /etc/systemd/system/discords-ca-update.timer
```

Créer `/opt/discords-ca/.env` avec l'adresse locale réelle du service IA :

```dotenv
AI_API_BASE_URL=http://ADRESSE_DU_SERVICE_IA:8000
```

Puis démarrer le premier déploiement et le minuteur :

```sh
systemctl daemon-reload
systemctl start discords-ca-update.service
systemctl enable --now discords-ca-update.timer
systemctl status discords-ca-update.timer
docker compose -f /opt/discords-ca/compose.production.yml ps
```

Le package GHCR doit être public. S'il reste privé, exécuter `docker login ghcr.io` avec un jeton limité à `read:packages` avant le premier déploiement.
