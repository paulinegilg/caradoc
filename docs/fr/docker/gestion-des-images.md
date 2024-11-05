---
layout: doc
---

# Gestion des images (*Dockerfile*)

Un *Dockerfile* est un fichier texte qui définit les **instructions pour créer une image Docker**. 

Il sert à **automatiser la création** d'environnements de conteneur de manière **reproductible** et **standardisée**, 
facilitant ainsi le développement et le déploiement d'applications.

Les noms par défaut du fichier sont `Dockerfile` ou `dockerfile`.

## Instructions du Dockerfile

### `FROM`

Le Dockerfile doit commencer par une instruction `FROM`.
Il s'agit de l'image de départ, qui sera amenée à subir les instructions suivantes.

```dockerfile
FROM node:20-alpine
```

### `WORKDIR`

Définit le répertoire de travail pour les instructions suivantes.

```dockerfile
WORKDIR /app
```

### `COPY`

Copie des fichiers du contexte vers l'image.

```dockerfile
COPY package*.json ./
```

### `ADD`

Permet également de copier des fichiers du contexte vers l'image, mais contrairement à `COPY`, cette commande
permet de récupérer des archives tar/tar.gz et des fichiers depuis une URL.

```dockerfile
ADD https://example.com/files.tar.xz .
```

### `RUN`

Exécute des commandes à l'intérieur de l'image.

À l'exécution de la commande, un nouveau conteneur provisoire est créé et le résultat est enregistré dans une nouvelle image.

::: warning Attention
Chaque instruction `RUN` va générer [une nouvelle couche ou *layer*](/fr/docker/images.html#le-systeme-de-couches-dans-docker).

Il est donc recommandé de regrouper les commandes `RUN` pour éviter de créer des couches inutiles.

```dockerfile
# Éviter
RUN apt-get update
RUN apt-get install git
RUN apt-get install curl

# Privilégier
RUN apt-get update && apt-get install git curl
```
:::

### `ENV`

Définit des variables d'environnement.

Ces variables sont incluses dans le conteneur final et restent disponibles pour toute la durée de vie de celui-ci.
C'est utile pour configurer des variables persistantes, comme des chemins ou des configurations nécessaires à l’application en exécution.

```dockerfile
# Affectation de la variable
ENV ENVIRONMENT=production

# Utilisation de la variable dans le Dockerfile
RUN echo "Deploying to ${ENVIRONMENT}"
```

### `ARG`

Définit des variables qui seront passées comme arguments au sein du Dockerfile lors du build. 
Les valeurs sont passées par l'option `--build-arg NOM=valeur`.

Contrairement aux variables créées avec `ENV`, elles ne sont pas présentes dans le conteneur final.

Elles sont idéales pour passer des valeurs temporaires nécessaires uniquement lors de la construction, 
comme des chemins ou clés d'API pour le build.

### `USER`

Définit le compte (utilisateur) qui exécute les instructions. 

```dockerfile
USER bob
```

### `ENTRYPOINT`

Définit le processus principal que le conteneur exécutera au démarrage. 

`ENTRYPOINT` fixe une commande par défaut (par exemple, le lancement d’une application) 
et est utile pour garantir que le conteneur exécute toujours une tâche précise dès son lancement.

::: info Remarques
- L'`ENTRYPOINT` peut être un script shell ou un programme exécutable. Si c'est le cas, 
il faut penser à l'ajouter dans l'image avec `COPY` ou `ADD`
- L'`ENTRYPOINT` peut être surchargé lors du lancement du conteneur avec l'option `--entrypoint`
:::

```dockerfile
FROM debian:12
COPY init.sh /
ENTRYPOINT ["/init.sh"]
```

### `LABEL`

Permet d'ajouter des métadonnées à une image.

```dockerfile
LABEL version="1.0"
LABEL description="My first docker image"
LABEL maintainer="Bob"
```

### `CMD`

Définit la commande qui sera exécutée lors du lancement du conteneur.

2 cas possibles : 

- Si un `ENTRYPOINT` est défini, alors `CMD` sera un argument du processus `ENTRYPOINT`
- Si `ENTRYPOINT` n'est pas défini, alors `CMD` sera réellement le processus initial

### `EXPOSE`

Cette commande spécifie quel(s) port(s) le conteneur rend disponible pour les connexions réseau. 
Elle indique aux autres conteneurs ou services quel port utiliser pour communiquer avec ce conteneur. 
Cependant, elle ne rend pas automatiquement le port accessible de l’extérieur,
il est nécessaire d’utiliser l’option `-p` (ou `--publish`) lors du lancement du conteneur pour cela.

Ici, le conteneur expose le port 80 :

```dockerfile
EXPOSE 80
```

Pour y accéder de l'extérieur, on peut lancer le conteneur avec :

```bash
docker run -p 8080:80 <image>
```

Cela mappe le port 80 du conteneur au port 8080 de la machine hôte.

## Exemple de Dockerfile

Voici un example de Dockerfile pour le déploiement d'une application Vue.js.

```dockerfile
FROM node:lts-alpine

LABEL maintainer="Bob"

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]
```

::: info Info
Si on demande à Docker d'exécuter une commande qu'il a déjà faite, il va utiliser un **système de cache**.
:::