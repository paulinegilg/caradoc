---
layout: doc
prev: false
next: false
---

# Fiche : Docker

Doc de Jonathan : https://documentation5852808.gitlab.io/docker/start/installation.html
Doc référence de Docker : https://docs.docker.com/reference/
Handbook FCC : https://www.freecodecamp.org/news/the-docker-handbook/

## Théorie

Objectif : création de bulles logicielles

La conteneurisation mise en œuvre par Docker/Podman/Kubernetes s'appuie sur un ensemble de fonctionnalités avancées du noyau Linux :

- chroot
- Espaces de noms
- User
- Net
- UTS (Hostname)
- IPC
- Mnt
- PID
- Cgroup
- Time
- Montages Bind
- Iptables
- OverlayFS
- Cgroups

1 conteneur = 4 briques :

- Image : Arborescence de départ et des informations
- Conteneur : Instanciation de l'image
- Réseau
- Volume

Structure d'un dialogue élémentaire avec Docker :

`docker <type d'objet> action`

Pour chaque objet, un certain nombre d'actions sont possibles, parmi lesquelles il y a des actions standard :

- ls
- inspect
- rm
- prune

### Gestion des images

Un conteneur ne peut être créé qu'à partir d'une image présente localement.
Une image se récupère par la commande :

```sh
docker image pull nginx:1.24
docker image pull busybox
```

Sans indication précise, les images sont récupérées à partir de la registry communautaire docker hub.

Sans précision du tag -> tag latest

Attention, une image ne se modifie jamais

### Gestion des conteneurs

Liste des conteneurs actifs

```sh
docker container ls
docker ps
```

Liste de tous les conteneurs, même inactifs

`docker ps -a`

Liste de tous les identifiants des conteneurs

`docker ps -aq`

Suppression de tous les conteneurs

`docker rm -f $(docker ps -aq)`

Suppression des conteneurs arrêtés

`docker container prune`

Lancement d'un premier conteneur

`docker run nginx:1.24`

-> Lancement en avant-plan
-> choix du nom du conteneur laissé à Docker

`docker run --detach --name www --rm nginx:1.24`

--detach -> lancement en arrière-plan
--name -> affectation d'un nom précis
--rm -> suppression automatique du conteneur une fois arrêté (attention car perte des logs une fois supprimé)

Conteneur en mode interactif

De nombreuses images initient des conteneurs avec un processus shell (Debian, Ubuntu, Buxybox, Alpine).
Pour obtenir un conteneur viable, il faut fournir les options -it :

`docker run -it --name busy busybox`

Remarque :

Une fois la session terminée, le conteneur passe en statut "exited". Il est possible de le relancer par

`docker start -i busy`

Inspecter une image :

`docker image inspect busybox:latest`

Surcharge à proprement parler :

`docker run --rm busybox date`

Surcharge pour un conteneur en arrière-plan et en attente :

`docker run --detach --rm --name busy busybox sleep infinity`

Lancement d'une commande au sein d'un conteneur en exécution

```shell
docker exec -it busy sh
docker exec busy date
```

Exemple d'interrogation d'un conteneur nginx depuis un conteneur busy :

`docker exec busy wget -O - -q 172.17.0.2`

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

### Volumes docker

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

### Gestion des images

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