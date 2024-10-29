---
layout: doc
---

# Réseaux

Docker dispose des **3 réseaux** suivants :

- **bridge** : réseau par défaut
- **host** : pour les conteneurs qui ont besoin d'accéder directement à la pile réseau de la machine hôte
- **none** : pour les conteneurs qui n'ont pas besoin d'accès réseau

::: info Info
- Il n'y a pas de résolution de noms sur le réseau `bridge`
- Il n'est pas possible d'attribuer des IP fixes sur le réseau `bridge` et sur tout réseau dont on n'a pas défini le subnet (sous-réseau)
  :::

## Lister les réseaux

```bash
docker network ls
```

## Création d'un réseau

```bash
docker network create newnet
# Affecter une IP statique
docker network create newnet --subnet 172.20.0.0/16
```

## Conteneurs et réseaux

Lister les conteneurs dans un réseau :

```bash
# Lister les conteneurs dans un réseau
docker network inspect <network>
# Lister les IDs des conteneurs
docker network inspect bridge | jq '.[].Containers|keys'
```

Publier le port d'un conteneur sur le réseau, par exemple si on stocke un site internet dans un conteneur nginx,
afin de le rendre accessible depuis l'extérieur :

```bash
docker run --publish <host_port>:<container_port> <image>
```

## Supprimer des réseaux

```bash
docker network rm <network>
# Supprime tous les réseaux non utilisés, c'est-à-dire sans conteneurs
docker network prune
```

## Affecter un conteneur à un réseau

```bash
# Affecter
docker network connect <network> <container>
# Détacher
docker network disconnect <network> <container>
```

::: info Info
Docker n'offre aucun routage entre ses différents réseaux. Si deux conteneurs doivent communiquer l'un avec l'autre, plusieurs solutions :

- connecter les deux conteneurs au même réseau
- exposer les ports des conteneurs sur l'hôte
- faire en sorte que les deux conteneurs partagent le même espace de nom réseau
:::