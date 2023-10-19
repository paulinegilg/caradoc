---
layout: doc
---

# Vidéo et audio

Les contenus vidéo et audio sont, eux aussi, concernés par la problématique de l'accessibilité.
Afin que leur contenu puisse être accessible au plus grand nombre, 
il est essentiel de les accompagner d'une **alternative textuelle** qui pourra être lue, soit par un humain, soit par une **technologie d'assistance**.

## Transcription du contenu

Les **vidéos** doivent être **sous-titrées**.
Bien entendu, si ces sous-titres sont incrustés par-dessus la vidéo, ceux-ci doivent répondre aux critères d'accessibilité,
notamment en ce qui concerne le contraste et être de taille suffisante.

Les médias audio contenant des informations, comme les **podcasts**, doivent quant à eux être **retranscrits sous forme de texte**.
Ces transcriptions textuelles peuvent figurer sur la même page que le média, ou sur une page à part que vous aurez pris soin de préciser.

[Exemple d'une transcription de podcast](https://www.lalutineduweb.fr/transcription-textuelle-accessibilite-web-droit-podcast-user-story/) sur le blog de la Lutine du web

::: tip À noter
Les transcriptions audio et vidéo seront d'une grande aide pour les **personnes sourdes ou malentendantes**.
Mais elles seront également bénéfiques **à d'autres** : 
les utilisateurs disposant d'une **connexion avec peu de réseau** pour qui télécharger des médias audio et vidéo serait trop lourd,
ou ceux se trouvant dans un **environnement bruyant** ou au contraire dans un **environnement calme** et ne pouvant en conséquence pas accéder au son.
:::

## Accessibilité des contrôles vidéo et audio

Si vous devez intégrer des vidéos ou des sons directement sur un site,
il est probable que vous utilisiez les éléments HTML `<audio>` et `<video>`.

Grâce à HTML5 et l'attribut `controls`, vous disposez de commandes natives pour contrôler vos contenus à partir de ces éléments : 
des boutons lecture et pause, des sliders pour avancer dans le média ou pour contrôler le son, etc.

Le hic, c'est que ces commandes ne sont pas accessibles uniquement au clavier, sauf sur le navigateur Opera.
Or, nous avons vu que pour certains utilisateurs, c'était essentiel.

Dans l'idéal, il vous faudra créer des **contrôles personnalisés** grâce à HTML5 et JavaScript.
Nous n'allons pas rentrer dans ces détails techniques dans ce cours, mais si cela vous intéresse, 
je vous conseille de jeter un coup d'œil à la 
[documentation de Mozilla sur l'accessibilité](https://developer.mozilla.org/fr/docs/Learn/Accessibility/Multimedia#cr%C3%A9ation_de_contr%C3%B4les_audio_et_vid%C3%A9o_personnalis%C3%A9s).
