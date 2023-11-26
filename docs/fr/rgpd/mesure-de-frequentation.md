---
layout: doc
---

# Mesure de fréquentation d'un site ou d'une application

## Les outils de mesure d'audience

Les outils de mesures d’audience sont utilisés pour obtenir des **informations sur la navigation des utilisateurs** d'un site ou d'une application.

Ils permettent de connaitre le nombre de visiteurs sur une période donnée, de comprendre comment les utilisateurs arrivent sur le site, comment ils naviguent,
avec quel navigateur, OS, appareil (ordinateur, tablette, mobile...).

Ces outils utilisent des cookies ou d'autres traceurs. Généralement, ils nécessitent le **consentement** des utilisateurs, 
mais ils peuvent être **exemptés sous certaines conditions**.

## Le cas de Google Analytics

Présent sur un très grand nombre de sites web, ce service de Google est vivement critiqué par les défenseurs de la vie privée en ligne pour 
les transferts de données personnelles non encadrés qu'il génère.

Son utilisation doit se faire de manière éclairée, car ses évolutions et les évolutions du cadre légal peuvent le rendre illicite.
Ses derniers mois, il a été considéré comme **illicite** par la CNIL. Mais la mise en application du *Data Privacy Framework* en juillet dernier entre les États-Unis et l'UE
laisse supposer qu'il ne l'est plus...

### Pourquoi Google Analytics était considéré comme illicite par la CNIL ?

Pour résumer, la CNIL (ainsi que d'autres homologues européens), considéraient que des données telles que l’adresse IP, le client_id, le user_id et le user-agent étaient des données personnelles
et qu'elles étaient transférées sans cadre suffisant vers les États-Unis, où ces données pouvaient trop facilement être accessibles par des services de renseignement.
Bien entendu, ce transfert et cette facilité d'accès va à l'encontre du RGPD.

### Comment rendre Google Analytics licite ?

Faisons comme si Google Analytics restait illicite, ou *a minima*, comme si son utilisation devait rester **encadrée**.

#### Solution 1

Abandonner Google Analytics au profit d'une alternative plus respectueuse des données personnelles (voir le paragraphe suivant).

#### Solution 2

Adapter l'installation de Google Analytics pour la rendre conforme aux exigences de la CNIL avec de l'anonymisation, de la pseudonimisation et de la proxification.

La "proxification" désigne un procédé qui permet de prétraiter les données sur un serveur en amont (appelé serveur proxy) avant de les envoyer vers les serveurs de Google,
afin d'en retirer les éléments problématiques.

Il est important de souligner que, contrairement aux idées reçues, **la simple configuration de l'outil ne suffit pas à le rendre conforme**.

![](https://www.cnil.fr/sites/cnil/files/thumbnails/image/analytics-proxy.png)

*Source: [CNIL.fr](https://www.cnil.fr/fr/mesure-daudience-et-transferts-de-donnees-comment-mettre-son-outil-de-mesure-daudience-en-conformite)*

## Matomo, une alternative conforme à Google Analytics

[Matomo](https://fr.matomo.org/) est une excellente alternative à Google Analytics. L'outil peut être installé auto-hébergé sur un serveur, permettant un contrôle total sur les données collectées.

Une offre payante de type SaaS (*Software as a Service*) est également disponible, variant en fonction des ressources serveur nécessaires (proportionnellement au nombre de vues).

## Comment bénéficier de l’exemption de consentement ?

Pour pouvoir bénéficier de l'exemption de consentement, les traceurs doivent :

- se limiter strictement à la **seule mesure d'audience** du site ou de l'application 
- ne pas permettre le **suivi de la navigation** des utilisateurs entre différents sites ou applications
- produire uniquement des données statistiques **anonymes**
- ne pas permettre de **recouper** les données avec des données issues d'autres traitements
- ne pas transmettre les données à des **tiers**

La CNIL recommande également que :

- les utilisateurs soient correctement **informés** au sujet des traceurs, par exemple via la politique de confidentialité
- la durée de vie des traceurs soient **limitée** (**13 mois**) et qu'elle ne soit pas automatiquement renouvelée lors de nouvelles visites
- les données collectées via ces traceurs soient conservées au maximum pendant **25 mois**