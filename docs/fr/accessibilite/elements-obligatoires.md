---
layout: doc
---

# Éléments obligatoires

## HTML valide

Pour commencer, chaque page web doit être définie par un **type de document**, c'est-à-dire un `doctype` valide.

Par exemple : 

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Titre de la page</title>
</head>
<body>
  ...
  <!-- Contenu -->
  ...
</body>
</html>
```

Ensuite, les **balises** doivent être utilisées correctement. C'est-à-dire à des fins de **structuration** du contenu 
et non de présentation.

Quelques exemples à bannir :

- L’utilisation d’éléments `<div>` ou `<span>` ou plusieurs `<br>` pour créer visuellement un paragraphe.
- L'utilisation des balises `<h>` (titres) à seule fin de créer des effets typographiques
- L'utilisation de la balise `<blockquote>` à seule fin de mettre un paragraphe en retrait

## Titre de page

Chaque page web doit avoir un **titre** (balise `<title>`) et celui-ci doit bien sûr être **pertinent**.

Pertinent signifie qu'il doit permettre de retrouver la page dans l’historique de navigation ou la liste des onglets du navigateur.

::: tip À noter
Pensez à appliquer cette règle aussi sur les [sites monopages](https://developer.mozilla.org/fr/docs/Glossary/SPA) (*"Single Page Applications"*).
Cela peut être le cas notamment si vous travaillez sur un projet avec un framework SPA tel que Vue, React ou Angular.
:::

## Langue

Spécifier correctement la langue d'une page web très important pour les lecteurs d'écran. 
Cela leur permettra de lire les contenus dans la bonne langue ou de signaler un changement de langue à l'utilisateur.

Plusieurs critères sont à respecter : 

- La langue par défaut doit être renseignée dans chaque page web (au niveau de la balise `<html lang="fr">`) 
- Le code de langue par défaut doit être pertinent et valide
- Chaque changement de langue doit être spécifié avec l'attribut `lang` (voir ci-après un exemple de code)
- Chaque changement de sens de lecture doit être spécifié avec l'attribut `dir` (voir ci-après un exemple de code)

```html
<p>This paragraph is English, but the language is not specifically defined.</p>

<p lang="en-GB">This paragraph is defined as British English.</p>

<p lang="fr">Ce paragraphe est défini en français.</p>
```

Source : [lang (sur MDN)](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang)

```html
<p dir="rtl">هذه الفقرة باللغة العربية ولكن بشكل خاطئ من اليسار إلى اليمين.</p>

<p dir="ltr">Ce paragraphe est en français et se lit de gauche à droite.</p>
```

Source : [dir (sur MDN)](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir)
