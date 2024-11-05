---
layout: doc
---

# Sécurité dans un environnement Docker

La sécurité dans un environnement Docker est essentielle pour protéger les applications et les données. 
Voici un ensemble de bonnes pratiques et de lignes de défense à suivre pour renforcer la sécurité.

## Utiliser des images fiables et légères

### Images vérifiées

Choisir des **images officielles** ou provenant de sources reconnues, 
car elles sont régulièrement mises à jour et auditées pour les failles de sécurité. 
Les images officielles sur **Docker Hub**, marquées par un badge "verified publisher", sont idéales.

### Images légères

Les images minimalistes (comme **Alpine Linux**) réduisent la surface d'attaque et
les vulnérabilités potentielles en incluant uniquement les composants essentiels. 
Moins de logiciels embarqués signifie moins de risques de failles de sécurité.

## Éviter l'exécution en tant que *root*

### Risques du root

Exécuter des conteneurs avec l’utilisateur root donne des privilèges élevés qui, en cas de vulnérabilité, peuvent compromettre le système hôte.

### Utilisateurs non privilégiés

Configurer un utilisateur non root dans le fichier Dockerfile en utilisant l’instruction `USER`. Par exemple :

```Dockerfile
USER appuser
```

Cela réduit les permissions par défaut du conteneur et limite les risques d'exploitation.

## Gérer les *secrets* de manière sécurisée

Il est préférable de ne pas stocker de données sensibles dans des variables d'environnement qui peuvent être exposées facilement. 
Utiliser plutôt des fichiers sécurisés ou le service de gestion de secrets intégré de Docker, **Docker secrets**.

## Isoler les réseaux et les volumes

### Réseaux dédiés

Configurer des réseaux Docker dédiés pour chaque service ou groupe de services. 
L’**isolation réseau** réduit la visibilité des conteneurs entre eux, augmentant ainsi la sécurité.

```bash
docker network create my_secure_network
docker run --network my_secure_network ...
```

### Accès aux volumes

Limiter les volumes aux fichiers et répertoires nécessaires et utiliser des **permissions restreintes** pour éviter l’accès à des données sensibles. 
Cela empêche également les conteneurs compromis d’accéder à l’intégralité du système de fichiers de l’hôte.

## Scanner les images pour les vulnérabilités

### Scan de vulnérabilités

Utiliser des outils comme **Trivy** ou **Clair** pour scanner les images Docker, 
afin de détecter des **logiciels obsolètes** ou présentant des **failles de sécurité**.

### Automatisation des scans

Intégrer les scans dans les **pipelines CI/CD** pour tester automatiquement les images au moment de leur création, 
maintenant ainsi un haut niveau de sécurité et prévenant les risques avant le déploiement en production.

## Limiter les ressources des conteneurs

### Prévention des attaques DoS

Configurer des **limites de CPU** et de **mémoire** sur chaque conteneur pour éviter qu’une application ou un service ne consomme toutes les ressources disponibles.

```bash
docker run --memory="256m" --cpus="1.0" ...
```

Les paramètres `--memory` et `--cpus` définissent les limites de mémoire et de processeur respectivement, garantissant une meilleure gestion des ressources du système.

## Surveillance et journalisation

Utiliser des outils de **monitoring** comme **Prometheus** et **Grafana** pour suivre l’état des conteneurs et détecter toute activité anormale.

Activer la **journalisation** des événements pour garder un **historique des opérations**. 
En cas d'incident, les journaux permettent de comprendre ce qui s'est passé, d’identifier des failles potentielles et d’ajuster la sécurité.

### Alertes en temps réel

Configurer des alertes sur des événements spécifiques, comme des **pics** de consommation de ressources, pour une réponse rapide aux incidents.
