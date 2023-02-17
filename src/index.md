---
home: true
heroImage: /hero.png
tagline: Cours et documentations libres sur le web
xfeatures:
- title: Accessibilité (nouveau !)
  details: Découvrez les fondamentaux de l'accessibilité pour rendre votre vie numérique plus respectueuse des droits des personnes en situation de handicap
  link: /accessibilite
- title: Améliorer la qualité des sites web (nouveau !)
  details: Apprenez à intégrer des critères de qualité dans vos projets web.
  link: /qualite-web
---

<div class="features">
  <div class="feature" v-for="feature in $page.frontmatter.xfeatures">
    <h2><a v-bind:href="feature.link">{{ feature.title }}</a></h2>
    <p>{{ feature.details }}</p>
  </div>
</div>

::: slot footer
Licence [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) - Site créé par [Pauline Gilg](https://paulinegilg.fr) - [Mentions légales et données personnelles](/legal-gdpr)

Logo de [Icons 8](https://icons8.com/illustrations/author/zD2oqC8lLBBA) par [Ouch!](https://icons8.com/illustrations)
:::