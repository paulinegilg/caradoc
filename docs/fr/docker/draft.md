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

```bash
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

```bash
curl -s localhost:5000/v2/_catalog|jq
{
"repositories": [
"php-mariadb"
]
}
```

Liste des tags d'un "repository"

```bash
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

## Exemple : Traefik (reverse-proxy)

### Constituer un `compose` avec 3 services

Fichier `compose.yml` :

```yaml
---
name: whoami
services:
  whoami-1:
    image: traefik/whoami
    hostname: whoami-1
    container_name: whoami-1
    ports:
      - 81:80
    networks:
      whonet:
    restart: always

  whoami-2:
    image: traefik/whoami
    hostname: whoami-2
    container_name: whoami-2
    ports:
      - 82:80
    networks:
      whonet:
    restart: always

  whoami-3:
    image: traefik/whoami
    hostname: whoami-3
    container_name: whoami-3
    ports:
      - 83:80
    networks:
      whonet:
    restart: always

networks:
  whonet:
```

Cela fonctionne, mais... ce n'est pas optimal, car les services ne sont accessibles que par le biais de ports dédiés.

Pour optimiser ce fonctionnement, plusieurs solutions sont possibles :

- Utiliser un FQDN (*Fully Qualified Domain Name*, correspond au champ host des requêtes HTTP) par service, par exemple `who1.stage.labo`, `who2.stage.labo`, `who3.stage.labo`, ...
- Utiliser une URL par service (par préfixe), par exemple `192.168.56.200/who1`, `192.168.56.200/who2`, `192.168.56.200/who3`, ...
- Utiliser une combinaison des deux (FQDN/URL), par exemple `who.stage.labo/who1`, `who.stage.labo/who2`, `who.stage.labo/who3`, ...

La mise en œuvre de ces différentes solutions peut être réalisée avec un *reverse-proxy*.

### Qu'est-ce qu'un reverse proxy ?

Le fonctionnement sécurisé des serveurs Web représente un problème et un challenge pour les administrateurs réseaux.
En effet les services en ligne comme l’utilisation d’Internet ou les Emails doivent passer par le réseau public.
Cependant une simple connexion directe à Internet peut rendre les systèmes vulnérables aux logiciels malveillants.
C’est pourquoi on utilise généralement pour se prémunir de ce risque, un composant réseau : le reverse-proxy ou proxy inverse en français.

Pour résumer, un serveur proxy est un intermédiaire de communication sur le réseau qui reçoit les requêtes pour les transmettre ensuite à l’ordinateur cible.
Dans les réseaux des entreprises, ce système est particulièrement utilisé pour fournir un accès à Internet plus sécurisé et davantage contrôlable pour les utilisateurs.
Un serveur configuré comme proxy représente dans ce cas l’unique connexion au réseau public. Il est parfois aussi nommé en anglais Forward-proxy.

Un serveur proxy canalise donc toutes les requêtes du réseau interne puis va les transmettre à l’adresse de l’expéditeur sur le serveur cible sur Internet.
Les réponses du serveur sont envoyées au proxy avant d’être distribuées aux différents appareils client.
De plus, cela reste anonyme, sauf si le proxy en utilisation est un proxy transparent. Pour économiser la bande passante et accélérer la récupération de la page Web,
les serveurs proxy sont généralement programmés pour qu’ils puissent mettre en cache (garder en mémoire) des contenus fréquemment demandés sans avoir besoin d’une nouvelle requête pour les afficher.

![](/fiches/traefik.png)

*Source : Traefik*

Exemples de reverse-proxy :

- traefik
- nginx
- ha-proxy
- apache
- squid

La plupart du temps, à chaque nouveau service, il faut reconfigurer le reverse-proxy.
Traefik est un reverse-proxy dynamique avec découverte automatique des services.
TODO : chercher des infos

Configuration composite :
  - Fichier de base
  - Indications données au niveau de chaque service Docker

Nous avons une configuration comme suit :

```
.
├── traefik
│ ├── compose.yml
│ └── traefik.yml
└── whoami
    └── compose.yml
```

Mise en œuvre initiale de Traefik
Fichier de configuration traefik/traefik.yml :

```yaml
---
entryPoints:
  http:
    address: ":80"
  
  https:
    address: ":443"

api:
  insecure: true

providers:
  docker:
    endpoint: "unix:///run/docker.sock"
    exposedByDefault: false
```

Fichier traefik/compose.yml

```yaml
---
services:
  proxy:
    image: traefik:v2.10
    container_name: proxy
    hostname: proxy
    ports:
      - 80:80
      - 8080:8080
    volumes:
      - ./traefik.yml:/etc/traefik/traefik.yml
      - /run/docker.sock:/run/docker.sock
    networks:
      proxynet:

networks:
  proxynet:
```

Une fois traefik déployé, on peut se connecter à son dashboard par
https://192.168.56.200:8080

Fichier whoami/compose.yml

```yaml
---
name: whoami
services:
  whoami-1:
    image: traefik/whoami
    hostname: whoami-1
    container_name: whoami-1
    networks:
      whonet:
      proxynet:
    restart: always
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik_proxynet
      - traefik.http.routers.who1.rule=Host(`who1.stage.labo`)

  whoami-2:
    image: traefik/whoami
    hostname: whoami-2
    container_name: whoami-2
    networks:
      whonet:
      proxynet:
    restart: always
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik_proxynet
      - traefik.http.routers.who2.rule=PathPrefix(`/who2`) -> redirige vers le bon service mais n'est pas lié au service
      - traefik.http.middlewares.stripwho2.stripprefix.prefixes=/who2 
      - traefix.http.routers.who2.middleware.stripwho2
      
  whoami-3:
    image: traefik/whoami
    hostname: whoami-3
    container_name: whoami-3
    networks:
      whonet:
      proxynet:
    restart: always
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik_proxynet
      - traefik.http.routers.who3.rule=(Host(`who.stage.labo`) && PathPrefix(`/who3`))
      - traefik.http.middlewares.stripwho3.stripprefix.prefixes=/who3
      - traefik.http.routers.who3.middlewares=stripwho3

networks:
  whonet:
  proxynet:
    name: traefik_proxynet
    external: true
```

Accès à un service par FQDN
Une fois le compose.yml de whoami adapté, on vérifie par
curl -H "host:who1.stage.labo" 192.168.56.200

router :
ensemble des règles qu'on donne à traefik pour dispatcher les requêtes vers les conteneurs ?
les conteneurs sont exposés via des ports
inconvénients : ça consomme des ports et il faut mettre des ports dans les requêtes côté client
solution : utiliser un reverse proxy, il est exposé via un port (80 en standard)
il faut lui dire, quand une requête arrive sur le port 80, vers quoi dispatcher
ça peut passer par un FQDN ou un path prefix ou les 2 en même temps

Middleware pour striper les url (voir who2)

Traefik permet de faire beaucoup de choses que les services ne peuvent pas.
Notamment l'authentification

Ici ne sera évoquée que l'authentification sur fichier.
On stockera les infos d'authentification dans le fichier users.password qu'il faudra intégrer dans le conteneur proxy.

Création du fichier users.password à l'aide d'un conteneur httpd

```bash
docker run -ti -v .:/tmp --rm httpd htdigest -c /tmp/users.password who curt
```

Le fichier généré ressemble à

```
curt:who:a6262081994a23d74abe0be769d98450
```

Maj du fichier traefik/compose.yml

```yaml
---
services:
  proxy:
    image: traefik:v2.10
    container_name: proxy
    hostname: proxy
    ports:
      - 80:80
      - 8080:8080
    volumes:
      - ./traefik.yml:/etc/traefik/traefik.yml
      - /run/docker.sock:/run/docker.sock
      - ./users.password:/etc/traefik/users.password
    networks:
      proxynet:

networks:
  proxynet:
```

Maj du fichier whoami/compose.yml

```yaml
---
name: whoami
services:
  whoami-1:
    image: traefik/whoami
    hostname: whoami-1
    container_name: whoami-1
    networks:
      whonet:
      proxynet:
    restart: always
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik_proxynet
      - traefik.http.routers.who1.rule=Host(`who1.stage.labo`)

  whoami-2:
    image: traefik/whoami
    hostname: whoami-2
    container_name: whoami-2
    networks:
      whonet:
      proxynet:
    restart: always
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik_proxynet
      - traefik.http.routers.who2.rule=PathPrefix(`/who2`)
      - traefik.http.middlewares.stripwho2.stripprefix.prefixes=/who2
      - traefik.http.middlewares.loginwho2.basicauth.usersfile=/etc/traefik/users.password
      - traefik.http.routers.who2.middlewares=stripwho2,loginwho2
      
  whoami-3:
    image: traefik/whoami
    hostname: whoami-3
    container_name: whoami-3
    networks:
      whonet:
      proxynet:
    restart: always
    labels:
      - traefik.enable=true
      - traefik.docker.network=traefik_proxynet
      - traefik.http.routers.who3.rule=(Host(`who.stage.labo`) && PathPrefix(`/who3`))
      - traefik.http.middlewares.stripwho3.stripprefix.prefixes=/who3
      - traefik.http.routers.who3.middlewares=stripwho3

networks:
  whonet:
  proxynet:
    name: traefik_proxynet
    external: true
```

https://doc.traefik.io/traefik/middlewares/http/digestauth/

Micro-TP
Consignes :

    Ajout du service webapp avec les caractéristiques suivantes
    image: bob2606/webapp:latest
    port publié : 88 -> 9191 (contrainte : comment rediriger vers un port non conventionnel)

    Pour valider, ce service dispose des trois urls /etone, /ettwo, /metrics

On a désormais une structure comme suit : 

```
.
├── traefik
│ ├── compose.yml
│ └── traefik.yml
├── webapp
│ └── compose.yml
└── whoami
    └── compose.yml
```

Ajout d'un nouveau fichier webapp/compose.yml

```yaml
---
services:
  webapp:
    image: bob2606/webapp
    container_name: webapp
    networks:
      - proxynet
    restart: always
    labels:
      - traefik.enable=true
      - traefik.http.routers.webapp.rule=PathPrefix(`/webapp`)
      - traefik.http.services.webapp.loadbalancer.server.port=9191
      - traefik.http.middlewares.stripwebapp.stripprefix.prefixes=/webapp
      - traefik.http.routers.webapp.middlewares=stripwebapp

networks:
  proxynet:
    name: traefik_proxynet
    external: true
```

-> possibilité d'utiliser un gestionnaire d'erreurs
pour intercepter les erreurs

Nous avons désormais la structure suivante : 

```
├── traefik
│   ├── compose.yml
│   ├── error-pages
│   │   ├── 403.html
│   │   └── 404.html
│   └── traefik.yml
├── webapp
│   └── compose.yml
└── whoami
    └── compose.yml
```

Maj du fichier traefik/compose.yml

```yaml
---
services:
  proxy:
    image: traefik:v2.10
    container_name: proxy
    hostname: proxy
    ports:
      - 80:80
      - 8080:8080
    volumes:
      - ./traefik.yml:/etc/traefik/traefik.yml
      - /run/docker.sock:/run/docker.sock
      - ./users-basic.password:/etc/traefik/users.password
    networks:
      proxynet:

  errorhandler:
    image: nginx:1.23
    container_name: errorhandler
    ports:
      - 8888:80
    volumes:
      - ./error-pages/:/usr/share/nginx/html
    restart: always
    networks:
      proxynet:
    labels:
      - traefik.enable=true
      - traefik.http.services.errorhandler.loadbalancer.server.port=80

networks:
  proxynet:
```

Maj du fichier webapp/compose.yml

```yaml
---
services:
  webapp:
    image: bob2606/webapp
    container_name: webapp
    networks:
      - proxynet
    restart: always
    labels:
      - traefik.enable=true
      - traefik.http.routers.webapp.rule=PathPrefix(`/webapp`)
      - traefik.http.services.webapp.loadbalancer.server.port=9191
      - traefik.http.middlewares.stripwebapp.stripprefix.prefixes=/webapp
      - traefik.http.middlewares.errorwebapp.errors.status=400-599
      - traefik.http.middlewares.errorwebapp.errors.service=errorhandler
      - traefik.http.middlewares.errorwebapp.errors.query=/{status}.html
      - traefik.http.routers.webapp.middlewares=stripwebapp,errorwebapp

networks:
  proxynet:
    name: traefik_proxynet
    external: true
```

## La sécurité dans un environnement Docker

2 aspects : 
- règles de bonne pratique
- lignes de défense possibles

### Règles de bonne pratique

- Faire les mises à jour
  à la fois au niveau du système (noyau Linux) et au niveau de l'environnement Docker
  par défaut, le service Docker fonctionne en tant que root
- Ne pas exposer les services Docker outre mesure sur TCP/IP
  Par défaut, les accès TCP/IP ne sont pas activés
  Le service n'est accessible qu'à partir de la socket Unix /run/docker.sock. 
  L'utilisation de cette dernière n'est possible que pour le compte root et le groupe docker.
  
  Sécurisation des accès distants
    - Accès non chiffrés (2375)
    - TLS sans authentification (2376)
    - TLS avec authentification 
    - Accès sécurisés et authentifiés par SSH

- Définir un utilisateur non root pour les conteneurs
  Par défaut, une image crée un conteneur root. Quelques éditeurs -- bitnami -- fournissent des images non root.

  Au niveau CLI

  `docker run -it --rm --user 1000:2000 busybox`

  Au niveau compose
  `user: '1000[:2000]'`

  Ce n'est malheureusement pas toujours une solution acceptable, certaines applications imposent de fonctionner avec le compte root !

  Solution : Utilisation du mode userns du service Docker.

- Limiter le recours aux capabilities
Sur un système Linux, le compte root a tous les droits/pouvoirs -> cela rend l'utilisation de su très dangereuse.
Sous Linux les capabilities sont un découpage des prérogatives de root en fonctionnalités unitaires.
Docker génère des conteneurs root avec seulement un sous-ensemble des capabilities normalement accordées à root.

Liste des capabilities accordées par défaut
https://github.com/moby/moby/blob/master/oci/caps/defaults.go#L6-L19

Deux options de gestion des capabilites

    --cap-add

    --cap-drop


    Une bonne pratique :

    --cap-drop ALL --cap-add cap1,cap2


    Une autre bonne pratique

    NE JAMAIS UTILISER L'OPTION --privileged !!!

    Cette option désactive l'ensemble des mécanismes de sécurité.


    Désactivaton des communications inter-conteneurs (icc)

     - Au niveau du réseau bridge par défaut

    Ajout de la ligne suivante dans le fichier de configuration /etc/docker/daemon.json -- à créer si besoin

    {

        "icc": false

    }

    Dès lors pour faire deux conteneurs : 
    - Les attacher à un réseau utilisateur
    - Définir les deux conteneurs dans le même espace de noms réseau

        Au niveau d'un réseau utilisateur
        Au moment de sa création
        docker network create testnoicc -o com.docker.network.bridge.enable_icc=false

- Ne mettre sur un même réseau que les conteneurs devant communiquer entre eux.
- Limiter l'utilisation des ressources
  Plusieurs limitations
  --cpus
  --memory
- Utiliser des systèmes de fichiers en lecture seule
  L'option --read-only interdit tous les accès en écriture à l'arborescence, sauf celle des différents volumes.

  Pour autoriser un accès en écriture :
  Option --tmpfs /rep
  Utilisation d'un volume/montage bind

    Montage en read-only
    docker run -it --rm --read-only -v ./data:/data:ro busybox

### Lignes de défense

- AppArmor
- SecComp
- NoNewPrivs
- Conteneur rootless (déjà évoqué plus haut)
- Conteneur userns
- Docker rootless

#### AppArmor

Mécanisme de sécurisation du noyau

Définition :

AppArmor ("Application Armor") est un logiciel libre de sécurité pour Linux. 
AppArmor permet à l'administrateur système d'associer à chaque programme un profil de 
sécurité qui restreint les capacités de celui-ci.

Il s'agit plus précisément d'un outil qui permet de verrouiller les applications en 
limitant strictement leur accès aux seules ressources auxquelles elles ont droit 
sans perturber leur fonctionnement.

Pour savoir si AppArmor est activé :
`docker info`
Par défaut, Docker charge un profil AppArmor minimaliste
En toute logique, on devrait définir un profil dédié pour chaque image un peu sensible

```bash
# Désactivation de AppArmor

docker run -it --rm --security-opt apparmor=unconfined --name busy busybox

# Vérification

docker container inspect busy | grep -i apparmor

# Utilisation au sein d'un conteneur

docker run -it --rm --security-opt apparmor=docker-nginx --name busy busybox
```

Profil par défaut

https://github.com/moby/moby/blob/master/profiles/apparmor/template.go

## Docker Swarm

### Qu'est-ce que Docker Swarm ?

**Docker Swarm** ("essaim" en français) est un **orchestrateur** de conteneurs, c'est-à-dire un outil conçu par Docker permettant de gérer un **cluster** très facilement.
C'est une solution native de Docker.

Un **cluster** est un ensemble de **nodes**.

Les **nodes** peuvent être, entre autres :

- des machines physiques
- des machines virtuelles (VM)

Les **nodes** sont de deux types :

- nodes de travail (*workers*)
- nodes de gestion (*managers*)

Les *managers* ont pour rôle d'assurer : 

- d'assurer la prise en compte des demandes et le déploiement de ressources en fonction
- la configuration du *clusteur*
- l'ordonnancement des ressources

Dans le cas de Swarm, à tout moment, un *worker* peut être promu *manager* et vice versa.

Remarques : il faut minimum 3 managers dans un cluster pour supporter une possible perte d'un manager.
Ainsi, une petite infrastructure robuste (tolérante à la panne et capable de se répartir de la charge) peut être constituée de 3 managers.

Autres solutions d'orchestrateur :

- Kubernetes
- Openshift (RedHat)
- Nomad (Hashicorp)
- Mesos (Apache - à vérifier)

### Exemple : mise en place d'une infrastructure avec 3 nodes

**Pré-requis à mettre en place :**

- 3 hosts Linux pouvant communiquer à travers un network avec Docker installé et le mode Swarm inactif
- Communication IP entre les machines
- Ports 2377/TCP et 4789/UDP soient accessibles
- Hostnames différents

**Initialisation du *cluster* :**

```bash
docker swarm init [ --advertise-addr 192.168.56.200 ]
```

À l'issue de cette commande :

- le node courant est initialisé en tant que manager
- le mode Swarm est désormais actif (avec `docker info | grep Swarm`, la commande d'ajout d'un worker est affichée)
- 2 nouveaux réseaux sont présents
  - ingress de type overlay
  - docker_gwbridge de type bridge

TODO : plus d'info ici https://bobcares.com/blog/docker-swarm-and-ingress-network/
Quand on travaille avec Swarm, on n'utilise plus de réseaux bridge, mais des réseaux overlay.
Overlay : peu importe le point d'entrée, on est toujours amené vers le conteneur.

**Ajout d'un node worker au cluster :**

```bash
# Récupération de la commande d'ajout
docker swarm join-token worker

# Une fois connecté sur le node à ajouter, on lance la commande
docker swarm join --token SWMTKN-1-1rc...obmuxgsjdcy23tmgldn4b 192.168.56.200:2377
```

Remarque : pour lancer Swarm sur une machine, on peut lancer les commandes `docker swarm init` ou `docker swarm join`

#### Gestion de base des nodes et des clusters

Toutes ces commandes ne peuvent se lancer **que depuis un manager**.

```bash
# Liste des nodes
docker node ls

# Promotion d'un node
docker node promote swarm-2

# Rétrogradation d'un node
docker node demote swarm-2

# Suppression d'un node
# Sur le node à supprimer
docker swarm leave

# Sur un node manager
docker node rm swarm-2

# Mise en pause d'un node
# L'ordonnanceur ne déploiera plus de nouveaux conteneurs, mais y laissera les conteneurs actuels
docker node update --availability pause swarm-2

# Désactivation d'un node
# L'ordonnanceur ne déploiera plus de nouveaux conteneurs et y supprimera les conteneurs actuels
docker node update --availability drain swarm-2

# Réactivation/sortie de pause d'un node
docker node update --availability active swarm-2
```

### Création d'un service

Un service est un nouvel objet Docker, n'ayant d'existence qu'au sein d'un cluster Swarm.
Les services ne se déploient qu'à l'aide de commandes CLI.

[Documentation Docker - services (en anglais)](https://docs.docker.com/engine/swarm/services/)

```bash
# Création d'un service
docker service create --name www nginx:1.23

# Liste des services
docker service ls

# Infos sur les conteneurs d'un service
docker service ps www

# Mise à l'échelle d'un service
docker service scale www=2

# Suppression d'un service
docker service rm www
```

Tout comme `docker run`, `docker service create`, en tant que commande CLI a ses limites.
Pour nous simplifier la vie, on peut passer par une stack.

### Stack

Nouvel objet Docker, de niveau Swarm, permettant la gestion de plusieurs services, définis dans un fichier `compose`. 
À la différence de docker compose, il n'y a pas de nom par défaut, 
il faudra toujours indiquer le nom du fichier à la commande `docker stack deploy`.

La syntaxe est pour l'essentielle la même, malgré quelques différences.

Exemple de compose :

```yaml
---
services:
  hello:
    image: bob2606/hello-http:latest
    container_name: hello
    ports:
      - 80:8080
    environment:
      - MSG=Test Swarm
    restart: always
    networks:
      hellonet:

networks:
  hellonet:
```

Remarque : les directives `container_name` et `restart` sont soit obsolètes, soit non supportées.

```bash
# Déploiement d'une stack
docker stack deploy hello -c hello-http.yml

# Liste des services d'une stack
docker stack services hello

# Liste des conteneurs d'une stack
docker stack ps hello

# Mise à l'échelle d'un service d'une stack
docker service scale hello_hello=3
```

### Exemple de création de stack PHP

Utiliser les montages bind dans le cas de Swarm impose de synchroniser les nodes entre eux.
Une meilleure solution est d'utiliser des volumes réseaux, par exemple des **volumes NFS** (*Network File System*).

#### Mise en œuvre d'un partage NFS

Ici, swarm-1 sera configuré en serveur NFS.

##### Sur swarm-1 (serveur NFS)

```bash
# Installation du paquet nfs-kernel-server
apt install nfs-kernel-server
```

Définition d'un partage NFS : 

Ajout de la ligne suivante dans /etc/exports : `/home/stagiaire/docker-app-s1124/partage *(rw,no_root_squash,no_subtree_check,fsid=0)`

```bash
# Actualisation du service NFS (en tant que root)
exportfs -a
```

##### Sur les clients NFS

```bash
# Installation du paquet nfs-common
apt install nfs-common
```

Définition d'un volume NFS : 

```yaml
volumes:
  site:
    driver_opts:
      type: nfs
      o: addr=192.168.56.200,vers=4.2
      device: ":/site"
```

On a désormais la structure suivante : 

```
.
├── partage
│   ├── conf
│   │   └── default.conf
│   └── site
│       ├── index.html
│       └── index.php
└── swarm
    ├── hello-http.yml
    └── wwwphp.yml
```

#### Fichier `wwwphp.yml`

```yaml
---
services:
  www:
    image: nginx:1.23
    ports:
      - 80:80
    volumes:
      - site:/usr/share/nginx/html
      - conf:/etc/nginx/conf.d
    networks:
      wwwphpnet:
    depends_on:
      - php

  php:
    image: php:8.2-fpm
    volumes:
      - site:/var/www/html
    networks:
      wwwphpnet:

  busy:
    image: busybox
    command:
      - sleep
      - infinity
    networks:
      wwwphpnet:

networks:
  wwwphpnet:
    name: wwwphpnet

volumes:
  site:
    driver_opts:
      type: nfs
      o: addr=192.168.56.200,vers=4.2
      device: ":/site"

  conf:
    driver_opts:
      type: nfs
      o: addr=192.168.56.200,vers=4.2
      device: ":/conf"
```

Remarque : par défaut, les conteneurs partagent un même réseau lorsqu'ils sont en mode Swarm.
TODO : vérifier cette info

### Exemple de création de stack mariadb

On a la structure suivante :

```
.
├── partage
│   ├── conf
│   │   └── default.conf
│   ├── db
│   │   └── ...
│   └── site
│       ├── index.html
│       └── index.php
└── swarm
    ├── db.yml
    ├── hello-http.yml
    └── wwwphp.yml
```

Fichier `db.yml`

```yaml
---
services:
  db:
    image: mariadb:10.8
    volumes:
      - db:/var/lib/mysql
    environment:
      - MARIADB_ROOT_PASSWORD=azerty
    networks:
      wwwphpnet:

networks:
  wwwphpnet:
    external: true

volumes:
  db:
    driver_opts:
      type: nfs
      o: addr=192.168.56.200,vers=4.2
      device: ":/db"
```

Très bien mais... attention, le mot de passe de mariadb est en clair !

Avec Swarm, on ne peut pas utiliser de variables d'environnement.
Il faut utiliser des *secrets*.

### Secrets

Les secrets sont des objets Docker Swarm permettant le stockage de données sensibles.

#### Création d'un secret

```bash
echo $password | docker secret create mariadb-password -
```

#### Utilisation d'un secret

```yaml
---
services:
  busy:
    image: busybox
    secrets:
      - password
    command:
      - sleep
      - infinity

secrets:
  password:
    name: mariadb-password
    external: true
```

Une fois la stack déployée, le secret password est accessible dans un fichier
de même nom dans le répertoire `/run/secrets`.

## Documentations

- Doc de Jonathan : https://jojotique-documentation.gitlab.io/docker/start/installation.html
- Doc référence de Docker : https://docs.docker.com/reference/
- Handbook FCC : https://www.freecodecamp.org/news/the-docker-handbook/
- Framapad : https://mypads2.framapad.org/p/docker-s0824-78j1z9e8