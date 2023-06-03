---
layout: doc
---

# Couleurs et contraste

Entrons dans le vif du sujet ! 
Le premier thème que nous allons aborder traitera des couleurs et du contraste.

::: tip Réfléchissez-y...
Vous avez sûrement déjà visité des sites web avec des textes placés sur un fond avec un contraste insuffisant.
Peut-être avez-vous rencontré des difficultés à naviguer ou à saisir les informations dont vous aviez besoin.
Maintenant, mettez-vous à la place de personnes ayant d'importants troubles de la vue...
::: 

Afin de garantir l'accessibilité aux personnes ayant des troubles de la vision, 
il est essentiel de choisir des couleurs qui garantiront un niveau de **contraste suffisant entre les textes et les fonds**.
En respectant des ratios suffisants, vous permettez à des personnes ayant des problèmes de vue de lire vos contenus sans l'aide d'outils spécifiques.

## Les ratios de contraste à respecter

- Les textes ainsi que les images contenant du **texte de taille standard** doivent respecter un ratio de contraste de **4.5:1 minimum**.
- Les **textes plus grands** (plus de 24px ou 18.5px en gras), ainsi que les **icônes porteuses de sens** doivent respecter un ratio de contraste de **3:1 minimum**.

Les logos et les éléments décoratifs ne sont pas concernés par ces recommandations.

### Calculer le ratio de contraste

Le ratio de contraste se calcule à partir de la formule suivante :

`(L1 + 0.05) / (L2 + 0.05)`

L1 correspond à la luminance de la couleur la plus claire et L2 correspond à la luminance de la couleur la plus sombre.

::: tip Qu'est-ce que la luminance ?
La luminance correspond à l'intensité de la réflexion des couleurs.
:::

Vous n'avez pas besoin de retenir cette formule par cœur,
car il existe des outils qui nous permettent de réaliser ces calculs pour nous !
On peut citer Color Contrast Analyzer, Leonardo, Adobe Color et les DevTools si vous utilisez Chrome.

Je vous conseille d'utiliser le [vérificateur de contraste de WebAIM](https://webaim.org/resources/contrastchecker/). 
C'est un outil disponible gratuitement en ligne.

## Mieux utiliser la couleur

Nous venons de voir qu'un bon contraste était essentiel pour bien percevoir les informations.
Il est également crucial de **faire attention à la façon dont on utilise la couleur.**

Souvent, nous utilisons la couleur pour transmettre une information.
Par exemple, un message positif aura tendance à être vert, tandis qu'un message négatif sera rouge.
Cela paraît *logique* pour les personnes n'ayant pas de problème de vue, mais pour les autres,
elles risquent très probablement de passer à côté de l'information.

**La couleur ne doit pas être le seul moyen de transmettre une information.**
Ajouter des icônes, du texte, voire un motif sont de bonnes solutions pour apporter de la clarté.

::: tip Aller plus loin
Si vous êtes amenés à créer un site web, un bon moyen de détecter de potentiels problèmes liés à la couleur
est d'effectuer des tests en nuances de gris. 
Ainsi, vous annulez les effets de la couleur et vous devez naviguer uniquement en vous servant des autres informations à votre disposition.
:::
