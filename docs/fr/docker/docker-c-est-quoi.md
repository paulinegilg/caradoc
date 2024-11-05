---
layout: doc
---

# Docker, c'est quoi ?

Docker est un outil permettant de lancer des applications et leurs dépendances dans des **conteneurs logiciels isolés**.
Ces conteneurs pourront ensuite être **executé sur n'importe quel serveur**.

Cette approche permet d'accroître la flexibilité et la portabilité d’exécution d'une application,
laquelle va pouvoir tourner de façon fiable et prévisible sur une grande variété de machines hôtes,
que ce soit sur la machine locale, un cloud privé ou public, etc.

Ce concept est appelé **conteneurisation**. On l'oppose à la **virtualisation**.
Tandis que la virtualisation nécessite un hyperviseur pour gérer des machines virtuelles,
les conteneurs partagent le même noyau que la machine hôte, ce qui les rend plus légers et plus rapides à démarrer.

La conteneurisation s'appuie sur un ensemble de fonctionnalités avancées du **noyau Linux**.

*Source : [Docker (Wikipédia)](https://fr.wikipedia.org/wiki/Docker_(logiciel))*

![](/docker/containers-vs-virtualization.jpg)

*Source : [Containers vs. virtual machines (Atlassian)](https://www.atlassian.com/microservices/cloud-computing/containers-vs-vms)*