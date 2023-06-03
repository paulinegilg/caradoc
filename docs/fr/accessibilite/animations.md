---
layout: doc
---

# Animations

Les animations peuvent rendre les sites plus vivants et engageants, 
mais ils peuvent aussi causer de sérieux troubles à des personnes atteintes de **problèmes vestibulaires**, 
d'**épilepsie** ou de **troubles cognitifs**, et causer respectivement des **vertiges**, des **crises** et de la **distraction** par exemple.

::: tip À noter
De manière générale, **surcharger** votre site d'animations, n'est **pas une bonne idée**. 
Vous risquez de **perdre l'attention** de vos utilisateurs, voire de les **agacer** et de les **faire fuir**.
:::

**Évitez autant que possible les flashes répétés**, les **passages brutaux du sombre au clair**, car ils peuvent déclencher des crises
chez les personnes atteintes d'**épilepsie photosensible**. Si vous doutez de la nature d'un contenu que vous souhaitez publier,
que ce soit sur un site sous forme d'animation ou dans une vidéo par exemple, il est chaudement recommandé de le faire passer
par un **outil vérifiant qu'il ne présente aucun risque pour l'épilepsie**.

Si besoin, tournez-vous vers l'outil [PEAT (Photosensitive Epilepsy Analysis Tool)](https://trace.umd.edu/peat/)

**Évitez les mouvements non essentiels** à la compréhension du contenu, même les micro-mouvements.
Si vous souhaitez malgré tout afficher des animations, permettez à vos utilisateurs de mettre les animations en **pause**, 
de les **stopper** ou de les **cacher**. 

Plusieurs solutions techniques s'offrent à vous. Vous pouvez :

- Proposer un **bouton "on-off"** qui active ou désactive les animations en Javascript, en agissant soit sur des propriétés CSS, soit sur des animations JavaScript
- Créer un **profil utilisateur sans mouvement** en CSS avec les media queries `@prefers-reduced-motion`

::: tip À retenir
Dans tous les cas, faites en sorte que vos utilisateurs aient le **contrôle** sur vos animations.
:::
