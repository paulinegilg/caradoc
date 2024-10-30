---
layout: doc
---

# Docker compose

Jusqu'à présent, nous avons vu des commandes CLI (en ligne de commande), unitaires, peu lisibles et peu maintenables.

Docker compose permet d'améliorer la situation.

## Docker compose, c'est quoi ?

Docker compose nous permet de définir et gérer des applications multi-conteneurs en utilisant un fichier de configuration, 
généralement nommé `docker-compose.yml`, au format YAML.

Ainsi, on peut facilement orchestrer le lancement, l’arrêt et la gestion de plusieurs conteneurs, 
souvent utilisés dans des architectures de microservices. 
C'est particulièrement utile pour les environnements de développement et les configurations complexes.

## Le format YAML

YAML (*YAML Ain't Markup Language*) est un langage de sérialisation de données simple et lisible, utilisé pour les fichiers de configuration. 
Il repose sur des indentations pour structurer les données, utilise des paires clé/valeur pour les objets et des tirets pour les listes. 

YAML est largement adopté dans des outils comme Docker et Kubernetes grâce à sa lisibilité et sa facilité d’utilisation.

Pour plus de détails, voici la [documentation YAML](https://yaml.org/).

::: tip Conseil
La cohérence de la syntaxe peut être vérifiée par l'outil [yamllint](https://www.yamllint.com/).
:::

## Utilisations principales

1. **Définir des configurations multi-conteneurs** : En un seul fichier YAML, on peut définir plusieurs services 
(par exemple, une base de données, une API et une interface web), leurs ports, réseaux et volumes, simplifiant ainsi le déploiement.
On appelle cela une **stack**.

2. **Simplifier les commandes** : Au lieu de lancer chaque conteneur avec `docker run`, une simple commande `docker-compose up` 
permet de démarrer tous les services avec les configurations spécifiées.

3. **Gestion centralisée des paramètres** : Les variables d'environnement, les volumes partagés, les dépendances de réseau, 
et autres configurations sont centralisées dans le fichier `docker-compose.yml`.

## Exemple de fichier `docker-compose.yml`

Un fichier pourrait ressembler à ceci :

```yaml
version: '1.0'

services:
  web:
    image: my-web-app:latest
    build:
      context: ./web
    ports:
      - "8000:80"  # Expose le port 80 du conteneur sur le port 8000 de l'hôte
    volumes:
      - web_data:/usr/src/app/data  # Montre le volume "web_data" dans le conteneur
    networks:
      - app-network  # Connecte le service au réseau "app-network"

  database:
    image: postgres:latest
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - db_data:/var/lib/postgresql/data  # Persiste les données de la base de données
    networks:
      - app-network  # Connecte le service au même réseau

volumes:
  web_data:  # Déclare le volume pour le service web
  db_data:   # Déclare le volume pour le service de base de données

networks:
  app-network:  # Crée un réseau personnalisé pour l'application
```

## Commandes clés

```bash
# Démarrer tous les services définis
docker-compose up
# Forcer l'utilisation d'un fichier ayant un autre nom 
# ou n'étant pas présent dans le répertoire courant
docker compose -f fichier_compose.yml up
# Démarrer tous les services définis en mode détaché
docker compose up -d

# Arrêter et supprimer les conteneurs
docker-compose down

# Valider la syntaxe et afficher la configuration du fichier compose
docker-compose config

# Afficher les logs des différents services
docker-compose logs

# Lister les services de la stack
docker compose ls

# Lister les conteneurs d'une stack
docker compose ps
```

Docker compose est ainsi essentiel pour simplifier le déploiement et la gestion des applications complexes basées sur plusieurs conteneurs.

## Fichier compose avec un build intégré

Un fichier compose avec un build intégré est un fichier `docker-compose.yml` qui définit non seulement les services à déployer, 
mais aussi comment construire les images Docker directement à partir des fichiers source présents dans le projet. 
Cela permet de spécifier un contexte de construction, ainsi que des instructions supplémentaires, 
comme les arguments de construction ou les Dockerfile spécifiques.

```yaml
version: '1.0'

services:
  web:
    build:                # Instruction pour construire l'image
      context: ./web      # Répertoire contenant le Dockerfile
      dockerfile: Dockerfile  # Nom du Dockerfile (facultatif)
    ports:
      - "8000:80"         # Mapping des ports
    volumes:
      - ./web:/usr/src/app  # Volume pour le code source

  database:
    image: postgres:latest
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

La section `build` spécifie comment construire l'image pour le service :

- `context` indique le chemin vers le répertoire contenant le Dockerfile et les fichiers nécessaires pour la construction
- `dockerfile` (facultatif) permet de spécifier un nom différent pour le Dockerfile, s'il n'est pas nommé Dockerfile (ou dockerfile)

## Variabilisation d'un compose

**Variabiliser** un fichier compose signifie utiliser des **variables d'environnement** dans le fichier `docker-compose.yml`.

### Avantages

- **Flexibilité** : Facilite le changement de configuration sans modifier le fichier de composition.
- **Réutilisabilité** : Permet de réutiliser le même fichier pour différents environnements (développement, test, production) en changeant simplement le fichier `.env`.
- **Sécurité** : Aide à ne pas exposer directement des valeurs sensibles dans le fichier de configuration, surtout si vous utilisez un fichier `.env` qui n'est pas inclus dans le contrôle de version (via `.gitignore`).

### Procédure

1. **Définir les variables d'environnement** : Les variables sont définies dans un fichier `.env`.

2. **Intégrer les variables dans `docker-compose.yml`** : On utilise la syntaxe `${VARIABLE_NAME}` pour faire référence aux variables définies.

### Exemple d'utilisation

Voici comment cela s'articule en pratique :

#### Création d'un fichier `.env`

Dans le même répertoire que le fichier `docker-compose.yml`, on crée un fichier nommé `.env` pour y définir vos variables d'environnement :

```plaintext
# .env
WEB_PORT=8000
DB_NAME=mydatabase
DB_USER=user
DB_PASSWORD=password
```

#### Utilisation des variables dans `docker-compose.yml`

Voici un exemple de fichier `docker-compose.yml` qui utilise ces variables :

```yaml
version: '1.0'

services:
  web:
    image: my-web-app:latest
    build:
      context: ./web
    ports:
      - "${WEB_PORT}:80"  # Utilisation de la variable WEB_PORT
    volumes:
      - ./web:/usr/src/app

  database:
    image: postgres:latest
    environment:
      POSTGRES_DB: ${DB_NAME}      # Utilisation de la variable DB_NAME
      POSTGRES_USER: ${DB_USER}    # Utilisation de la variable DB_USER
      POSTGRES_PASSWORD: ${DB_PASSWORD}  # Utilisation de la variable DB_PASSWORD
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

### Lancement de Docker compose

Lorsqu'on exécute `docker compose up`, Docker compose lira le fichier `.env` et remplacera les variables dans le fichier `docker-compose.yml` par leurs valeurs définies.

## Health check

Un **health check** dans Docker vérifie l'état de santé d'un conteneur en exécutant régulièrement une commande. 
Pour l'intégrer dans un fichier `docker-compose.yml`, on utilise la section `healthcheck`.

```yaml
services:
  web:
    image: my-web-app:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

Dans cet exemple, la commande `curl` vérifie l'URL `http://localhost/health` toutes les 30 secondes. 
Si la commande échoue trois fois de suite, le conteneur est déclaré défaillant, ce qui permet à Docker de redémarrer automatiquement le service si nécessaire. 
Cela améliore la fiabilité et la résilience de l'application.