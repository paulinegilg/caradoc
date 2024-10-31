---
layout: doc
---

# Images

Pour créer un conteneur, Docker a besoin d'une image.

Une image est un modèle contenant des instructions pour créer un conteneur Docker.

## Récupérer une image

On peut utiliser des images **publiées dans un registre** ou créer **ses propres images**.
Sans indication précise, les images sont récupérées à partir du registre communautaire [Docker hub](https://hub.docker.com/).

Une image se récupère par la commande :

```bash
docker image pull nginx:1.24
docker image pull busybox
```

Ici, on récupère l'image de Nginx (logiciel de serveur web) avec le tag `1.24` qui correspond à une version spécifique,
puis l'image de Busybox (boîte à outil pour la ligne de commande Shell) en version "latest", c'est-à-dire la dernière version stable.

## Inspecter une image

On peut inspecter une image avec la commande :

```bash
docker image inspect busybox:latest
```

## Le système de couches dans Docker

Chaque image Docker est constituée de **plusieurs couches empilées** dans une seule entité. 
Une nouvelle couche est générée **à chaque modification de l'image** ou lors de **l'exécution de commandes** comme `RUN` ou `COPY`. 
Docker réutilise ensuite ces couches pour créer de nouveaux conteneurs, ce qui accélère le processus de construction. 
Les couches intermédiaires sont partagées entre les images, optimisant ainsi la vitesse, la taille et l'efficacité.

::: tip Dive
[Dive](https://github.com/wagoodman/dive) est un outil créé par Alex Goodman qui analyse les images Docker pour **optimiser** leur taille. 
Il permet de **visualiser les couches de l’image**, d’**identifier les fichiers inutiles** et d’**améliorer l’efficacité du cache**, 
aidant ainsi les développeurs à réduire la taille et améliorer la performance de leurs images Docker.
:::

## Supprimer une image

Pour supprimer une image, on peut utiliser la commande :

```bash
docker image rm <image>
```

::: warning Attention
Si l'image est utilisée par un conteneur, il faut d'abord supprimer le conteneur.
:::

## Supprimer toutes les images anonymes non utilisées

::: tip Info
Une image anonyme est une image **sans tag** (un tag est créé par un conteneur avec l'option `-t`).
:::

```bash
# Suppression des images anonymes non utilisées
docker image prune

# Suppression de toutes les images non utilisées
docker image prune -a
```