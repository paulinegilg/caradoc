---
layout: doc
---

# Gestion des images (*Dockerfile*)

Un *Dockerfile* est un fichier texte qui définit les instructions pour créer une image docker. 

Il sert à automatiser la création d'environnements de conteneur de manière reproductible et standardisée, 
facilitant ainsi le développement et le déploiement d'applications.

Les noms par défaut du fichier sont `Dockerfile` ou `dockerfile`.

## Construire une image

Pour construire une image PHP en lui installant le module pdo_mysql, on peut utiliser le Dockerfile suivant :

```dockerfile
FROM php:8.2-fpm
RUN  docker-php-ext-install pdo_mysql
```

Puis, on lance la commande suivante pour construire l'image :

```bash
docker build -t php-mariadb:8.2-fpm .
```

::: info Info
Si on demande à docker d'exécuter une commande qu'il a déjà faite, il va utiliser un système de cache.
:::

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
permet de des archives tar/tar.gz et des fichiers depuis une URL.

```dockerfile
ADD https://example.com/files.tar.xz .
```

### `RUN`

Exécute des commandes à l'intérieur de l'image.

A l'exécution de la commande, un nouveau conteneur provisoire est créé et le résultat est enregistré dans une nouvelle image.

::: warning Attention
Chaque instruction `RUN` va générer [une nouvelle couche ou *layer*](/fr/docker/images.html#le-systeme-de-couches-dans-docker).

Il est donc recommandé de regrouper les commandes `RUN` pour éviter de créer des couches inutiles.

```dockerfile
# Eviter
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

// TODO

- ENTRYPOINT : Point d'entrée dans le conteneur -> processus initial. allows you to configure a container that will run as an executable.

### `LABEL`

Permet d'ajouter des métadonnées à une image.

```dockerfile
LABEL version="1.0"
LABEL description="My first docker image"
LABEL maintainer="Bob"
```

### `CMD`

- CMD : instruction sets the command to be executed when running a container from an image. You can specify CMD instructions using shell or exec forms:
    - CMD ["executable","param1","param2"] (exec form)
    - CMD ["param1","param2"] (exec form, as default parameters to ENTRYPOINT)
      Deux cas possibles :
      Si ENTRYPOINT est défini, alors CMD sera un argument du processus ENTRYPOINT
      Dockerfile illustratif
      ```dockerfile
      FROM    debian:12
      COPY    init.sh /
      ENTRYPOINT ["/init.sh"]
      ```
      Fichier init.sh
      ```bash
      #!/bin/bash
      date
      exec "$@"
      ```
      Si ENTRYPOINT n'est pas défini, alors CMD sera réellement le processus initial.

### `EXPOSE`

Remarque : Navigation au sein d'une image et ses layers
`docker run -it -v /run/docker.sock:/run/docker.sock wagoodman/dive test:0.1`
https://github.com/wagoodman/dive

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

Construction de l'image
`docker build . -t test:0.1`

Résumé J2 :
- Création d'une image perso avec Dockerfile, commande : `docker image build .`
- Si tout s'est bien passé, on peut récupérer l'id de l'image (ex : 3199372aa3fc) -> on peut aussi taguer les images pour faire plus simple que les id
  `--tag <image repository>:<image tag>`
- On lance on conteneur avec l'image créée `docker container run --rm --detach --name custom-nginx-packaged --publish 8080:80 3199372aa3fc`
  ou plus simplement avec un tag : `docker image build --tag custom-nginx:packaged .`
