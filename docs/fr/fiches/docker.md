---
layout: doc
prev: false
next: false
---

# Fiche : Docker

Doc de Jonathan : https://documentation5852808.gitlab.io/docker/start/installation.html

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

Liste de tous les conteneurs

`docker ps -a`

Lancement d'un premier conteneur

`docker run nginx:1.24`

-> Lancement en avant-plan
-> choix du nom du conteneur laissé à Docker

`docker run --detach --name www --rm nginx:1.24`

--detach -> lancement en arrière-plan
--name -> affectation d'un nom précis
--rm -> suppression automatique du conteneur une fois arrêté (attention car perte des logs une fois supprimé)

Conteneur en mode interactif

De nombreuses images initient des conteneurs avec un processus shell (Debian, Ubuntu, Buxybox, Alpine). Pour obtenir un conteneur viable, il faut fournir les options -it :

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
- host : permet à un conteneur d'être rattaché à l'interface physique de l'hôte (peut être utile afin d'être directement sur le réseau ou pour manipuler la configuration réseau de l'hôte -> keepalived, routeur dynamique).
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
docker network create stagenet \ --subnet 172.18.0.0/16 \ -o com.docker.network.bridge.name=stagenet0
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

Commande : `docker run --name web -v /host/path/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx`
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

Pour redémarrer un service :

```shell
docker restart www
```

L'inconvénient, c'est que ce n'est pas automatisé !
ça fonctionne bien, mais comment faire persister les données.
Une fois le container arrêté, on perd toutes les données.
On pense modifier les images, mais en réalité non, puisqu'on ne peut jamais modifier les images.
C'est possible avec le volume et le montage bind (mécanisme propre à Linux).
