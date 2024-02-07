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




