---
layout: doc
---

# Liens

Pour être accessibles, les liens doivent être **explicites** pour **tous les utilisateurs**.

Pour vos liens et vos boutons, **évitez les libellés comme "cliquez ici" ou "lien"**.

::: tip À retenir
Les libellés de liens ou de boutons doivent pouvoir être compris **séparément** et **en-dehors du contexte**.
:::

```html
<!-- Évitez -->
<p>Pour consulter notre documentation sur l'accessibilité, cliquez <a href="#">ici</a></p>

<!-- Privilégiez -->
<p>Consultez <a href="#">notre documentation sur l'accessibilité</a></p>
```

Attention, pour les **images-liens**, c'est l'attribut `alt` de l'image qui permet de restituer le contexte du lien.

