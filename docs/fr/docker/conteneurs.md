---
layout: doc
---

# Conteneurs

## Lister les conteneurs

```bash
# Lister les conteneurs actifs
docker container ls 
# Ou bien
docker ps
# Lister tous les conteneurs
docker container ls -a
```

## Lancement d'un conteneur : `docker run`

```bash
docker run nginx:1.24
```

Un conteneur est créé à partir de l'image de Nginx récupérée sur le Docker hub.

Dans ce cas, le lancement se fait en **avant-plan** et le choix du nom du conteneur est laissé à Docker.

Voici des exemples de **surcharges** possibles à l'aide d'options dans la commande :

```bash
# Nommage du conteneur en "www" avec --name
docker run --name www nginx:1.24

# Lancement en mode "détaché", 
# c'est-à-dire en arrière plan avec --detach ou -d
docker run --detach --name www nginx:1.24
docker run -d --name www nginx:1.24

# Suppression automatique du conteneur une fois arrêté avec --rm
docker run --detach --name www --rm nginx:1.24
```

## Lancement en tant qu'un autre utilisateur

```bash
docker run --user <user> <image>
```

::: info Info
`<user>` peut être un nom d'utilisateur ou un UID. Pour connaître l'UID d'un utilisateur, on peut utiliser la commande `id -u <user>`.
:::

## Lancement d'un conteneur en mode interactif : `docker run -it`

De nombreuses images initient des conteneurs avec un **processus shell** (Debian, Ubuntu, Busybox, Alpine, etc.).
Pour obtenir un conteneur interactif, il faut fournir l'option `-it` :

```bash
docker run -it --name busy busybox
```

Une fois la session terminée, le conteneur passe en statut "exited". Il est possible de le relancer par :

```bash
docker start -i busy
```

Surcharge pour un conteneur en arrière-plan et en attente :

```bash
docker run --detach --rm --name busy busybox sleep infinity
````

Lancement d'une commande au sein d'un conteneur en exécution :

```bash
docker exec -it busy sh
docker exec busy date
```

Exemple d'interrogation d'un conteneur nginx depuis un conteneur busybox :

```bash
docker exec busy wget -O - -q 172.17.0.2
```

## Autres commandes

```bash
# Lister les conteneurs actifs (les 2 commandes sont équivalentes)
docker container ls
docker ps

# Lister tous les conteneurs, même inactifs
docker ps -a

# Lister tous les identifiants des conteneurs
docker ps -aq

# Supprimer les conteneurs arrêtés
docker container prune

# Supprimer tous les conteneurs
docker rm -f $(docker ps -aq)
```