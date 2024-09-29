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

```bash
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

```bash
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
