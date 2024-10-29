---
layout: doc
---

# Persistance des données

On rappelle qu'une fois le conteneur arrêté et supprimé, l'ensemble de ses données est perdu.
Si l'on souhaite conserver des données, il faut les externaliser.
Il existe plusieurs manières de faire :

- Copie des données à l'aide de `docker cp`
- Recours aux volumes docker (objets docker)
- Utilisation des montages bind (fonctionnalité du noyau Linux)

::: tip Quand utiliser un volume ? Quand utiliser un montage bind ?
Les volumes sont souvent utilisés pour stocker les **données produites par le conteneur** (SGBD, LDAP, Redis, etc.).
Pour ce qui est des autres données (**fichiers de configuration**, site web, etc.), on peut utiliser les montages bind.
:::

## Volumes docker

Un volume docker est un objet associé à un répertoire lors de sa création.

```bash
# Lister les volumes
docker volume ls

# Créer un nouveau volume "data"
docker volume create data

# Inspection d'un volume
docker volume inspect data

# Rattacher un volume au répertoire d'un conteneur
docker run -v data:/usr/share/nginx/html/ nginx

# Supprimer un volume
docker volume rm data

# Supprimer tous les volumes anonymes 
# (sans nom et non rattachés à un conteneur)
docker volume prune
```

## Montages bind (*bind mounts*)

Les montages bind lient un dossier ou fichier de l’hôte à un emplacement dans le conteneur, 
permettant de partager les données entre les deux. 
Ils sont idéaux pour le développement, car les modifications sur l’hôte se répercutent directement dans le conteneur.

### Procédure classique

```bash
# Utilisation d'un montage bind avec un conteneur
# Montage d'un répertoire côté hôte dans le répertoire /usr/share/nginx/html/ du conteneur Nginx
docker run -it --rm -v /home/user/site/:/usr/share/nginx/html/ nginx
```

### Procédure alternative avec `--mount`

```bash
docker run --mount type=bind,source=/home/user/site/,target=/usr/share/nginx/html/ nginx
```