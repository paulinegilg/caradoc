---
layout: doc
---

# Premiers pas

## L'environnement Docker

Un conteneur docker est constitué de 4 objets de base :

- **une image** : arborescence de départ et des informations
- **un conteneur** : instanciation de l'image
- **un ou plusieurs réseaux** : pour connecter les conteneurs entre eux
- **un ou plusieurs volumes** : pour persister les données

## Commandes de base

Voici la structure d'un dialogue élémentaire avec Docker :

```bash
docker <objet> <action> <options>
```

Pour chaque objet, un certain nombre d'actions sont possibles, parmi lesquelles des actions standard :

- `ls` : lister des objets
- `inspect` : inspecter la configuration d'un objet
- `rm` : supprimer des objets
- `prune` : nettoyer des objets non utilisés