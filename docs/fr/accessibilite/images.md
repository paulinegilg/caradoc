---
layout: doc
---

# Images

Les personnes ayant des troubles de la vision ne peuvent pas voir les images comme les personnes valides.
Cependant, les lecteurs d'écran, eux, le peuvent !

Pour que les images puissent être interprétées correctement par ces technologies, 
on recommande généralement de fournir une **alternative textuelle** au contenu.

## Faut-il toujours donner une alternative ?

La réponse est : **cela dépend**.

Si l'image est porteuse d'information, alors il faut fournir une alternative.
Par exemple, un flyer contenant des informations textuelles.

Mais si l'image est purement décorative, il vaut mieux ne pas le remplir, car trop d'informations inutiles risquent d'alourdir le contenu.
Dans ce cas, privilégiez les solutions suivantes :

- Ne donnez pas d'alternative, mais laissez tout de même un `alt` vide 
(ainsi, vous indiquez clairement aux lecteurs d'écran que l'image est décorative et ils ne s'y attarderont pas)
- Intégrez votre image avec du CSS et la propriété `background-image`

``` html
<!-- Une image décorative -->
<img src="decor.jpg" alt="">
```

Si vous avez du mal à décider si votre image est porteuse d'information ou si, au contraire, elle est purement décorative, 
vous pouvez vous aider de l'[arbre décisionnel de la WAI (en anglais)](https://www.w3.org/WAI/tutorials/images/decision-tree/).

::: tip À noter
Dans l'idéal, **n'incluez pas de texte dans vos images**, car il ne peut pas être lu par les technologies d'assistance.
Du plus, cela ne permet pas de copier-coller le texte.
:::

## Alternatives sur les réseaux sociaux

Sur les réseaux sociaux où vous publiez des images, pensez à fournir une alternative, surtout si votre image contient du texte.
Cela peut se faire au niveau des propriétés de l'image ou dans le corps du post.