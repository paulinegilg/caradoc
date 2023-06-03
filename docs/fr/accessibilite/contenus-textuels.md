---
layout: doc
---

# Contenus textuels

Pour garantir un bon niveau d'accessibilité, notamment pour les personnes malvoyantes ou ayant des troubles cognitifs,
il est essentiel de prêter attention aux contenus textuels, tant sur la forme que sur le fond.

## Bien choisir une police

Cela peut paraître évident, mais il est chaudement recommandé d'utiliser des **polices accessibles**.
Tous vos utilisateurs *- et pas uniquement les personnes handicapées -* vous remercieront !

Dans l'idéal, privilégiez les **polices classiques** comme Arial ou Times New Roman et évitez les polices exotiques comme
les polices "écrites à la main", avec de forts italiques ou des courbes.
Évitez également les polices toutes en majuscules.

## Taille de texte

Les textes doivent être de **taille suffisante**, généralement autour de **16px** pour une police standard.

Pour déclarer vos tailles de police en CSS, privilégiez les unités `em` et `rem` (encore mieux) à `px`.
Comme il s'agit d'unités relatives, elles ont le mérite de permettre un **redimensionnement du texte** en cas de zoom ou 
pour le responsive (adaptation aux différentes tailles d'écran).

Une fois votre choix de police fait, ne mélangez pas le gras, à l'italique et aux majuscules.
Contentez-vous d'un **style unique pour l'emphase**.
Trop d'emphases risquent de perdre vos utilisateurs et d'alourdir la lisibilité.

```css
/* Évitez */
body {
    font-size: 16px;
}
h1   {
    font-size: 24px;
}

/* Privilégiez */
html { 
    font-size: 62.5%; /* ratio qui permet une correspondance entre rem et px */
}
body { 
    font-size: 1.6rem; /* = 16px */
} 
h1   { 
    font-size: 2.4rem; /* = 24px */
} 
```

Pour en savoir plus, consultez cet [article sur les tailles de police en CSS avec `rem`](https://snook.ca/archives/html_and_css/font-size-with-rem).

## Organisation du contenu

Un contenu organisé de manière claire aura beaucoup plus de chance d'être lisible et compris.

### Utilisez un langage clair

Si possible, évitez de jargonner et faites des **phrases simples et courtes**, dans un registre qui puisse être compris du plus grand nombre.
Si vous utilisez des abréviations ou des **acronymes**, pensez à les **expliciter**.

### Structurez votre contenu avec des titres

Utilisez des **titres** pour **structurer** votre contenu et ainsi **délimiter** des **zones de texte logiques**.
Cela clarifiera votre contenu et les lecteurs d'écran pourront se baser sur vos titres pour générer des **tables des matières**.

Bien entendu, les titres doivent **s'enchainer de manière logique** : un `<h1>`, puis un `<h2>`, un `<h3>` et ainsi de suite.

```html
<!-- Mauvais enchainement de titres -->
<h1>Titre de premier niveau</h1>
    ...
<h3>Titre de troisième niveau</h3>

<!-- Bon enchainement de titres -->
<h1>Titre de premier niveau</h1>
    ...
<h2>Titre de deuxième niveau</h2>
```

### Utilisez des listes pour simplifier votre contenu

Utilisez les éléments HTML correspondant au contenu que vous souhaitez afficher.
Par exemple, si vous listez des éléments, faites appel à `<ul>` ou à `<ol>`.

```html
<!-- Évitez -->
<h3>Ingrédients :</h3>
<div>
    <p>- Lait</p>
    <p>- Farine</p>
    <p>- Oeufs</p>
    <p>- Sucre</p>
</div>

<!-- Privilégiez -->
<h3>Ingrédients :</h3>
<ul>
    <li>Lait</li>
    <li>Farine</li>
    <li>Oeufs</li>
    <li>Sucre</li>
</ul>
```

### Explicitez vos liens et vos boutons

Pour vos liens et vos boutons, **évitez les libellés comme "cliquez ici" ou "lien"**.

::: tip À retenir
Les libellés de liens ou de boutons doivent pouvoir être compris **séparément** et **en-dehors du contexte**.
:::

```html
<!-- Évitez -->
<p>Pour consulter notre documentation sur l'accessibilité, cliquez <a href="/doc.html">ici</a></p>

<!-- Privilégiez -->
<p>Consultez <a href="/doc.html">notre documentation sur l'accessibilité</a></p>
```

