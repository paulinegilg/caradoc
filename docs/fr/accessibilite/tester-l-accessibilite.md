---
layout: doc
---

# Tester l'accessibilité

Pour tester correctement l'accessibilité, c'est-à-dire tous les critères, il faut associer plusieurs techniques.
Les tests automatisés seuls ne sont pas suffisants, car ils ne testent que 20 à 30% des critères.
Certains résultats de tests peuvent être compliqués à interpréter, voire mal compris,
c'est pourquoi il est nécessaire d'avoir un minimum de compétences dans le domaine.

Les tests peuvent être **automatisés**, **manuels** ou être réalisés à l'aide de **technologies d'assistance**.

## Tests automatisés

Les tests automatisés utilisent des logiciels pour **scanner des contenus en se basant sur les référentiels d'accessibilité**.
Certains peuvent donner un score à la page web à l'issue du test.

### Avantages

- Ils sont faciles à prendre en main
- Ils donnent des résultats rapidement et peu de connaissances sont nécessaires pour les comprendre
- On peut les réaliser à n'importe quel moment de la vie d'un projet

### Inconvénients

- Ils ne testent **que 20 à 30%** des critères d'accessibilité
- Il est possible que certains résultats soient des faux positifs

Les outils de tests automatisés peuvent se présenter sous la forme d'**extensions de navigateurs**, 
de **linters de code**, de **logiciels**, d'**applications mobiles**, d'**API**, etc.

En voici quelques exemples que vous pourrez utiliser gratuitement et simplement :

- **Wave** : extension de navigateur pour Firefox, Chrome et Edge [(documentation de Wave)](https://wave.webaim.org/)
- **Outils de développement sur Firefox**, onglet accessibilité 
[(documentation de l'outil accessibilité de Firefox)](https://firefox-source-docs.mozilla.org/devtools-user/accessibility_inspector/index.html)
- **Lighthouse**, dans les devTools de Chrome [(documentation de Lighthouse)](https://developer.chrome.com/docs/lighthouse/overview/)

## Tests manuels

Les tests manuels consistent en des **tests visuels et cognitifs** et en des **tests au clavier**.
Ils permettent de détecter des problèmes que les tests automatisés ne voient pas.
Ils sont essentiels dans la mesure ou les tests automatisés ne testent qu'une faible quantité de critères.

Dans quels cas les tests manuels sont nécessaires :

- **Vérifier l'alternative d'une image** : 
ce critère peut être validé par un test automatique, car ce dernier est capable de scanner le code source à la recherche 
d'un attribut `alt`. En revanche, il ne sera pas capable de déterminer si l'alternative est bien utilisée ou non, et si elle décrit
fidèlement l'image.
- **Vérifier que le contraste est suffisant** : 
c'est facilement automatisable en calculant de ratio entre la couleur de fond et la couleur du texte. 
Mais ce n'est pas toujours possible pour des dégradés ou des textes sur des images.
- **Vérifier l'utilisation de titres et de listes pour organiser le contenu** : 
c'est automatisable mais un test manuel est nécessaire pour s'assurer que l'usage de ces éléments est bien approprié pour les contenus concernés.
- **Vérifier la présence d'ARIA** :
c'est automatisable, mais encore une fois, il faudra un test manuel pour s'assurer de la bonne utilisation d'ARIA.

## Tests avec des technologies d'assistance

Pour tester l'accessibilité en profondeur et dans des **conditions proches d'une utilisation réelle**, vous pouvez utiliser des technologies d'assistance.
Par exemple, consulter votre site avec une loupe pour voir si le zoom permet d'accéder à tout votre contenu, 
ou avec un lecteur d'écran pour lire le contenu de vos pages et vérifier que tout est cohérent et que la navigation se fait sans encombre.

Cela nécessitera un **temps d'apprentissage** plus ou mois long, car chaque technologie a ses propres commandes.
C'est un investissement en temps et en énergie qui en vaut la peine et qui améliorera grandement la qualité de vos tests et votre compréhension de l'accessibilité.

::: tip Exercice
Si vous le souhaitez, installez un lecteur d'écran gratuit 
(voir la liste proposée dans le [chapitre sur les technologies d'assistance](/accessibilite/les-technologies-d-assistance.html#les-lecteurs-d-ecran)) 
sur votre ordinateur ou votre navigateur et essayez de naviguer sur des sites.
Analysez la façon dont le lecteur interprète les différents éléments (texte, image, lien, navigation...).
:::