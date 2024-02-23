---
layout: doc
prev: false
next: false
---

# Fiche : Docker

## Qu'est-ce que Docker ?

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

![](/fiches/containers-vs-virtualization.png)

*Source : [Containers vs. virtual machines (Atlassian)](https://www.atlassian.com/microservices/cloud-computing/containers-vs-vms)*

## Premiers pas

### L'environnement Docker

Un conteneur docker est constitué de 4 objets de base :

- **une image** : arborescence de départ et des informations
- **un conteneur** : instanciation de l'image
- **un ou plusieurs réseaux** : pour connecter les conteneurs entre eux
- **un ou plusieurs volumes** : pour persister les données

### Commandes de base

Voici la structure d'un dialogue élémentaire avec Docker :

```shell
docker <objet> <action> <options>
```

Pour chaque objet, un certain nombre d'actions sont possibles, parmi lesquelles des actions standard :

- `ls` : lister des objets
- `inspect` : inspecter la configuration d'un objet
- `rm` : supprimer des objets
- `prune` : TODO

## Images

Pour créer un conteneur, Docker a besoin d'une image.

Une image est un modèle contenant des instructions pour créer un conteneur Docker. 

On peut utiliser des images publiées dans un registre ou créer ses propres images.

Une image se récupère par la commande :

```shell
docker image pull nginx:1.24
docker image pull busybox
```

Ici, on récupère l'image de Nginx (logiciel de serveur web) avec le tag `1.24` qui correspond à une version spécifique,
puis l'image de Busybox (boîte à outil pour la ligne de commande Shell) en version "latest".

Sans indication précise, les images sont récupérées à partir du registre communautaire [Docker hub](https://hub.docker.com/).

On peut inspecter une image avec la commande : 

```shell
docker image inspect busybox:latest
```

### Layers d'image

TODO

Chaque instruction d'un fichier Docker crée une couche dans l'image.
Lorsque vous modifiez le Dockerfile et reconstruisez l'image, seules les couches qui ont été modifiées sont reconstruites.

Attention, une image ne se modifie jamais.

## Conteneurs

### Lancement d'un conteneur : `docker run`

```shell
docker run nginx:1.24
```

Un conteneur est créé à partir de l'image de Nginx récupérée sur le Docker hub.

Dans ce cas, le lancement se fait en **avant-plan** et le choix du nom du conteneur est laissé à Docker.

Voici des exemples de **surcharges** possibles à l'aide d'options dans la commande :

```shell
# Nommage du conteneur en "www" avec --name
docker run --name www nginx:1.24

# Lancement en mode "détaché", 
# c'est-à-dire en arrière plan avec --detach ou -d
docker run --detach --name www nginx:1.24
docker run -d --name www nginx:1.24

# Suppression automatique du conteneur une fois arrêté avec --rm
docker run --detach --name www --rm nginx:1.24
```

### Lancement d'un conteneur en mode interactif : `docker run -it`

De nombreuses images initient des conteneurs avec un **processus shell** (Debian, Ubuntu, Busybox, Alpine, etc.).
Pour obtenir un conteneur interactif, il faut fournir l'option `-it` :

```shell
docker run -it --name busy busybox
```

Remarque :

Une fois la session terminée, le conteneur passe en statut "exited". Il est possible de le relancer par

`docker start -i busy`

Surcharge pour un conteneur en arrière-plan et en attente :

`docker run --detach --rm --name busy busybox sleep infinity`

Lancement d'une commande au sein d'un conteneur en exécution

```shell
docker exec -it busy sh
docker exec busy date
```

Exemple d'interrogation d'un conteneur nginx depuis un conteneur busy :

`docker exec busy wget -O - -q 172.17.0.2`

### Autres commandes

```shell
# Lister les conteneurs actifs (les 2 commandes sont équivalentes)
docker container ls
docker ps

# Lister tous les conteneurs, même inactifs
docker ps -a

# Lister tous les identifiants des conteneurs
docker ps -aq

# Supprimer les conteneurs arrêtés
docker container prune

# Supprimer tous les conteneurs
docker rm -f $(docker ps -aq)
```



/////// TODO FROM HERE


Transfert de fichiers depuis ou vers un conteneur :

Exemple du fichier index.html suivant :

```html
<!DOCTYPE html>
<html>
    <head>
         <meta charset="utf-8">
    </head>
    <body>
      <h4>Formation Docker</h4>
    </body>
</html>
```

Envoi du fichier index.html dans le conteneur www :

`docker cp index.html www:/usr/share/nginx/html/`

On vérifie en requêtant le conteneur www depuis le conteneur busy par :

`docker exec busy wget -O - -q 172.17.0.2`

Récupération, dans le conteneur www, du fichier /etc/nginx/conf.d/default.conf :

`docker cp www:/etc/nginx/conf.d/default.conf .`

Récupération des containers dans un réseau
`docker network inspect bridge | jq '.[].Containers[]|.Name + " : " + .IPv4Address'`

Publication de port
Par l'association d'un port de la machine avec un port d'un conteneur, permet d'atteindre ce conteneur depuis l'extérieur en adressant l'IP et le port de la machine hôte :
`docker run --detach --name www --rm --publish 80:80 nginx:1.24`

Dès lors, il est possible d'accéder au conteneur www depuis un navigateur web en utilisant l'IP/port de la machine hôte.

Les layers
Une machine virtuelle est composée d'une couche ou de plusieurs ????
une image nginx est composée de plusieurs couches en épaisseur qui enrichissent les autres
tous les layouts d'une image sont en readonly,
seule une couche est dispo en rw au moment du lancement, qui permet de modifier/supprimer une couche inférieure
à la suppression d'un container, les layers sont vraiment supprimés

Une image n'est JAMAIS modifiée

Remarque importante
En recréant un nouveau conteneur www, on s'est aperçu que le fichier index.html précédemment copié n'était plus là !!!
Une image docker ne pourra jamais être modifiée. À chaque nouvelle création d'un conteneur on repart de l'état initial de l'image.

Il est cependant possible de créer une nouvelle image à partir de l'état actuel d'un conteneur par
`docker commit www nginx-tmp:1.24`

On peut visualiser les différences entre l'état du conteneur et le contenu, figé, de l'image par
`docker diff www`

### Micro-TP

Consignes :

Création des deux conteneurs suivants :

Conteneur web
Nom : web
Image : nginx:1.24
Mode détaché : oui
Publication du port 80
Commande : `docker run -d --name web -p 80:80 nginx:1.24`

Conteneur busy
Nom : busy
Image: busybox
Mode détaché : oui
Commande : `docker run -d --name busy --rm busybox sleep infinity`

Récupération de l'IP du conteneur web
Commande : `docker network inspect web | jq`

Se connecter au conteneur busy en y lançant un shell
Commande : `docker exec -it busy sh`

Est-il possible de pinguer le conteneur web à partir de son IP ?
Commande : `docker exec busy ping -c 4 172.17.0.2` ou `ping 172.17.0.2`

Est-il possible de pinguer le conteneur web à partir de son nom ?
Commande : NON. Il n'y a pas de résolution de noms sur le réseau bridge.

### Les réseaux sous Docker

À l'issue de l'installation, Docker dispose des trois réseaux suivants :

- bridge : réseau par défaut
- host : permet à un conteneur d'être rattaché à l'interface physique de l'hôte 
(peut être utile afin d'être directement sur le réseau ou pour manipuler la configuration réseau de l'hôte -> keepalived, routeur dynamique).
- none : plutôt un non-réseau

Remarques :

- Il n'y a pas de résolution de noms sur le réseau bridge
- Il n'est pas possible d'attribuer des IP fixes sur le réseau bridge
- Il n'est pas possible d'attribuer des IP fixes sur tout réseau dont on n'a pas défini le subnet (sous-réseau)

Pilotes réseau

La commande `docker info` affiche, entre autres, les différents pilotes réseau disponibles.

Création d'un réseau :

```sh
docker network create stagenet
docker network create stagenet --subnet 172.20.0.0/16
docker network create stagenet --subnet 172.18.0.0/16 -o com.docker.network.bridge.name=stagenet0
```

Affectation d'un conteneur à un réseau

Lors de la création

`docker run --network stagenet ...`

Sur un conteneur en fonctionnement

`docker network connect stagenet www`

Détachement d'un conteneur d'un réseau

`docker network disconnect bridge www`

Remarque importante

Docker n'offre aucun routage entre ses différents réseaux. Si deux conteneurs doivent communiquer l'un avec l'autre, trois solutions :

- connecter les deux conteneurs au même réseau
- exposer les ports comme il se doit
- utiliser un mécanisme de reverse-proxy (traefik)
- faire en sorte que les deux conteneurs partagent le même espace de noms réseau (ils pourront alors communiquer par l'adresse 127.0.0.1 -> notion de pod des environnements podman et kubernetes).

Réflexion

Comment faire communiquer deux conteneurs étant sur deux hôtes différents

- exposer les ports comme il se doit
- utiliser un mécanisme de reverse-proxy (traefik)

Limite de la publication de ports

Par exemple, il n'est pas possible de créer deux conteneurs www publiant chacun le même port 80 ! Il faudra que l'un des deux soit accessible par un port non standard !!!
La solution est double :
- ne pas publier les ports
- utiliser un reverse-proxy

Micro-TP
Consignes

Création des deux conteneurs suivants
Conteneur web
Nom : web
Image : nginx:1.24
Mode détaché : oui
Publication du port 80
Commande : `docker run --name web -d -p 80:80 nginx:1.24`

Conteneur php
Nom : php
Image: php:8.2-fpm
Mode détaché : oui
Commande : `docker run --name php -d php:8.2-fpm`

Reconfiguration de nginx pour s'interfacer avec php

Il faut fournir à Nginx le fichier default.conf suivant

```
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;
    
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
    
    # redirect server error pages to the static page /50x.html
    #

    error_page   500 502 503 504  /50x.html;
    
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
    
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #

    location ~ \.php$ {
        root           html;
        fastcgi_pass   php:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /var/www/html$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

Commande : 
`docker cp www:/etc/nginx/conf.d/default.conf .`

Vérifier qu'il est possible d'accéder au fichier index.html créé, ainsi qu'au fichier index.php suivant

```php
<?php
    phpinfo();
?> 
```

Réponse globale :

```shell
docker network create stagenet
docker network connect stagenet web
docker network connect stagenet php

# conf nginx
vim default.conf
docker cp default.conf web:/etc/nginx/conf/default.conf
docker exec -it web nginx -s reload

# conf php
vim index.php 
docker cp index.php php:/var/www/html/
```

Remarque : on ne peut pas supprimer un réseau sur lequel des conteneurs sont actifs = endpoints (?)

Pour redémarrer un service :

```shell
docker restart www
```

Dans une session à part, on peut lancer `docker events` pour obtenir des logs à propos des conteneurs docker en cours.

L'inconvénient, c'est que ce n'est pas automatisé !
ça fonctionne bien, mais comment faire persister les données.
Une fois le container arrêté, on perd toutes les données.
On pense modifier les images, mais en réalité non, puisqu'on ne peut jamais modifier les images.
C'est possible avec le volume et le montage bind (mécanisme propre à Linux).

### Quiz

- Pourquoi un conteneur s'arrêtant par erreur n'est-il pas automatiquement supprimé ? 
Tant qu'un conteneur n'est pas supprimé, on peut accéder aux logs. Donc, pour pouvoir consulter les logs.
On peut le redémarrer.
- Comment configurer sa suppression automatique lors d'un arrêt ?
En utilisant l'option `--rm` lors de `docker run`
Mais attention, on perd potentiellement la possibilité de consulter les logs.
- Pourquoi la commande n'aboutit-elle pas : `docker run busybox:latest`
Busybox se lance et s'arrête immédiatement. Car c'est un shell. Or, celui-ci doit fonctionner en mode interactif.
Il faudrait plutôt utiliser `docker run -it busybox:latest`.
Si on souhaite lancer le conteneur en mode `--detach`, il faut alors surcharger la commande sh par une autre commande, sans fin -> un exemple peut être `sleep infinity`.
- Quel est le nom du réseau auquel les conteneurs seront rattachés par défaut ?
bridge
- Comment connaitre l'espace d'adressage ?
`docker network inspect bridge` (https://fr.wikipedia.org/wiki/Adressage_m%C3%A9moire)
- Que ne peut-on faire avec ce réseau ?
Il n'y a pas de résolution de nom possible. Et on ne peut pas attribuer d'IP fixe à un conteneur.
- Quelle commande permet la création d'un réseau en vue d'attribution d'IP fixe à des conteneurs ?
`docker network create nom_du_réseau --subnet 172.20.0.0/16`
`docker run --network stagenet --publish 80:80 --ip 172.20.0.100 --name www --hostname web --detach nginx:1.24`

## Persistance des données - Volumes docker et montages bind

On rappelle qu'une fois le conteneur arrêté et supprimé, l'ensemble de ses données est perdu.
S'il souhaite conserver des données, il faut alors les externaliser de plusieurs manières :

- Copie des données à l'aide de `docker cp` 
- Utilisation des montages bind (fonctionnalité du noyau Linux)
- Recours aux volumes docker (objets docker)

## Volumes docker

https://docs.docker.com/storage/volumes/

Def : un volume est un objet associé à un répertoire lors de sa création.

`docker volume ls` pour lister des volumes

`docker create data` pour créer un nouveau volume

`docker volume inspect data` inspection d'un volume

`docker run -it -v data:/partage --rm busybox`
Création d'un répertoire `partage` dans le conteneur
Utilisation d'un volume
Lier un volume à un répertoire

Pour supprimer un volume, il faut le demander explicitement
suppression d'un volume (à condition qu'il ne soit pas utilisé par un conteneur)
`docker volume rm data`
`docker volume prune` suppression des volumes anonymes (créés par une image par exemple) et non rattachés à un conteneur

Problème : le point de montage est accessible uniquement en root
En règle générale, les volumes sont utilisés pour le stockage de données produites par le conteneur (SGBD, LDAP, Redis, logs...).
Pour ce qui est des autres données (fichiers de sites, html, php, conf...) on a recours au montage bind.

### Montage bind

Au niveau linux, un montage bind est tout simplement l'association d'un répertoire à un autre.
https://www.baeldung.com/linux/bind-mounts

Procédure classique

Création d'un répertoire
`mkdir data`
Utilisation d'un montage bind avec un conteneur
`docker run -it --rm -v ./data:/partage busybox`

Procédure moins classique

`docker run -it --rm -v ./nom_inexistant:/partage busybox`
Dans ce cas le répertoire est automatiquement créé !!!
Pour ne pas courir le risque de création inopinée de répertoire, il est conseillé d'utiliser la notation suivante :
`docker run -it --rm --mount type=bind,src=./date,target=/partage --user 1000 busybox`

Consignes

En une ligne de commande(s), supprimer l'ensemble des conteneurs
`docker rm -f $(docker ps -aq)`

Recréer les deux conteneurs www et php avec l'ensemble des fichiers suivants

- default.conf
- index.html
- index.php

de façon à ce qu'ils soient disponibles dès le lancement des conteneurs.

```shell
mkdir conf
mkdir site

mv default.conf conf/default.conf
mv index.html site/index.html
mv index.php site/index.php

docker network create stagenet --subnet 172.20.0.0/16
docker run -d --name php --network stagenet -v ./site:/var/www/html/ php:8.2-fpm
docker run -d --name www --publish 80:80 --network stagenet -v ./site:/usr/share/nginx/html/ -v ./conf:/etc/nginx/conf.d/ nginx:1.24
```

On lance d'abord le conteneur php sinon le conteneur nginx plante au démarrage, il a besoin de php.

Question
Que se passe-t-il à la suite de la commande suivante ?
`docker run --detach --network stagenet -v datadb:/var/lib/mysql --name db mariadb:10.8`
On lance un conteneur mariadb (téléchargé) en arrière-plan sur un réseau stagenet et on persiste les données dans un volume datadb
Le conteneur s'arrête... on peut investiguer avec `docker logs db`
Le conteneur a besoin de créer un utilisateur root pour mariadb -> manque les infos pour la création du mdp admin mariadb
On peut lui passer ces infos avec des variables d'environnement

Variables d'environnement
Ce sont des variables peuplant l'environnement d'un conteneur, destinées à être utilisées par ce dernier, la plupart du temps lors de l'initialisation.

Méthode 1
```shell
docker run -it --rm --name busy -e VAR_1=valeur1 -e VAR_2=valeur2 busybox
/ # env
HOSTNAME=5b2264682a97
SHLVL=1
HOME=/root
TERM=xterm
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PWD=/
VAR_1=valeur1
VAR_2=valeur2
/ #
```

Méthode 2
Création d'un fichier de variables : busy.env
VAR_3=valeur3
VAR_4=valeur4

`docker run -it --rm --name busy -e VAR_1=valeur1 -e VAR_2=valeur2 --env-file busy.env busybox`

Adaptation de la commande de lancement du conteneur MariaDB
```shell
docker run --detach \
--network stagenet \
-v datadb:/var/lib/mysql \
-v ./sql.d:/docker-entrypoint-initdb.d/ \
-e MARIADB_DATABASE=stage \
-e MARIADB_ROOT_PASSWORD=azerty \
--name db \
mariadb:10.8
```

Fichier stage.sql du répertoire sql.d
```sql
CREATE TABLE t1(id int);
INSERT INTO t1 VALUES (1),(2),(3);
```

## Gestion des images : Dockerfile

#### Construction d'une image

S'effectue par la commande `docker build` utilisant un fichier d'instruction.
Il faut un contexte.

Noms par défaut :

- Dockerfile
- dockerfile

Exemple initial:
Fichier Dockerfile
```yaml
FROM php:8.2-fpm
RUN  docker-php-ext-install pdo_mysql
```

Qu'est-ce qu'un Dockerfile ?
Docker can build images automatically by reading the instructions from a Dockerfile. 
A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.

Construction de l'image
`docker build ./ -t php-mariadb:8.2-fpm`
t : option tag

Etape supplémentaire possible :
envoi `--push` vers une registry

#### Instructions possibles d'un Dockerfile

- FROM : Image de départ, amenée à subir les instructions suivantes.
- COPY : Copie de fichiers du contexte vers l'image
- ADD : Copie d'un fichier du contexte vers l'image et traitement possible s'il s'agit :
  - d'une archive tar/tar.gz
  - d'une URL
- RUN : Exécution de commandes à l'intérieur "de l'image"
  Remarque : Chaque instruction RUN donne lieu à un layer supplémentaire !
- ENV : Peuple l'environnement des futurs conteneurs
- ARG : Permet le passage d'argument au sein du Dockerfile -- lors du build. Les valeurs sont passées par l'option --build-arg NOM=valeur.
- USER : Définit le compte d'exécution du futur conteneur. Définit le compte utilisé par les instructions figurant à la suite de celle-ci, lors du build.
- ENTRYPOINT : Point d'entrée dans le conteneur -> processus initial. allows you to configure a container that will run as an executable.
- CMD : instruction sets the command to be executed when running a container from an image. You can specify CMD instructions using shell or exec forms:
  - CMD ["executable","param1","param2"] (exec form)
  - CMD ["param1","param2"] (exec form, as default parameters to ENTRYPOINT)
    Deux cas possibles :
    Si ENTRYPOINT est défini, alors CMD sera un argument du processus ENTRYPOINT 
    Dockerfile illustratif
    ```yaml
    FROM    debian:12
    COPY    init.sh /
    ENTRYPOINT ["/init.sh"]
    ```
    Fichier init.sh
    ```shell
    #!/bin/bash
    date
    exec "$@"
    ```
    Si ENTRYPOINT n'est pas défini, alors CMD sera réellement le processus initial.
- EXPOSE : 

Remarque : Navigation au sein d'une image et ses layers
`docker run -it -v /run/docker.sock:/run/docker.sock wagoodman/dive test:0.1`
https://github.com/wagoodman/dive

Exemple de dockerfile
```yaml
FROM    debian:12
COPY    sql.d/stage.sql /usr/src
ADD     site.tar.gz /opt
ARG     LOGIN=bob
LABEL   auteur Bob
RUN     groupadd admin && useradd -m -G admin -s /bin/bash ${LOGIN}
ENV     USER ${LOGIN}
USER    ${LOGIN}
ENTRYPOINT  ["date"]
```

Construction de l'image
`docker build . -t test:0.1`

Résumé J2 :
- Création d'une image perso avec Dockerfile, commande : `docker image build .`
- Si tout s'est bien passé, on peut récupérer l'id de l'image (ex : 3199372aa3fc) -> on peut aussi taguer les images pour faire plus simple que les id
`--tag <image repository>:<image tag>`
- On lance on conteneur avec l'image créée `docker container run --rm --detach --name custom-nginx-packaged --publish 8080:80 3199372aa3fc`
ou plus simplement avec un tag : `docker image build --tag custom-nginx:packaged .`

Quiz

Quelle différence fondamentale peut-on voir entre les volumes et les montages bind ?
- **Les volumes sont des objets docker, les montages bind, une fonctionnalité du noyau Linux utilisée par docker**
- Il est plus facile de lister les volumes -> docker volume ls
Pour les montages bind c'est autrement plus difficile
- Les volumes sont adaptés pour les fichiers gérés par les applications
Les montages bind pour les fichiers que l'on souhaite transférer aux conteneurs

Que fait cette commande ?
- `docker volume prune` : Ne supprime que les volumes anonymes non utilisés par un conteneur
- `docker container prune` : Supprime les conteneurs arrêtés
- `docker image prune` : Supprime les images sans nom (none:none)
- `docker network prune` : Supprime les réseaux non utilisés

## Docker compose : IaC

Jusqu'à présent ont été vu des commandes CLI, unitaires, peu lisibles, peu maintenables.
Docker compose permet d'améliorer la situation en décrivant une infrastructure à l'aide d'un fichier texte au format YAML.

### "Langage" YAML

YAML : Yet Another Markup Language
YAML : YAML Ain't Markup Language

Format de description de structures de données scalaire, c'est-à-dire sous la forme variable -> 1 valeur.
On peut également écrire des listes, mais attention, l'indentation doit être réalisée avec des espaces et en aucun cas par des tabulations,
et des tableaux associatifs / hachage / dictionnaires (Python) sous la forme variable -> ensemble de clé/valeur
2 syntaxes possibles pour les dictionnaires et les listes

Exemples : 

```yaml
stage: Formation Docker
nb: 10
stagiaires:
  - bob
  - curt
  - pat
fruits: ['Apple', 'Orange', 'Strawberry', 'Mango']
bob:
  - login: bob
  - uid: 1000
  - hell: /bin/bash
  - password: azerty
martin: {name: Martin D'vloper, job: Developer, skill: Elite}
```

La cohérence syntaxe peut être vérifiée par l'outil yamllint.

Le plugin compose de docker utilise le format YAML pour décrire une infrastructure composée d'un ensemble de services, chaque service étant un conteneur.

Dans le temps, il fallait installer un utilitaire (docker-compose) pour utiliser docker compose.
Aujourd'hui la fonctionnalité est comprise en temps que dépendance.

Exemple : Traduction compose de la commande suivante

```shell
docker run -d \
           --name busy \
           --publish 9000:9000 \
           --publish 80:80 \
           -v data:/partage \
           -v ./config:/opt/config \
           -e USER=bob \
           --network stagenet
           busybox sleep infinity
```

exemple de fichier compose.yml

```yaml
---
services:
  busytest:
    image: busybox:latest
    container_name: busy
    ports:
      - 9000:9000
      - 80:80
    volumes:
      - data:/partage
      - ./config:/opt/config
    environment:
      - USER=bob
    command:
      - sleep
      - infinity
    networks:
      stagenet:
    restart: always

volumes:
  data:
    external: true

networks:
  stagenet:
    external: true
```

La conformité est vérifiée par :

`docker compose config`

La stack est démarrée par : 

`docker compose up -d` (-d pour détaché)

Liste des stacks

`docker compose ls`

Liste des conteneurs d'une stack

`docker compose ps`

NB: Si le fichier n'est pas présent dans le répertoire courant ou à un autre nom que le nom par défaut, il faut "forcer" l'utilisation d'un autre fichier

`docker compose -f fichier_compose ps`

Arrêt d'une stack

`docker compose down`
normalement la commande est sans option, s'il y a des options, il faut faire attention
par exemple, -v ne signifie pas verbose mais suppression d'un volume

Micro-TP
Consigne : Création d'une stack avec le seul conteneur www en reprenant les caractéristiques du précédent conteneur www :
- nom: www
- port : 80:80
- volumes : ./site et ./conf-nginx
- réseau: stagenet dédié

L'idée est de regrouper tout ce qui concerne la stack dans un répertoire dédié, www-php par exemple. Ce qui donne l'arborescence suivante :

```
www-php/
├── conf-nginx
│   └── default.conf
└── site
├── index.html
├── index.php
└── testdb.php
```

En adaptant, momentanément, le fichier default.conf, on a le compose.yml suivant :

```yaml
---
services:
  web:
  image: nginx:1.24
  container_name: www
  ports:
  - 80:80
  volumes:
  - ./site:/usr/share/nginx/html
  - ./conf-nginx:/etc/nginx/conf.d
  networks:
    stagenet:
  restart: always

networks:
  stagenet:
```

Ajout du service php :
- nom: php
- image: php:8.2-fpm
- volume : ./site:/var/www/html
- réseau: stagenet dédié
- restart: always

Le fichier compose.yml devient :

```yaml
---
services:
  web:
    image: nginx:1.24
    container_name: www
    ports:
    - 80:80
    volumes:
    - ./site:/usr/share/nginx/html
    - ./conf-nginx:/etc/nginx/conf.d
    networks:
      stagenet:
    restart: always
  
  php:
    image: php:8.2-fpm
    container_name: php
    volumes:
    - ./site:/var/www/html
    networks:
      stagenet:
    restart: always

networks:
  stagenet:
```

Consigne : Mise en œuvre d'une stack séparée avec le seul conteneur mariadb.

-> Répertoire séparé :
- nom de service : db
- nom du conteneur : db
- image : mariadb:10.8
- volume : datadb : external
- réseau : réflexion...
- restart : always

Deux options :

Fichier compose.yml

```yaml
---
services:
  db:
    image: mariadb:10.8
    container_name: db
    volumes:
      - datadb:/var/lib/mysql
    environment:
      - MARIADB_ROOT_PASSWORD=azerty
      - MARIADB_DATABASE=stage
    networks:
      - phpdb
    restart: always

networks:
  phpdb:
    external: true

volumes:
  datadb:
```

Avant le lancement de la stack mariadb, il convient de créer le réseau phpdb :
`docker network create phpdb`

La stack est alors lancée par :
`docker compose up -d`

Une fois la stack démarrée, on peut relancer la stack www-php après avoir ajouté le conteneur php dans le réseau phpdb :

```yaml
---
services:
  web:
    image: nginx:1.24
    container_name: www
    ports:
      - 80:80
    volumes:
      - ./site:/usr/share/nginx/html
      - ./conf-nginx:/etc/nginx/conf.d
    networks:
      stagenet:
    restart: always

  php:
    image: php:8.2-fpm
    container_name: php
    volumes:
      - ./site:/var/www/html
    networks:
      stagenet:
        phpdb:
    restart: always

networks:
  stagenet:
  phpdb:
    external: true

# Fichier compose avec un build intégré
  php:
    image: php-mariadb:8.2-fpm
    build:
    context: .
    dockerfile: Dockerfile-php-mariadb
    container_name: php
    volumes:
      - ./site:/var/www/html
    networks:
      stagenet:
      db_phpdb:
    restart: always
```

Variabilisation d'un compose

L'idée est double :
- éviter la présence de données sensibles dans un fichier compose
- éviter au maximum de devoir le modifier

Valeur des variables
- Nom de l'image
- Tag de l'image

Partout où cela est souhaité, on fait appel à des variables, par exemple :

```yaml
---
services:
  db:
    image: ${MARIADB_IMAGE_NAME}:${MARIADB_IMAGE_TAG}
    container_name: db
    volumes:
      - datadb:/var/lib/mysql
    environment:
      - MARIADB_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD}
      - MARIADB_DATABASE=stage
    networks:
      - phpdb:
    restart: always

networks:
  phpdb:

volumes:
  datadb:
```

Les variables restent à définir dans le fichier `.env` :

```
MARIADB_IMAGE_NAME=mariadb
MARIADB_IMAGE_TAG=10.8
MARIADB_ROOT_PASSWORD=azerty
```

Surveillance d'un conteneur : état de santé -> healthcheck

Si d'aventure les processus d'un conteneur ne répondent plus, par défaut aucune information n'est donnée à ce sujet.
Exemple de processus stoppés par (en tant que root) :
`kill -STOP $(ps -C nginx -o pid --no-headings)`

On ajoute la surveillance de l'état de santé d'un conteneur par la section healthcheck :

```yaml
---
services:
  web:
    image: nginx:1.24
    container_name: www
    hostname: nginx
    ports:
      - 80:80
    volumes:
      - ./site:/usr/share/nginx/html
      - ./conf-nginx:/etc/nginx/conf.d
    healthcheck:
      test: ["CMD","curl","-f","http://localhost/ready"]
      interval: 5s
      timeout: 1s
      retries: 3
    # start_period: 60s
    networks:
      stagenet:
    restart: always
```

Principe des ancres YAML

Dans le cas de portions de configuration identiques pour plusieurs conteneurs, 
les ancres permettent de définir la configuration à mutualiser à un seul endroit et de la propager partout où cela sera nécessaire :

```yaml
---
x-etiquetteA: &etiquetteB
logging:
driver: json-file
options:
max-size: 10m
max-file: 5

services:
  web:
    image: nginx:1.24
    container_name: www
    hostname: nginx
    ports:
      - 80:80
    volumes:
      - ./site:/usr/share/nginx/html
      - ./conf-nginx:/etc/nginx/conf.d
    healthcheck:
      test: ["CMD","curl","-f","http://localhost/ready"]
      interval: 5s
      timeout: 1s
      retries: 3
    # start_period: 60s
    networks:
      stagenet:
    restart: always
    <<: *etiquetteB
  
  php:
    image: php-mariadb:8.2-fpm
    build:
    context: .
    dockerfile: Dockerfile-php-mariadb
    container_name: php
    volumes:
      - ./site:/var/www/html
    networks:
      stagenet:
      db_phpdb:
    restart: always
    <<: *etiquetteB

networks:
  stagenet:

db_phpdb:
  external: true
```

On vérifie que la propagation s'effectue par :
`docker compose config`

Il faut ensuite réactualiser la stack
`docker compose up  -d`

Mise en œuvre d'une registry

Qu'est-ce qu'une registry ?
Il s'agit d'un dépôt alternatif d'images.

Pourquoi faire appel à une registry ?
- Stocker ses propres images
- Permettre l'accès à des images sans imposer l'accès à internet

Plusieurs déclinaisons

- Registry Insecure -> HTTP
- Registry Secure -> HTTPS
- Registry Secure Authentifiante

Déploiement d'une registry insecure sous forme de conteneur

Fichier compose de départ

```yaml
---
services:
  registry:
  image: registry:2.8
  container_name: registry
  restart: always
  ports:
  - 5000:5000
  volumes:
  - registrydb:/var/lib/registry

volumes:
  registrydb:
```

Première interrogation

curl -s localhost:5000/v2/_catalog|jq

Envoi d'une image vers la registry

- Tag de l'image afin d'incorporer la référence à la registry
- docker image tag php-mariadb:8.2-fpm localhost:5000/php-mariadb:8.2-fpm
- Push de l'image vers la registry
- docker push localhost:5000/php-mariadb:8.2-fpm

Nouvelle interrogation

```shell
curl -s localhost:5000/v2/_catalog|jq
{
"repositories": [
"php-mariadb"
]
}
```

Liste des tags d'un "repository"

```shell
curl -s localhost:5000/v2/php-mariadb/tags/list|jq
{
"name": "php-mariadb",
"tags": [
"8.2-fpm",
"latest"
]
}
```

Référence à une image de la registry dans un compose
php:
image: localhost:5000/php-mariadb:8.2-fpm
build:
context: .
dockerfile: Dockerfile-php-mariadb
container_name: php
volumes:
- ./site:/var/www/html
networks:
stagenet:
db_phpdb:
restart: always
<<: *logging

La registry ici mise en œuvre n'est pas "sescure". Le dialogue passe par HTTP !

Remarque
Par défaut, Docker n'accepte le dialogue en HTTP que pour les registry localhost -> docker info
Aussi toute tentative d'accès distant échoue car la registry ne supporte que le HTTP et les clients distants ne la contacte qu'en HTTPS.

Première solution
Configurer docker pour contacter la registry distante en HTTP.
Pour cela on ajoute la ligne suivante dans le fichier de conf, à créer si besoin, /etc/docker/daemon.json :
{
"insecure-registries": ["192.168.56.200:5000"]
}

Redémarrage du service docker
systemctl restart docker

Vérification
docker info

Remarque
Même si cela fonctionne, ce n'est pas conseillé -> on déconfigure.

Mise en place du mode HTTPS


Mise en place de l'authentification

Alpine

distribution Linux très légère que l'on peut privilégier sur les images debian ou ubuntu standard
c'est aussi plus sécurisé parce que plus léger = surface d'attaque plus petite

Analyse des vulnérabilités d'une image
Les images trivy (aquasec, bitnami...) permettent une analyse des vulnérabilités d'une image
`docker run -it -v /run/docker.sock:/var/run/docker.sock aquasec/trivy image debian:12`

## Documentations

Doc de Jonathan : https://documentation5852808.gitlab.io/docker/start/installation.html
Doc référence de Docker : https://docs.docker.com/reference/
Handbook FCC : https://www.freecodecamp.org/news/the-docker-handbook/