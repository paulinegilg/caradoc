---
layout: doc
---

# Les cookies

## Qu’est-ce que c’est ?

La plupart des sites web utilisent des cookies. 
Il s’agit de petits fichiers déposés sur l'ordinateur par le navigateur lorsqu'on navigue sur le web.

## D’où ça vient ? À quoi ça sert ?

Il existe plusieurs types de cookies :

### Cookies techniques

Ils sont nécessaires au bon fonctionnement des services en ligne.
Par exemple, sauvegarder la langue de l'utilisateur ou le contenu d'un panier sur un site d'e-commerce.

### Cookies commerciaux ou publicitaires

Ils peuvent provenir de :

- vidéos (YouTube, Dailymotion, Vimeo, etc.)
- réseaux sociaux (posts ou pages Facebook, Instagram ou Twitter, boutons de like ou d’abonnement, etc.)
- publicités personnalisées
- outils de mesure d’audience (Google Analytics, Matomo, etc.)
- pixels de tracking (Facebook, journaux en ligne, plateformes de vente, etc.)
- potentiellement tout autre élément provenant d’un autre site web, par exemple intégré sous forme d’`<iframe>`

## Voir les cookies sur son navigateur

Méthodes pour accéder aux cookies depuis les outils de développement :

### Sur Firefox

Ouvrir les outils de développement (`Ctrl+Maj+I`) > Stockage > Cookies

### Sur Chrome / Chromium

Ouvrir les outils de développement (`F12`) > Application > Storage > Cookies

::: tip Exercice
Listez les cookies techniques et commerciaux de 3 sites que vous fréquentez régulièrement.
Par exemple :

- [unistra.fr](https://www.unistra.fr/)
- [sncf-connect.com](https://www.sncf-connect.com)
- [amazon.fr](https://www.amazon.fr/)
- [instagram.com](https://www.instagram.com/)
- [marmiton.org](https://www.marmiton.org/)
- ...

Recherchez l'**objectif** des cookies dans la **politique cookies** du site, sur [cookiedatabase.org](https://cookiedatabase.org/)
ou sur [dignilog.com](https://dignilog.com/).

Remarque : les cookies que vous voyez peuvent varier en fonction de votre navigateur, de sa configuration (plus ou moins stricte envers les cookies), 
et les éventuelles extensions de navigateur que vous utilisez (bloqueurs de pub, etc.).
:::

## Les cookies sont-ils soumis au consentement ?

**Oui**, le dépôt de cookies est soumis au consentement des utilisateurs.

C'est le cas pour la plupart des cookies publicitaires et commerciaux.

Certains cookies, notamment les **cookies techniques**, peuvent quant à eux se passer du consentement, dès lors qu'ils 
répondent à des objectifs bien **définis**, **nécessaires** à la fourniture du service ou qu'ils ne traitent **pas de données personnelles**.

Cela concerne (liste non exhaustive) : 

- les cookies conservant le **choix** exprimé par les utilisateurs sur le dépôt de traceurs (par exemple, pour les gestionnaires de cookies)
- les cookies destinés à l’**authentification** auprès d’un service, y compris ceux visant à assurer la sécurité du mécanisme d’authentification
- les cookies destinés à garder en mémoire le contenu d’un **panier d’achat** sur un site d'e-commerce
- les cookies de **personnalisation** de l'interface utilisateur (par exemple, pour le choix de la langue ou de la présentation d’un service)
- certains traceurs de **mesure d’audience** dès lors qu’ils respectent certaines conditions (Matomo, etc.)

## Les recommandations de la CNIL

Fin 2020, la CNIL a adopté une **recommandation** portant sur l’usage de cookies, 
incitant les entreprises et les administrations à se mettre en **conformité** d’ici au **31 mars 2021** au plus tard.

Voici les points importants à prendre en compte pour être en conformité :

- Les internautes doivent pouvoir donner leur consentement au dépôt de cookies par un acte positif clair (comme le fait de cliquer sur “j’accepte” dans une bannière cookie)
- La simple poursuite de la navigation sur un site ne peut plus être considérée comme une expression valide du consentement
- Les utilisateurs doivent être en mesure de retirer leur consentement, facilement, et à tout moment
- Refuser les cookies doit être aussi aisé que de les accepter
- Les internautes doivent être clairement informés des finalités des cookies avant de consentir, ainsi que des conséquences qui s’attachent à une acceptation ou un refus de cookies.

### Exemples de conformité

Fenêtre de consentement de Radio France :

![](/rgpd/cookies-bon-exemple.jpg)

Fenêtre de consentement du Musée du Louvres :

![](/rgpd/cookies-bon-exemple-2.png)

### Exemples de non conformité

Fenêtre de consentement d'Amazon :

![](/rgpd/cookies-mauvais-exemple.jpg)

### Le cas des *cookie walls*

Fenêtre de consentement d'Allociné, avec *cookie wall* :

![](/rgpd/cookie-wall.png)

Les *cookie walls* consistent à bloquer l'accès à un site web ou à une application mobile pour les utilisateurs
qui ne donneraient pas leur consentement au dépôt de cookies.

Dans certains cas (*pay walls*), l'accès sans cookies est possible avec une contrepartie financière, comme un abonnement à un service.

Au regard de la législation actuelle, cette pratique ne peut pas être interdite par la CNIL.

Elle pose cependant un certain nombre de questions étiques comme le fait que :

- les personnes les plus vulnérables doivent fournir leurs données pour accéder gratuitement à des services, tandis que d’autres, plus aisées, pourraient payer un abonnement leur permettant d’accéder à un service sans fournir de données personnelles
- la possibilité de préserver son anonymat vis-à-vis de certains tiers soit réservée à quelques-uns et exclue pour d’autres

Pour en savoir plus, consultez les 
[recommendations de la CNIL sur les enjeux juridiques et éthiques des *cookie walls*](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookie-walls/monetisation-des-donnees-personnelles-les-enjeux-juridiques-et-ethiques).

## Gestionnaire de cookies

Je vous conseille d'utiliser le gestionnaire de cookies [Tarte au citron](https://tarteaucitron.io), et ce, pour plusieurs raisons : 

- il est conforme aux recommendations de la CNIL citées plus haut dans ce chapitre
- il est facile à installer et à personnaliser
- il est open source et libre

![](https://tarteaucitron.io/img/panel.png)

*Source : [tarteaucitron.io](https://tarteaucitron.io)*

### Installation de *Tarte au citron*

2 modes d'installation sont proposés. Un mode manuel (gratuit), et un mode pro (nécessitant un abonnement, gratuit en-dessous d'un seuil de services).

::: tip Exercice : installation manuelle
Rendez-vous sur [ce dépôt Git](https://git.chezluma.fr/lumadil/tp-installation-cookie-panel) et suivez les consignes.
:::

Il existe également un [plugin WordPress](https://wordpress.com/fr/plugins/tarteaucitronjs) (nécessite un abonnement).
