---
layout: doc
---

# Structuration de l'information

## HTML sémantique

HTML joue un grand rôle dans l'accessibilité. Bien utilisé, il permet aux lecteurs d'écran de lire et d'interagir avec le contenu d'une page web.

Bien utiliser le HTML, c'est avoir recours au **HTML sémantique**.

> Le HTML sémantique est l'utilisation du balisage HTML visant à renforcer le sémantisme **(la signification)** des informations contenues dans les pages web, 
c'est-à-dire leur **sens**, plutôt que de se borner à définir leurs présentations (ou apparence).

Source : [HTML sémantique sur Wikipédia](https://fr.wikipedia.org/wiki/HTML_s%C3%A9mantique)

Voyons quelques exemples pour vous aider à conceptualiser cette notion.

Si vous souhaitez mettre un texte en valeur, vous pouvez utiliser la balise `<i>` qui indique un style italique,
mais il est préférable d'utiliser `<em>` qui signifie une emphase. C'est dans un second temps, avec CSS, que vous pourrez 
définir le style de votre élément, et si besoin, le mettre en italique.

Autre exemple : vous pouvez créer un bouton cliquable à l'aide d'une `<div>`, mais il est plus logique d'en créer un
à l'aide de l'élément `<button>`. En effet, les `<div>` n'ont pas de valeur sémantique alors que les éléments `<button>`, eux,
sont justement faits pour les boutons. Ils possèdent des styles par défaut et des **fonctionnalités spécifiques**, telles que
l'**activation à la touche `Entrée`** et la possibilité de **tabuler** dessus.

## Structurer ses contenus

Comme nous l'avons évoqué dans le chapitre précédent, il est essentiel de bien structurer son contenu avec des
**titres**, des **paragraphes** et des **listes**.

Ainsi, les lecteurs d'écran peuvent **naviguer facilement dans le contenu** et le lire au fur et à mesure, en indiquant ce qui est un titre, un paragraphe etc.

### Exemple de page web bien structurée

```html
<header>
    <h1>Titre de la page</h1>
</header>

<nav>
    <!--  navigation principale  -->
</nav>

<!--  contenu principal de la page  -->
<main>
    
    <article>
        <h2>Article</h2>
        <!--  contenu d'un article  -->
    </article>

    <aside>
        <h2>Contenu en relation</h2>
        <!--  contenu en relation  -->
    </aside>
    
    <section>
        <!-- section de contenu -->
    </section>

</main>

<!--  pied de page  -->
<footer>
    <nav>
        <!-- navigation secondaire si nécessaire -->
    </nav>
</footer>
```

Dans cet exemple, nous exploitons tout le potentiel des **éléments sémantiques de HTML5**.

Les lecteurs d'écran comprendront aisément l'organisation de nos contenus.
Par exemple, pour lire l'article présent sur cette page, il faudra aller au contenu principal, puis sur l'article.
C'est bien **plus facile de s'y retrouver** qu'avec des `<div>` imbriquées !

::: tip À noter
Vous pouvez transformer la disposition en CSS, mais **l'ordre du contenu doit toujours être logique dans le code source**.
:::

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
