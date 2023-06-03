---
layout: doc
---

# Référentiels et obligations légales

Au cours des derniers chapitres, vous avez pu entrevoir à quel point l'accessibilité est une **problématique complexe**.
Elle touche en profondeur à des **domaines très variés** tels que le développement, le design, la vidéo, la communication, etc.

Pour nous guider dans notre quête de mise en accessibilité, il existe ce que l'on appelle des **référentiels d'accessibilité**.
Ce sont des **normes sous forme de guides de bonnes pratiques**, contenant des **critères spécifiques à respecter** et des **procédures** à 
mettre en place pour y arriver.

## Référentiel international : WCAG

Les normes internationales à respecter sont les **WCAG (Web Content Accessibility Guidelines)**.
Elles sont publiées par la **WAI (Web Accessibility Initiative)** du W3C (World Wide Web Consortium) que vous devriez 
maintenant bien connaître.

La première version, WCAG 1.0 a été publiée en 1999.
WCAG 2.0 a été publiée en 2008 et **la version actuelle, la version 2.1** a été publiée en 2018.
Une version "brouillon" du WCAG 2.2 devrait être finalisée en avril 2023.

Pour plus d'informations, consultez le [référentiel WCAG officiel](https://www.w3.org/TR/WCAG21/) sur le site du W3C.

Voyons comment s'articule les WCAG.

À la **base** des WCAG, il y a **4 principes fondamentaux**. Les contenus doivent être :

- **Perceptibles** : chacun doit pouvoir avoir accès au contenu, textuel ou non à l'aide d'alternatives adaptées, etc.
- **Utilisables** : les fonctionnalités doivent être accessibles au clavier, ne pas provoquer de malaises, la navigation doit fonctionner correctement, etc.
- **Compréhensibles** : le texte doit être lisible et compréhensible, les contenus doivent fonctionner de manière prévisible, les utilisateurs doivent pouvoir corriger leurs erreurs, etc.
- **Robustes** : la compatibilité avec les outils des utilisateurs actuels et futurs doit être optimisée

Chaque principe est constitué de **bonnes pratiques**. Et chaque bonne pratique est accompagnée de **critères de réussite testables**,
permettant ainsi au WCAG d'être utilisé comme une **norme** pour des spécifications techniques, de design ou contractuelles par exemple.

Les bonnes pratiques sont documentées et proposent une grande variété de **techniques** permettant de s'y conformer.

Enfin, le WCAG définit **3 niveaux d'accessibilité** : A, AA et AAA.

**AAA** étant le plus haut niveau d'accessibilité.

::: tip À noter
Sachez que même un contenu conforme au niveau AAA ne sera pas forcément accessible à tous les individus, en particulier
dans le domaine des troubles cognitifs du langage et de l'apprentissage.
:::

## Référentiel français : RGAA

::: tip À retenir
En France, le niveau d’accessibilité d’un site est évalué au regard des critères du **RGAA (Référentiel Général d’Amélioration de l’Accessibilité)**.
Ce référentiel se base sur les WCAG. 
:::

Il comporte **106 critères**.
Les tests font référence à des **notes techniques** permettant de vérifier les critères, comme des implémentations de code
en HTML, CSS ou JavaScript, un **glossaire** et des **méthodologies de tests**.

La **version en vigueur** du RGAA est la **4.1** et a été publiée en février 2021.

Consultez le [site officiel du RGAA 4](https://accessibilite.numerique.gouv.fr/), 
ainsi que [l'ensemble des critères et des tests](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/).

## Obligations légales en France

### Qui est concerné ?

- Les **services de l’État**
- Les **collectivités territoriales**
- Les **établissements publics**
- Les organisations légataires d’une **mission de service public**
- Les **entreprises dont le chiffre d’affaires en France est supérieur à 250 millions d’euros**
- Les **organisations d’intérêt général**

### Quelle loi ?

Les obligations d’accessibilité des sites aux personnes en situation de handicap ont été introduites 
par l’article 47 de la [loi du 11 février 2005](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006682279/2022-11-17/)
pour l'égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées.
Le décret n° 2019-768 du 24 juillet 2019 précise les obligations légales.

### Quels contenus ?

**Tous les sites et applications utilisées au travers d’un navigateur web** sont concernés. Cela concerne :

- Les **sites internet**, intranet, extranet et progiciels
- Les **applications mobiles**
- Le mobilier urbain numérique

### Quelles obligations ?

#### Conformité au RGAA

Tous les critères du RGAA doivent être remplis... en théorie.

Dans les faits, il n'y a pas d'obligation. Il suffit aux organisations d'être en conformité avec les obligations suivantes :

- publication de la déclaration d'accessibilité
- mention de la conformité en page d'accueil
- schéma pluriannuel de mise en accessibilité

Si tous ces points sont remplis, l'organisme ne peut être attaqué.

#### Déclaration d’accessibilité

Une **déclaration d’accessibilité** doit être **publiée sur le web** dans un format accessible.

Elle doit contenir les informations suivantes :

- Un état de conformité
- Un signalement des contenus non accessibles
- Des dispositifs d’assistance et de contact avec l'organisme responsable des contenus
- La possibilité de saisir le Défenseur des droits.

#### Mention de la conformité en page d’accueil

La **page d’accueil** de chaque service en ligne doit afficher une des mentions suivantes :

- "Accessibilité : non conforme", si aucun audit n’a été effectué ou si le résultat est inférieur à 50%
- "Accessibilité : partiellement conforme" si le résultat de l’audit est supérieur à 50%
- "Accessibilité : totalement conforme" si le taux est égal à 100%

#### Lien vers le schéma pluriannuel de mise en accessibilité

Le schéma pluriannuel de mise en accessibilité détaille la **mise en œuvre de l’accessibilité au sein de l'organisation**.
Il doit également être **publié sur le web**.

### Quelles sanctions ?

Le manquement à ces obligations peut entraîner une **sanction financière** prononcée par le ministre chargé des personnes handicapées.
Le montant de cette sanction s'élève à **20 000 euros par service en ligne**.
