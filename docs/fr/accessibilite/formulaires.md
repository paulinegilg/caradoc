---
layout: doc
---

# Formulaires

Les formulaires sont certainement les éléments les plus complexes à rendre accessibles.
Les utilisateurs et les lecteurs d'écran doivent pouvoir interagir avec eux et y **saisir des informations aisément**.

::: tip À retenir
Soigner vos formulaires profitera aux personnes en situation de handicap, aux lecteurs d'écran et plus globalement
à l'ensemble de vos utilisateurs.
:::

## Champs

Les champs désignent les éléments `<input>` (champs texte, zones de texte, champs email, url, ...),
les éléments `<select>`, les boutons radio ou les cases à cocher (checkboxes), etc.

Il est fortement recommandé d'**utiliser autant que possible les champs HTML par défaut**,
car toutes les fonctionnalités nécessaires aux formulaires comme le focus, les états, propriétés et valeurs de formulaire,
sont fournies par défaut. Inutile de surcharger vos champs d'ARIA si ce n'est pas nécessaire.

```html
<!-- Inutile d'utiliser le role form d'ARIA ici ! -->
<div role="form">
    <!-- contenu du formulaire -->
</div>

<!-- L'élément HTML <form> est fait pour ça -->
<form>
    <!-- contenu du formulaire -->
</form>
```

`<form>` est un élément sémantique indiquant clairement aux lecteurs d'écran qu'ils sont en présence d'un formulaire.
C'est une information importante qu'il ne faut pas leur cacher.

### Regrouper des champs associés

Pour gagner en clarté, vous pouvez regrouper les champs associés en les entourant de l'élément `<fieldset>`
qui correspond à un groupe de champs.
Il s'accompagne d'une légende (élément `<legend>`) qui explicite le contenu du groupe.

<fieldset>
    <legend>Nombre de personnes :</legend>
    <label><input type=radio name=pers value="1">1</label>
    <label><input type=radio name=pers value="2">2</label>
    <label><input type=radio name=pers value="3">3</label>
</fieldset>

```html
<fieldset>
    <legend>Nombre de personnes :</legend>
    <label><input type=radio name=pers value="1">1</label>
    <label><input type=radio name=pers value="2">2</label>
    <label><input type=radio name=pers value="3">3</label>
</fieldset>
```

## Libellés

Les libellés, c'est-à-dire les éléments `<label>` sont destinés à **informer l'utilisateur** sur **l'objectif du champ**,
la nature et le **format des données requises** pour valider le champ.
Ils doivent être **visibles** et **décrire correctement le champ**.

Les champs et leurs libellés doivent être **connectés** aussi bien **visuellement** que **sémantiquement dans le code**
afin que les utilisateurs et les lecteurs d'écran comprennent clairement de quoi il s'agit.

### Association explicite

Si possible, associez vos champs à vos labels grâce à l'attribut `for` et son `id` correspondant.

<form>
    <label for="nom">Nom :</label>
    <input type="text" id="nom">
    <label for="email">Adresse mail (requis) :</label>
    <input type="email" id="email" required>
</form>

```html
<form>
    <label for="nom">Nom :</label>
    <input type="text" id="nom">

    <label for="email">Adresse mail (requis) :</label>
    <input type="email" id="email" required>
</form>
```

### Association implicite

Dans cet exemple, nous lions les champs aux labels en les imbriquant.

<form>
    <label>Nom : <input type="text"></label>
    <label>Adresse mail (requis) : <input type="email" required></label>
</form>

```html
<form>
    <label>Nom : <input type="text"></label>
    <label>Adresse mail (requis) : <input type="email" required></label>
</form>
```

### Cas particulier : cacher le label d'un champ

Si vous souhaitez masquer visuellement le label d'un champ pour des raisons esthétiques,
comme sur une barre de recherche par exemple, vous pouvez utiliser l'attribut `aria-label` pour tout de même l'afficher
aux lecteurs d'écran.

<input type="text" name="search" aria-label="Rechercher">
<button type="submit">Rechercher</button>

```html
<input type="text" name="search" aria-label="Rechercher">
<button type="submit">Rechercher</button>
```

## Descriptions

Parfois, lorsque la nature et le format des données attendues de l'utilisateur sont complexes,
il peut s'avérer judicieux de lui donner **plus d'informations**.

Par exemple, si la valeur attendue doit comporter un nombre minimum ou maximal de caractères 
ou une combinaison de caractères spécifique (un mot de passe comprenant au moins 8 caractères, 
dont au moins une majuscule, un chiffre et un caractère spécial...), un format de date, etc.

L'une des solutions les plus efficaces consiste à utiliser l'attribut `aria-describedby`.
Les lecteurs d'écran vont lire à la fois le label et la description fournie dans cet attribut.

<label>Nom (requis) : <input type=text aria-describedby="validation-nom" required>
    <span id="validation-nom" class="validation-message">Veuillez saisir votre nom de famille</span>
</label>

```html
<label>Nom (requis) : <input type=text aria-describedby="validation-nom" required>
    <span id="validation-nom">
        Veuillez saisir votre nom de famille
    </span>
</label>
```

## Gestion des erreurs

Tout ce que nous avons couvert dans ce chapitre devrait être utile à vos utilisateurs et les aider à remplir correctement
vos formulaires, mais vous n'êtes pas à l'abri qu'ils fassent des **erreurs**.

Si cela se produit, il faudra leur **indiquer clairement où se situe le problème** et comment faire pour y remédier.

Pour en savoir plus sur la gestion des erreurs avec HTML5 et JavaScript, consultez cette 
[ressource sur la validation des formulaires](https://developer.mozilla.org/fr/docs/Learn/Forms/Form_validation).

Je vous invite aussi à commencer à vous familiariser avec la documentation de la WAI, 
en particulier ce [tutoriel sur l'accessibilité des formulaires (en anglais)](https://www.w3.org/WAI/tutorials/forms/).
