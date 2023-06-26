---
layout: doc
---

# Les *dark patterns*

Les *dark patterns* sont des éléments d'interfaces utilisateur conçus pour **tromper** ou **manipuler** les utilisateurs.
Ils peuvent également servir à les **solliciter** davantage ou les **faire rester** plus longtemps sur un service.

## Biais cognitifs

Les *dark patterns* exploitent des **biais cognitifs**, c'est-à-dire des déviations de la pensée logique et rationnelle par rapport à la réalité
qui peuvent amener les personnes à faire des erreurs de raisonnement ou de jugement.

Les biais cognitifs peuvent être causés par :

- trop d'informations
- pas assez de sens
- la nécessité d'agir rapidement
- les limites de la mémoire

## Exemple de *dark pattern* dans le domaine des données personnelles

Sur des sites déposant des cookies, il est recommandé, voire obligatoire de disposer d'un
moyen de recueillir le consentement des utilisateurs.

La plupart du temps, cela prend la forme d'un bandeau ou d'une *pop-up* occupant une place importante à l'écran, empêchant la poursuite de la navigation.

Un bouton permet d'accepter tous les cookies, un autre des les configurer ou de les refuser.
Le bouton "Accepter" est généralement d'une couleur vive pour encourager les utilisateurs à accepter sans lire les modalités.

![](/rgpd/dark-pattern.jpg)

Ici, un exemple parfait sur le site de Leroy Merlin : le bouton "Tout accepter" du gestionnaire de cookies est vert.
Certes, le vert est la couleur fétiche de l'enseigne... mais c'est aussi la couleur associée à la notion de validation.

Pour couronner le tout, le bouton permettant de refuser les cookies "Continuer sans accepter" est isolé en-haut à droite.
Il n'est pas coloré pour ne pas attirer l'œil et sa signification est confuse.

Nous verrons dans la partie suivante comment concevoir des gestionnaires de cookies sans *dark patterns*, respectueux des
utilisateurs et du RGPD.
