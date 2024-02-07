## WAI-ARIA

Avant de poursuivre ce cours, nous devons nous pencher sur une notion très importante pour l'accessibilité : **ARIA**.

ARIA (pour **Accessible Rich Internet Applications**), ou WAI-ARIA, est une spécification technique du W3C.

Il s'agit d'une technologie qui nous aide à résoudre des problèmes en ajoutant de la sémantique
que les technologies d'assistance et les navigateurs peuvent reconnaitre.
C'est utile pour des contenus complexes qui ne peuvent pas utiliser la sémantique native de HTML
ou qui sont modifiés dynamiquement avec du JavaScript.

Les **3 fonctionnalités principales** d'ARIA sont les rôles, les propriétés et les états :

- **Rôles** : définissent ce que l'élément est ou fait sur la page
- **Propriétés** : caractéristiques d'un élément ou ses relations avec d'autres
- **États** : valeurs de données actuelles associées à l'élément

```html
<div role="button" aria-describedby="more-info" aria-pressed="false">
  Bouton
</div>

<div id="more-info">
  Vous avez cliqué sur le bouton, que va-t-il se passer ?
</div>
```

ARIA est une partie complexe d'HTML et de l'accessibilité.
Si c'est la première fois que vous en entendez parler, il est fort probable que vous vous demandiez à quoi cela sert,
concrètement, et surtout, **quand l'utiliser**.

### Les 5 règles d'ARIA

La WAI a théorisé **5 règles pour une bonne utilisation d'ARIA**. Passons-les en revue ensemble :

#### N'utilisez ARIA qu'en dernier recours

Autrement dit, utilisez ARIA **uniquement** s'il n'existe pas d'élément HTML sémantique correspondant à vos besoins,
si vous souhaitez utiliser une fonctionnalité dont l'accessibilité n'est pas encore supportée,
ou si vous avez besoin de plus de liberté pour styliser un élément.

#### Ne modifiez pas la sémantique des éléments

```html
<!-- N'écrivez pas -->
<h2 role=tab>Titre pouvant être tabulé</h2>

<!-- Écrivez plutôt -->
<div role="tab"><h2>Heading tab</h2></div>
```

L'élément `<h2>` n'est pas interactif par nature.
Sémantiquement, il sert uniquement à définir un titre.
L'entourer d'une `<div>` tabulable peut être utile, par exemple, pour naviguer à travers différents onglets.

#### Permettez toujours la navigation au clavier

Vous pouvez utiliser l'attribut `tabindex="0"` pour permettre à des éléments ne recevant pas de focus nativement d'être
navigables au clavier.

```html
<!-- L'élément pourra recevoir du focus -->
<span role="button" tabindex="0">Submit</span>
```

Que remarquez-vous dans l'exemple précédent ?

Nous cherchons à obtenir un élément ayant un rôle de bouton et recevant du focus.
Or, cela correspond aux **caractéristiques natives** de l'élément `<button>`.

Ici, nous devrions plutôt utiliser (si possible, conformément à la règle 1 d'ARIA) :

```html
<button type="submit">Submit</button>
```

#### Ne cachez pas les éléments pouvant recevoir du focus

Vous pouvez indiquer aux lecteurs d'écran d'ignorer certains éléments si ceux-ci ne sont pas porteurs d'informations utiles
pour l'utilisateur grâce à `role="presentation"` ou `aria-hidden="true"`.

```html
<!-- N'écrivez pas -->
<div aria-hidden="true"><button>Submit</button></div>

<!-- Écrivez plutôt -->
<div><button>Submit</button></div>
```

#### Utilisez des libellés accessibles pour vos éléments interactifs

Souvenez-vous, nous avons déjà évoqué ce point dans le chapitre sur l'accessibilité des contenus textuels.

Des éléments interactifs peuvent correspondre à des **liens**, des **textes alternatifs** et des **labels** de champs de formulaire.

```html
<!-- Un lien avec un texte cliquable accessible -->
<a href="lapin.html">Lapin mignon</a>

<!-- Une image-lien avec une alternative textuelle -->
<a href="lapin.html"><img src="lapin.png" alt="Lapin mignon"></a>

<!-- Une case à cocher liée à un label par un id -->
<input type="checkbox" id="lapin">
<label for="lapin">Lapin mignon</label>
```

Pour en savoir plus, consultez la [documentation MDN sur ARIA](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA)
et la [documentation officielle WAI-ARIA](https://www.w3.org/TR/wai-aria/).
