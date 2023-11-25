---
layout: doc
---

# Les *dark patterns*

Les *dark patterns* (aussi appelés *"deceptive patterns"*) sont des éléments d'interfaces utilisateur conçus pour **tromper** ou **manipuler** les utilisateurs.
Ils peuvent également servir à les **solliciter** davantage ou les **faire rester** plus longtemps sur un service.

## Biais cognitifs

Les *dark patterns* exploitent des **biais cognitifs**, c'est-à-dire des déviations de la pensée logique et rationnelle par rapport à la réalité
qui peuvent amener les personnes à faire des erreurs de raisonnement ou de jugement.

Les biais cognitifs peuvent être causés par :

- trop d'informations
- pas assez de sens
- la nécessité d'agir rapidement
- les limites de la mémoire

## Exemples de *dark patterns*

Il existe tout un tas de *dark patterns* qui exploitent chacun des biais cognitifs particuliers.

Par exemple :

- Les *"Roach Motels"*, sortes de labyrinthes numériques dont on a l'impression de ne plus pouvoir s'échapper
- Le *"Confirmshaming"*, ou pousser les utilisateurs à faire un choix en exploitant leur sentiment de culpabilité ou de honte
  (quelques exemples sur un [blog spécialisé en rédaction web](https://www.les-mots-magiques.com/techniques-de-vente/confirmshaming-pour-augmenter-conversions))
- Les faux avis clients et les fausses recommendations
- La présélection et les souscriptions cachées
- La fausse urgence, ou faire croire aux utilisateurs qu'ils doivent accomplir une tâche dans un délai restraint (généralement acheter un produit)

Cette liste n'est malheureusement pas exhaustive. Vous en trouverez encore d'avantage, avec des descriptions et des exemples sur le site [deceptive.design](https://www.deceptive.design/).

## Exemple de *dark pattern* dans le domaine des données personnelles

Sur des sites déposant des cookies, il est recommandé, voire obligatoire de disposer d'un
moyen de recueillir le consentement des utilisateurs.

La plupart du temps, cela prend la forme d'un bandeau ou d'une *pop up* occupant une place importante à l'écran, empêchant la poursuite de la navigation.

Un bouton permet d'accepter tous les cookies, un autre des les configurer ou de les refuser.
Le bouton "Accepter" est généralement d'une couleur vive pour encourager les utilisateurs à accepter sans lire les modalités.

![](/rgpd/dark-pattern.jpg)

Ici, un exemple parfait sur le site de Leroy Merlin : le bouton "Tout accepter" du gestionnaire de cookies est vert.
Certes, le vert est la couleur fétiche de l'enseigne... mais c'est aussi la couleur associée à la notion de validation.

Pour couronner le tout, le bouton permettant de refuser les cookies "Continuer sans accepter" est isolé en-haut à droite.
Il n'est pas coloré pour ne pas attirer l'œil et sa signification est confuse.

Nous verrons dans la partie suivante comment concevoir des gestionnaires de cookies sans *dark patterns*, respectueux des
utilisateurs et du RGPD.

::: tip Faire attention aux *dark patterns*, pourquoi c'est important
Si vous souhaitez exploiter un biais cognitif pour améliorer votre taux de conversion ou gagner en visibilité,
c'est votre choix. Mais faites-le **en connaissance de cause**.

N'oubliez jamais qu'un *dark pattern* peut **se retourner contre vous** : au mieux, vous récolterez quelques clients mécontents, 
au pire, votre image sera dégradée et votre activité en souffrira...

Le web, tel que Tim Berners-Lee l'a créé, est censé être un espace **universel**, **profitable** et **accessible** pour toutes et tous. 
N'en faisons pas un espace rempli de fausses informations et d'interfaces nuisant aux utilisateurs. Ces utilisateurs pourraient être nous,
nos amis, nos parents, nos grand-parents...
:::