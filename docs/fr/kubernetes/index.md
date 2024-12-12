## Documentation

https://mypads2.framapad.org/p/kubernetes-s5024-8to7o9nl
https://github.com/bob2204/kubernetes-s5024

## Qu'est-ce qu'un conteneur ?

Environnement logiciel complet et isolé du reste du système à l'aide de namespaces.

### Namespace

Les conteneurs utilisent la technologie des namespaces pour fournir un environnement isolé, complet et indépendant, 
où une application peut s'exécuter comme si elle était la seule sur le système. Voici comment cela fonctionne :

Un namespace est une fonctionnalité du noyau Linux qui crée une "vue" isolée de certaines ressources du système. 
Chaque conteneur obtient son propre ensemble de namespaces, ce qui garantit qu'il ne voit ou n'interagit qu'avec les ressources qui lui sont attribuées.

### Runtime de conteneurs

Containerd est un runtime de conteneurs. Il s'agit d'un outil essentiel qui gère le cycle de vie des conteneurs, depuis leur création jusqu'à leur destruction. 
Il est utilisé en arrière-plan par des plateformes comme Docker et Kubernetes pour effectuer des tâches liées aux conteneurs.

+ CRI-O

### Limitations d'une solution comme Docker

Docker est très puissant pour gérer des conteneurs individuels ou des applications simples, mais il montre ses limites pour :

- L'orchestration avancée (requiert des outils comme Kubernetes).
- L'isolation et la sécurité pour des environnements sensibles.
- La gestion simplifiée des réseaux et des volumes dans des environnements complexes.

- Un SPOF (Single Point of Failure) pour un Docker host signifie que si l’hôte physique ou virtuel exécutant Docker tombe en panne, tous les conteneurs et services qui y fonctionnent deviennent inaccessibles.
- Pas de scalabilité
- Pas de stratégie de mis à jour
- Pas d'historisation et rollback des mises à jour

## L'orchestrateur comme solution aux limitations de Docker

Un orchestrateur va permettre de dépasser les limitations de Docker :

- Mise en œuvre d'un cluster composé de plusieurs nodes.
- Possibilité de scalabilité (plusieurs exemplaires d'un même pod)
- Répartition de charge
  - Inter-node
  - Intra-node
- Possibilité de mises à jour selon plusieurs stratégies avec historisation et rollback.
- Tolérance de panne
  - Niveau pod
  - Niveau node

### Différents orchestrateurs

- Swarm (Docker)
- Nomad (Hashicorp)
- Kubernetes (CNCF : Cloud Native Computing Foundation)
- Mesos (Apache)

### Différentes distributions Kubernetes (K8S)

#### On-premise

- kubeadm
- kubespray (kubeadm + Ansible)
- rke2 (Rancher -> Suse)
- k3s (Mini-clusteur orienté IoT - Rancher)
- Micro-K8S (Ubuntu - Installation par snap)
- Openshift (Redhat)
  - OKD (Redhat - Déclinaison Opensource)
- (minikube)
- (kind : Kubernetes IN Docker)
- Talos (Système immutable + kubeadm piloté par API et talosctl)

#### Cloud
- GKE (Google)
- AKS (Azure)
- EKS (Amazon)
- OVH
- Oracle
- IBM
- DigitalOcean
- ...

::: info
Une distribution on-premise (ou sur site) désigne une installation d'un logiciel ou d'une plateforme directement sur les serveurs physiques ou virtuels d'une organisation, 
au lieu d'être hébergée sur des serveurs tiers (comme dans le cas des services cloud). L'organisation contrôle totalement l'infrastructure et le déploiement.
:::

### Limitations de Kubernetes

- Nombre de nodes : 5000 (15000 pour GKE)
- Nombre de pods/nodes : 110
- Nombre de pods/clusteur : 150000
- Nombre de conteneurs/clusteur : 300000

### Structure d'un clusteur

Un cluster Kubernetes est un ensemble de nodes, chaque node pouvant être une machine physique ou virtuelle, 
qui travaillent ensemble pour exécuter et gérer des conteneurs et les applications qu'ils hébergent. 
Kubernetes orchestre ces conteneurs pour garantir leur disponibilité, leur scalabilité et leur performance.

Les nodes n'ont pas à être identiques.

Il existe deux types de nodes :

- Nodes de travail : Worker
- Nodes de contrôle : Control Plane (CP)

Il est conseillé d'avoir au moins 3 CP. Le nombre de CP doit être initialement impair.

- 3 CP : Tolérance de 1 CP
- 5 CP : Tolérance de 2 CP
- 7 CP : Tolérance de 3 CP (7 CP est un maximum conseillé par Kubernetes)

::: info
Le Control Plane est le cerveau qui orchestre toutes les ressources Kubernetes.
La tolérance garantit que le cluster reste fonctionnel malgré des défaillances, 
grâce à des mécanismes comme la redondance, l'auto-réparation, et l'utilisation judicieuse des tolérances et contraintes.

La tolérance de 1 CP assure que le cluster Kubernetes peut fonctionner de manière résiliente même en cas de panne d'un nœud de son Control Plane, 
en s'appuyant sur les autres nœuds pour maintenir la gestion et la coordination des conteneurs.
:::

## Installation de l'infrastructure

// A relire
L’installation de Kubernetes peut varier selon les besoins et l’environnement. Pour un développement local, Minikube ou Docker Desktop sont les plus simples. Si vous souhaitez un cluster de production, kubeadm ou des services managés comme EKS, GKE ou AKS sont plus adaptés. Si vous avez des contraintes de ressources, K3s est une excellente option légère.

### Simplifier l'utilisation de `kubectl` avec un alias ou l'outil K9s

Dans Kubernetes, l'outil principal pour interagir avec un cluster est la commande `kubectl`. Cependant, taper cette commande complète à chaque fois peut devenir fastidieux, surtout lorsqu'on effectue des tâches répétitives. Une bonne pratique consiste à configurer un alias dans votre terminal pour abréger `kubectl` en `k`. Par exemple, en ajoutant `alias k='kubectl'` dans votre fichier de configuration de shell (comme `~/.bashrc` ou `~/.zshrc`), vous pourrez utiliser des commandes simplifiées comme `k get pod` au lieu de `kubectl get pod`. Cela permet de gagner du temps tout en améliorant votre productivité.

En complément de cette astuce, vous pouvez également explorer **K9s**, un outil interactif pour gérer vos clusters Kubernetes. K9s fournit une interface utilisateur en ligne de commande qui simplifie la navigation et l'interaction avec vos ressources Kubernetes. Plutôt que de taper manuellement des commandes, K9s vous permet de visualiser, d'éditer et de supprimer des ressources via des raccourcis clavier intuitifs. C'est un excellent moyen de rendre votre travail plus fluide, notamment lorsque vous devez effectuer des diagnostics rapides ou surveiller l'état des pods en temps réel.

En combinant un alias comme `k` pour les commandes ponctuelles et K9s pour une gestion plus visuelle et interactive, vous disposerez d'un environnement de travail optimisé, pratique pour les débutants comme pour les utilisateurs avancés.

## Le CNI

Le CNI (Container Network Interface) est un standard permettant de gérer le réseau des conteneurs 
dans des environnements comme Kubernetes. Il permet d'assigner des adresses IP aux pods, de configurer 
leur réseau et de gérer le routage du trafic entre eux et avec le monde extérieur. 
Le CNI est modulaire et flexible, permettant l'intégration de différents plugins réseau 
(comme Calico, Flannel, Weave) en fonction des besoins spécifiques de l'application. 
Il joue un rôle clé dans l'isolation et la sécurité des réseaux de conteneurs.

## Gestion des pods

Un pod est une unité d'exécution qui contient un ou plusieurs conteneurs, et qui fonctionne dans un nœud.
Un pod représente la plus petite unité de travail dans Kubernetes.
L'ensemble des conteneurs qui y sont partagent un même espace de nom réseau (les conteneurs d'un même pod peuvent donc communiquer entre eux à l'aide de l'IP 127.0.0.1).
Un pod ne peut pas être ordonnancé sur plusieurs nodes.

### Création d'un pod mono-conteneur

```bash
# Liste des pods
k get pod

# Describe d'un pod
k describe pod www

# Logs du conteneur d'un pod
k logs [-f] www

# Exécution d'une commande au sein du conteneur d'un pod
k exec [-it] www -- commande

# Suppression d'un pod
k delete pod www

# Surcharge de la commande par défaut du conteneur d'un pod
k run busy --image busybox:1.28 -- sleep 3600
```

### Micro-TP n°1

Création d'un pod hello à partir de l'image bob2606/hello-http:0.8.26 :

```bash
# Quelle est la commande ?
kubectl run hello --image=bob2606/hello-http:0.8.26

# Quelle est son IP ?
kubectl get pod hello -o wide
kubectl get pod hello -o json | jq -r '.status.podIP'

# Supprimer pod
kubectl delete pod hello

# Recréation du pod hello à partir de la même image
kubectl run hello --image=bob2606/hello-http:0.8.26 --port=8080 --restart=Never

# Que remarque-t-on au niveau de son IP ?
# Lorsqu'un pod Kubernetes est supprimé puis recréé, son adresse IP interne changera.
```

::: info
Chaque fois qu'un pod est recréé, Kubernetes lui assigne une nouvelle adresse IP à partir du pool d'adresses du réseau interne configuré pour le cluster.
L'ancienne adresse IP du pod supprimé sera libérée et pourra être réutilisée pour d'autres pods.
Il ne faut donc pas essayer de communiquer avec un pod en utilisant son IP.
:::

Création d'un pod busy à partir de l'image busybox:1.28, en tâche de fond :

```bash
# Quelle est la commande ?
kubectl run busy --image=busybox:1.28 --sleep 3600

# À partir du pod busy, lancer la commande suivante (sert à tester un service HTTP)
wget -O - -q http://IP_hello:8080
```

### Copie de fichiers vers/depuis un pod

Imaginons le fichier data.txt.

```bash
# Envoi du fichier dans le conteneur du pod www
k cp data.txt www:/tmp

# Récupération du fichier /etc/nginx/conf.d/default.conf
k cp www:/etc/nginx/conf.d/default.conf default.conf
```

## Manifest

Les commandes CLI, si elles restent intéressantes ponctuellement, ne sauraient répondre à tous les besoins.
Il faut souvent utiliser des fichiers YAML de création, appelés Manifest.

Un manisfest est un fichier YAML décrivant une ou plusieurs ressources.

### Creation d'un manifest initial

```bash
k run www --image nginx:1.26 --dry-run=client -o yaml [ > www-pod.yml ]
```

::: info
La commande `--dry-run est souvent utilisée pour tester des créations, des mises à jour ou des suppressions de ressources sans qu'elles soient effectivement appliquées. Cela permet de vérifier si la syntaxe est correcte et si la ressource serait validée par Kubernetes.
:::

Une fois le manifest créé, il est soumis à l'API par :

```bash
k apply -f www-pod.yml
```

Cette commande applique la configuration définie dans le fichier www-pod.yml à votre cluster Kubernetes. Elle crée ou met à jour le pod spécifié dans le fichier. Si un pod avec le même nom existe déjà, il sera mis à jour ; sinon, il sera créé.

Le fichier YAML contient les détails de la ressource Kubernetes à créer, comme le nom du pod, l'image du conteneur et les ports exposés.

#### Pourquoi utiliser un manifest pour gérer des pods ?

Sauf cas particulier, on ne gère pas directement les pods car :

- Ils sont volatiles (idem pour les IP)
- Ils ne sont pas scalables
- Ils ne peuvent pas être mis à jour
- Ils ne supportent pas le versionning ni le rollback des mises à jour

On utilisera plutôt des ressources de plus haut niveau :

- **Job** : Exécute des tâches ponctuelles ou à durée déterminée, garantissant que des pods s'exécutent jusqu'à leur complétion.

- **CronJob** : Exécute des Jobs programmés à intervalles réguliers, selon un calendrier défini.

- **ReplicaSet** : Maintient un nombre spécifié de réplicas de pods (identiques) en fonctionnement pour assurer la haute disponibilité.
  Un ReplicaSet n'étant pas modifiable, si l'on souhaite modifier l'une de ses caractéristiques, il faut en créer un autre. 
  Il est préférable d'utiliser une ressource de plus niveau telle un déploiement

- **Deployment** : Gère des mises à jour progressives des applications, garantissant la scalabilité 
  et la gestion des versions via des ReplicaSets. Permet une gestion plus aisée (même transparente) des ReplicaSets.
  Un déploiement est adapté pour les applications de type stateless.

- **DaemonSet** : Exécute un pod sur chaque nœud ou un sous-ensemble de nœuds pour des services comme la surveillance ou le logging. Déclinaison d'un déploiement créant un réplica par node.

- **StatefulSet** : Gère des applications avec état, garantissant l'ordre de déploiement et un nom unique pour chaque pod, 
  utilisé pour des applications nécessitant un état persistant comme les bases de données. 
  C'est la déclinaison adaptée à la mise en oeuvre d'applications stateful.

### Gestion des déploiements

````bash
# Création d'un déploiement
k create deployment http --image nginx:1.26 --image php:8.2-fpm --dry-run=client -o yaml > http-deploy.yml

# Phase d'adaptation du manifest (selon les besoins)

# Application du manifest
k apply -f http-deploy.yml

# Liste des déploiements
k get deployment

# Describe
k describe deployment hello

# Mise à l'échelle d'un déploiement
k scale deployment http --replicas 4
````

### Micro-TP n°2

Création d'un manifest pour un déploiement hello avec les caractéristiques suivantes :

- image: bob2606/hello-http:0.8.26
- réplicas: 3

Commande : 

```bash
kubectl create deployment hello-deployment --image=bob2606/hello-http:0.8.26 --replicas=3 --dry-run=client -o yaml > hello-deployment.yaml
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-deployment
  labels:
    app: hello
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello
  template:
    metadata:
      labels:
        app: hello
    spec:
      containers:
      - name: hello-container
        image: bob2606/hello-http:0.8.26
        ports:
        - containerPort: 8080
```

- **`apiVersion: apps/v1`** : Indique la version de l'API utilisée pour le Deployment.
- **`kind: Deployment`** : Définit qu'il s'agit d'une ressource de type Deployment.
- **`metadata`** : Fournit des informations sur le Deployment, comme son nom (`hello-deployment`) et ses labels.
- **`spec.replicas`** : Spécifie le nombre de réplicas (ici, 3).
- **`selector.matchLabels`** : Définit les labels que le Deployment utilisera pour associer les pods qu'il gère.
- **`template.metadata.labels`** : Les labels attribués aux pods créés par le Deployment.
- **`spec.template.spec.containers`** : Définit le conteneur, y compris son image et le port exposé (8080 dans ce cas).

Commande pour appliquer ce manifest :

````bash
kubectl apply -f hello-deployment.yaml
````

Depuis un pod busybox, comment se connecter à chacun des trois réplicas (port 8080) ?

Pour vous connecter à chacun des trois réplicas du déploiement depuis un pod **busybox**, vous devez :

1. **Créer un pod busybox en mode interactif** :
   Lancez un pod **busybox** avec la commande suivante :
   ```bash
   kubectl run busybox --image=busybox:1.28 --restart=Never --command -- sleep 3600
   ```
   Cela crée un pod qui reste actif pendant 3600 secondes (vous pouvez le supprimer après).

2. **Identifier les adresses IP des trois réplicas** :
   Utilisez cette commande pour lister les pods et leurs adresses IP :
   ```bash
   kubectl get pod -o wide
   
   # Cibler uniquement les pods hello
   k get pod -l app=hello
   ```
   Vous verrez une sortie similaire à :
   ```
   NAME                                 READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
   hello-deployment-xxxxx-yyyyy         1/1     Running   0          5m    10.244.0.1   worker-1   <none>           <none>
   hello-deployment-xxxxx-zzzzz         1/1     Running   0          5m    10.244.0.2   worker-2   <none>           <none>
   hello-deployment-xxxxx-aaaaa         1/1     Running   0          5m    10.244.0.3   worker-3   <none>           <none>
   ```

3. **Se connecter au pod busybox** :
   Ouvrez un terminal interactif sur le pod busybox :
   ```bash
   kubectl exec -it busybox -- sh
   ```

4. **Utiliser `wget` pour accéder aux réplicas** :
   Une fois dans le pod busybox, utilisez `wget` pour interroger chaque adresse IP et port 8080 :
   ```sh
   wget -O - -q http://10.244.0.1:8080
   wget -O - -q http://10.244.0.2:8080
   wget -O - -q http://10.244.0.3:8080
   ```

  - **`-O -`** : Affiche la réponse HTTP dans la console.
  - **`-q`** : Mode silencieux (supprime les logs inutiles).

5. **Résultat attendu** :
   Chaque commande `wget` devrait retourner le contenu servi par le pod `hello`, probablement un message ou une réponse HTTP.

6. **Nettoyage après utilisation** :
  - Quittez le terminal busybox :
    ```sh
    exit
    ```
  - Supprimez le pod busybox :
    ```bash
    kubectl delete pod busybox
    ```

### Alternative avec un Service :

Pour éviter de gérer manuellement les adresses IP, vous pouvez créer un **Service** qui expose les pods du Deployment. 
Ensuite, vous pouvez utiliser un DNS interne Kubernetes pour accéder aux réplicas.

## Les ressources dans Kubernetes

Dans Kubernetes, une **ressource** représente un objet que vous créez et gérez dans un cluster. Ces ressources sont définies dans des fichiers de configuration (en YAML ou JSON) ou via des commandes directes avec `kubectl`. Elles permettent de décrire l'état souhaité de votre cluster, comme les applications déployées, leur configuration ou la gestion des accès.

#### Types de ressources principales :

1. **Ressources de calcul :** Elles définissent les charges de travail et les unités d'exécution.
  - **Pods** : L’unité de base qui encapsule un ou plusieurs conteneurs.
  - **ReplicaSet** : Assure que le nombre souhaité de pods soit en cours d'exécution.
  - **Deployments** : Gère les mises à jour des applications et le nombre de réplicas.
  - **DaemonSets** : Déploie un pod sur chaque nœud du cluster.
  - **StatefulSets** : Gère des applications nécessitant un état stable (bases de données, par exemple).
  - **Jobs** et **CronJobs** : Exécutent des tâches ponctuelles ou planifiées.

2. **Ressources de réseau :** Elles permettent aux pods de communiquer entre eux et avec l'extérieur.
  - **Services** : Exposent une application ou un ensemble de pods à un réseau interne ou externe.
  - **Ingress** : Gère l’accès HTTP/HTTPS externe à des services au sein du cluster.
  - **Endpoints** : Lient les services aux adresses IP des pods.

3. **Ressources de configuration :** Elles permettent de définir et de stocker des paramètres.
  - **ConfigMaps** : Stockent des configurations non sensibles sous forme de paires clé-valeur.
  - **Secrets** : Stockent des données sensibles, comme des mots de passe, de manière sécurisée.

4. **Ressources de gestion du cluster :** Elles contrôlent l’infrastructure et les politiques du cluster.
  - **Nodes** : Machines physiques ou virtuelles participant au cluster.
  - **Namespaces** : Segmente les ressources pour les organiser et éviter les conflits.
  - **Roles** et **RoleBindings** (ou **ClusterRoles**/**ClusterRoleBindings**) : Contrôlent les autorisations d'accès aux ressources.
  - **ResourceQuotas** : Limite l'utilisation des ressources (CPU, mémoire) dans un namespace.

#### Exemple d’utilisation des ressources :

Pour déployer une application dans Kubernetes, vous pourriez créer :
- Un **Deployment** pour définir l’application.
- Un **Service** pour exposer les pods à d'autres applications ou à l'extérieur.
- Un **ConfigMap** pour stocker ses paramètres.
- Un **Ingress** pour gérer le trafic HTTP vers votre application.

Les ressources sont au cœur de Kubernetes, car elles permettent de déclarer l'état souhaité de votre système. 
Kubernetes travaille en permanence pour faire correspondre cet état désiré à l'état actuel du cluster. 
C'est ce qu'on appelle la **reconciliation loop**.

## Les ressources Services

Un Service est une ressource qui permet d'exposer une application (ou un ensemble de pods) à un réseau de manière stable, 
quel que soit le changement des pods sous-jacents. Il fournit une adresse IP stable et un nom DNS pour accéder aux pods, 
tout en répartissant le trafic entre eux (load balancing). 
Les services peuvent être configurés pour être accessibles uniquement à l'intérieur du cluster (ClusterIP), 
depuis l'extérieur via un port spécifique (NodePort), ou à l'aide d'un load balancer externe (LoadBalancer). 
Le Service utilise des selectors pour cibler les pods correspondants et distribuer le trafic de manière fiable.

Dans Kubernetes, un **Service** est une ressource qui permet d’exposer une application (ou un ensemble de pods) à un réseau, que ce soit à l'intérieur du cluster ou à l'extérieur. Il sert d'abstraction pour accéder à des pods de manière fiable, en cachant leur adresse IP changeante, et en fournissant un point d'accès stable.

#### 1. **Rôle principal d'un Service :**
- **Accès réseau stable :** Un service fournit une adresse IP stable et un nom DNS (Domain Name System) pour les pods qu'il expose, même si ces pods sont créés ou supprimés dynamiquement.
- **Load balancing (répartition de charge) :** Le service distribue le trafic entrant entre les pods qui le "backent" (les supportent) de manière équilibrée.

#### 2. **Types de Services :**
Kubernetes propose plusieurs types de services en fonction de la manière dont vous souhaitez exposer vos applications.

- **ClusterIP (par défaut) :** pour rester à l'intérieur du cluster
  - Il attribue une adresse IP virtuelle, **uniquement accessible à l'intérieur du cluster**.
  - Permet aux **pods de communiquer entre eux** via cette IP.
  - **Ne permet pas l'accès externe** au service.
  - Kubernetes utilise cette IP pour diriger le **trafic vers les pods cibles** via des **endpoints**.
  - Le **mécanisme de répartition de charge** (load balancing) est utilisé pour diriger le trafic entre les pods.
  - Le **ClusterIP** est idéal pour des **services internes**, tels que des bases de données ou des backends.
  - Offre une **communication sécurisée et isolée**, sans exposer les services au monde extérieur.

- **NodePort :** pour sortir
  - permet d'exposer une application à l'extérieur du cluster en attribuant un port spécifique sur chaque nœud du cluster
  - Permet d'ouvrir un port sur chaque nœud du cluster.
  - Vous pouvez accéder au service en utilisant l'adresse IP d'un nœud et le port assigné.
  - Utile pour exposer une application à l'extérieur du cluster sans utiliser un Ingress.

  Problématiques :
  - Choix dynamique et aléatoire du port -> possibilité de fixer les ports -> Organisation nécessaire
  - Perte d'un node
  - Utilisation de ports non standard
  - Plage limitée de 2769 ports -> 2769 services possibles

  Pour ces raisons, on va préférer l'utilisation d'un LoadBalancer.

- **LoadBalancer :**
  - Expose un service à l'extérieur du cluster avec une adresse IP publique ou un DNS.
  - Il répartit automatiquement le trafic entrant entre plusieurs pods à l'aide d'un **équilibreur de charge**, 
  garantissant une meilleure **disponibilité** et **performance**.
  - Ce service est particulièrement utile pour des applications en **production**, comme des sites web ou des API, 
  accessibles depuis l'extérieur.
  - Il dépend souvent des **fournisseurs de cloud** (comme AWS, GCP, Azure) pour gérer l'équilibreur de charge,
    soit un plugin tel Metallb ou bien celle intégrée au CNI tel Cilium

  Avantages/inconvénients :
  - A: On n'utilise plus qu'une IP, sans port non standard
  - I: Nécessite un mécanisme d'attribut des IP -> externe/plugin
  - I: 1 IP/Service car repose sur un NodePort -> 2769 services possibles

  Solution : Utilisation d'une ressource de type Ingress ou GatewayAPI

#### 3. **Comment un Service fonctionne-t-il ?**
// A RELIRE
Un service fonctionne en associant un ou plusieurs **Pods** via des **labels**. Il crée un point d'accès stable et peut diriger le trafic vers les pods correspondants en fonction des critères définis par un **selector**.

**Exemple** :
- Vous avez un **Deployment** qui crée trois réplicas de votre application. Ces réplicas ont un label `app=hello`.
- Vous créez un **Service** avec un selector qui correspond à ce label (`app=hello`).
- Le service dirigera le trafic vers ces trois réplicas, même si les adresses IP des pods changent au fil du temps.

#### 4. **Mécanisme de répartition de charge :**
Les services utilisent un mécanisme de répartition de charge pour distribuer le trafic réseau. 
Cela fonctionne en suivant une approche **round-robin** ou en fonction de la santé des pods. Kubernetes utilise une 
table d'ip et une liste de endpoints pour savoir à quels pods diriger le trafic. 
Chaque service a un **endpoint** qui représente l'adresse IP de chaque pod associé.

#### Exemple d’un manifeste YAML pour un Service **ClusterIP** :

```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-service
spec:
  selector:
    app: hello
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
  type: ClusterIP
```

- **selector** : Sélectionne les pods correspondant aux labels spécifiés. Ici, il sélectionne les pods avec `app=hello`.
- **port** : Le port sur lequel le service sera accessible.
- **targetPort** : Le port auquel le service doit acheminer le trafic, généralement celui des pods.
- **type** : Définit le type du service (ici, `ClusterIP`, donc accessible uniquement à l'intérieur du cluster).

### Conclusion :

Les **Services** dans Kubernetes offrent une abstraction puissante et flexible pour gérer la communication entre les pods, 
à la fois à l'intérieur et à l'extérieur du cluster. Ils assurent un accès fiable, même en cas de changement des pods sous-jacents, 
et peuvent être configurés pour offrir différents types d'accès réseau, selon les besoins de votre application.

### Micro TP n°3

Exposer le déploiement hello à l'aide d'un service de type ClusterIP et vérifier :

```bash
# Commandes d'exposition
kubectl expose deployment hello --port=8080 --target-port=8080 --type=ClusterIP
# Commande de vérification
kubectl describe svc hello
```

Compléter le service ClusterIP par un NodePort et vérifier :

Pour compléter un service **ClusterIP** avec un service de type **NodePort**, vous devez créer un deuxième service qui exposera le même déploiement à l'extérieur du cluster via un port spécifique sur chaque nœud du cluster. Voici les étapes à suivre :

### 1. Exposer le déploiement avec un service **ClusterIP** (si ce n'est pas déjà fait) :
Si le service **ClusterIP** n'est pas encore créé, vous pouvez le faire en utilisant la commande suivante :

```bash
kubectl expose deployment hello --port=8080 --target-port=8080 --type=ClusterIP
```

### 2. Créer un service **NodePort** pour exposer le même déploiement à l'extérieur :
Ensuite, vous pouvez créer un service de type **NodePort** pour exposer le même déploiement à l'extérieur du cluster. Voici la commande pour créer un service **NodePort** :

```bash
kubectl expose deployment hello --port=8080 --target-port=8080 --type=NodePort
```

Cette commande expose le service `hello` sur le port `8080` et le redirige également vers le même port sur les pods. Kubernetes attribuera automatiquement un port externe (NodePort) dans une plage de ports (généralement entre 30000 et 32767).

### 3. Vérifier la création des services et obtenir les informations nécessaires :

- Vérifiez que les deux services (ClusterIP et NodePort) ont bien été créés :

```bash
kubectl get svc
```

Cela devrait afficher quelque chose comme ceci :

```
NAME     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
hello    ClusterIP   10.96.168.1     <none>        8080/TCP       10m
hello    NodePort    10.96.168.2     <none>        8080:30500/TCP 10m
```

Dans cet exemple :

- Le service `hello` de type **ClusterIP** utilise l'IP interne `10.96.168.1`.
- Le service `hello` de type **NodePort** expose le port `8080` sur un port externe (`30500` dans cet exemple).

- Pour vérifier les détails d'un service spécifique, vous pouvez utiliser :

```bash
kubectl describe svc hello
```

Cela vous donnera des informations détaillées sur les ports exposés et les adresses IP.

### 4. Tester l'accès externe via le NodePort :
Une fois le service **NodePort** créé, vous pouvez accéder à votre application depuis l'extérieur du cluster en utilisant l'IP de l'un des nœuds du cluster et le port attribué par **NodePort** (par exemple, `30500` dans l'exemple ci-dessus).

Accédez à l'application en utilisant `wget` ou `curl` avec l'IP d'un nœud et le port `NodePort` :

```bash
wget -O - http://<Node_IP>:30500
```

ou avec `curl` :

```bash
curl http://<Node_IP>:30500
```

Cela devrait vous renvoyer la réponse du service **hello** exposé via **NodePort**.

Ajouter le niveau LoadBalancer :

Pour ajouter un service de type **LoadBalancer** à votre déploiement **hello**, vous devrez créer un troisième service qui exposera votre application à l'extérieur du cluster via un équilibreur de charge (LoadBalancer). Ce type de service est généralement utilisé dans des environnements cloud (comme AWS, GCP, ou Azure) où Kubernetes peut provisionner un équilibreur de charge pour gérer le trafic entrant.

Voici les étapes pour ajouter un service de type **LoadBalancer** à votre déploiement **hello** :

### 1. Créer un service **LoadBalancer** :
Utilisez la commande suivante pour créer un service **LoadBalancer** qui expose le même port (8080) et redirige le trafic entrant vers les pods :

```bash
kubectl expose deployment hello --port=8080 --target-port=8080 --type=LoadBalancer
```

- **`--port=8080`** : définit le port sur lequel le service est exposé.
- **`--target-port=8080`** : spécifie le port interne des pods.
- **`--type=LoadBalancer`** : expose le service via un équilibreur de charge externe (en fonction de votre fournisseur de cloud).

### 2. Vérifier la création des services :
Vérifiez que les services **ClusterIP**, **NodePort**, et **LoadBalancer** ont bien été créés en utilisant la commande suivante :

```bash
kubectl get svc
```

La sortie pourrait ressembler à ceci :

```
NAME     TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
hello    ClusterIP      10.96.168.1    <none>           8080/TCP       15m
hello    NodePort       10.96.168.2    <none>           8080:30500/TCP 15m
hello    LoadBalancer   10.96.168.3    <pending>         8080:30080/TCP 15m
```

- Le service **ClusterIP** reste uniquement accessible à l'intérieur du cluster.
- Le service **NodePort** expose l'application sur le port externe `30500`.
- Le service **LoadBalancer** expose l'application à l'extérieur du cluster via une adresse IP externe. L'EXTERNAL-IP peut prendre un certain temps avant d'être attribuée (en fonction du fournisseur de cloud).

### 3. Vérifier le statut du service **LoadBalancer** :
Le champ **EXTERNAL-IP** pour le service **LoadBalancer** peut mettre un certain temps à se remplir, en particulier si vous êtes sur un fournisseur de cloud (AWS, GCP, Azure). Vous pouvez vérifier son statut avec :

```bash
kubectl describe svc hello
```

Cela vous montrera si un équilibreur de charge a été provisionné et l'adresse IP ou le DNS public qui a été attribué au service.

### 4. Tester l'accès via le LoadBalancer :
Une fois que l'adresse IP externe (ou DNS) du service **LoadBalancer** est attribuée, vous pouvez tester l'accès à votre application depuis l'extérieur du cluster en utilisant l'adresse IP ou le nom de domaine de l'équilibreur de charge et le port exposé (`8080` dans cet exemple) :

```bash
wget -O - http://<LoadBalancer_IP>:8080
```

ou avec `curl` :

```bash
curl http://<LoadBalancer_IP>:8080
```

Cela vous permettra de tester l'accès direct à l'application depuis l'extérieur du cluster.

### 3 services les uns sur les autres

Dans Kubernetes, chaque type de service **(ClusterIP, NodePort, LoadBalancer)** offre une manière différente d'exposer et de gérer l'accès réseau à vos pods.

Si vous souhaitez exposer votre application à différents niveaux, vous devrez effectivement créer plusieurs services en fonction de vos besoins. Voici un résumé :

1. **ClusterIP** (service par défaut) :
    - Expose le service uniquement à l'intérieur du cluster.
    - Il est idéal pour des services qui doivent être accessibles par d'autres pods dans le même cluster, mais pas à l'extérieur (comme les bases de données ou les services backend).

2. **NodePort** :
    - Expose le service à l'extérieur du cluster via un port statique sur chaque nœud (machine) du cluster.
    - Vous pouvez accéder à votre service à partir de l'extérieur du cluster en utilisant l'adresse IP de n'importe quel nœud et le port que Kubernetes attribue au service (par exemple, 30000-32767).

3. **LoadBalancer** :
    - Expose le service à l'extérieur du cluster en utilisant un équilibreur de charge.
    - Il crée une adresse IP publique ou un DNS, souvent fourni par le cloud, pour diriger le trafic entrant vers le service.
    - Ce type de service est utile dans un environnement cloud où Kubernetes peut provisionner un équilibreur de charge externe automatiquement.

### Exemple de cas d'usage pour chaque service :
- **ClusterIP** : Utilisé pour exposer des services internes uniquement, tels que des bases de données ou des API qui ne doivent pas être accessibles publiquement.
- **NodePort** : Expose une application de test ou un service de développement à l'extérieur sans dépendre d'un fournisseur de cloud. Cela permet d'accéder à l'application via un port spécifique sur un nœud.
- **LoadBalancer** : Expose des applications de production (par exemple, des sites web ou des API) à l'extérieur du cluster avec un équilibrage de charge automatique, souvent avec une IP ou un DNS public.

### Trois services ensemble :
Si vous souhaitez avoir ces trois niveaux d'accès simultanément, vous pouvez effectivement créer trois services qui se superposent, chacun offrant une méthode différente d'accès au même ensemble de pods :

1. **ClusterIP** : pour l'accès interne aux pods.
2. **NodePort** : pour un accès direct via l'IP d'un nœud.
3. **LoadBalancer** : pour un accès externe avec un DNS ou une IP publique.

Cependant, il n'est pas nécessaire d'avoir ces trois services dans tous les cas. Cela dépend de votre cas d'usage et de la manière dont vous souhaitez exposer vos applications. Vous pouvez en créer un ou deux, en fonction de vos besoins de réseau et de sécurité.

## Gestion de l'environnement des conteneurs de pods

À l'instar de Docker, il est possible d'enrichir l'environnement des conteneurs de chaque pod au moment de leur création.
Cela se fait à l'aide de l'une ou l'autre ou les deux clés suivantes :

```yaml
env:
envFrom:
```

### ConfigMaps

Une **ConfigMap** dans Kubernetes est une ressource utilisée pour **stocker des données de configuration sous forme de paires clé-valeur**, séparées du code applicatif. Cela permet de rendre vos applications **plus flexibles, modulaires et faciles à gérer**, en externalisant les configurations du conteneur.

---

### **Caractéristiques principales :**
- **Flexibilité :** Les données de configuration sont séparées du conteneur, ce qui permet de modifier les configurations sans recréer les images ou redéployer les pods.
- **Stockage de données simples :** Les ConfigMaps peuvent contenir des chaînes de texte, des variables d'environnement, des fichiers de configuration, ou des informations en format JSON/YAML.
- **Portabilité :** Elles permettent de réutiliser la même image dans différents environnements (développement, staging, production) avec des configurations spécifiques.

---

### **Exemples d'usage :**
1. **Variables d’environnement :** Ajouter des configurations comme des URL, des chemins ou des identifiants dans les pods via des variables.
2. **Fichiers de configuration :** Monter un fichier de configuration externe dans le conteneur (ex. fichier `.properties` ou `.yaml`).
3. **Personnalisation des applications :** Injecter des paramètres spécifiques à l'environnement (par exemple, `DEBUG=true` en développement et `DEBUG=false` en production).

---

### **Création d'une ConfigMap**

#### Via un fichier YAML :
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-configmap
data:
  APP_ENV: production
  APP_PORT: "8080"
```

**Commande pour créer la ConfigMap :**
```bash
kubectl apply -f my-configmap.yaml
```

#### Directement en ligne de commande :
```bash
kubectl create configmap my-configmap \
  --from-literal=APP_ENV=production \
  --from-literal=APP_PORT=8080
```

---

### **Utilisation d'une ConfigMap**

#### Injection comme variable d’environnement :
Dans un Pod ou Deployment, vous pouvez utiliser une ConfigMap pour définir des variables d'environnement :

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: nginx
    env:
    - name: APP_ENV
      valueFrom:
        configMapKeyRef:
          name: my-configmap
          key: APP_ENV
```

#### Montage en volume :
Pour injecter des fichiers ou des configurations directement dans un conteneur :
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: nginx
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: my-configmap
```

---

### **Limitations des ConfigMaps :**
1. **Taille limitée :** Chaque ConfigMap est limitée à 1 Mo de données.
2. **Pas conçues pour les données sensibles :** Les ConfigMaps ne sont pas chiffrées et ne doivent pas contenir de mots de passe ou de secrets (utilisez des Secrets pour cela).
3. **Dépendance aux Pods :** Si la ConfigMap est supprimée ou modifiée, les pods qui en dépendent peuvent rencontrer des problèmes s'ils ne sont pas redémarrés correctement.

---

### **Conclusion**
Les ConfigMaps sont un outil essentiel pour gérer la configuration des applications Kubernetes. 
En dissociant les configurations du code, elles permettent une meilleure modularité, maintenabilité et portabilité des applications dans des environnements différents.

### Micro-TP n°4

Voici les étapes pour ajouter ces variables d'environnement à l'aide d'une **ConfigMap** et les injecter dans le déploiement `hello`.

---

### **1. Création de la ConfigMap**

Créez un fichier YAML nommé `hello-configmap.yaml` :

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: hello-configmap
data:
  PORT: "80"
  MSG: "Dev"
  VERSION: "0.1"
```

Appliquez ce fichier pour créer la ConfigMap :

```bash
kubectl apply -f hello-configmap.yaml
```

---

### **2. Modification du Déploiement**

Ajoutez les variables d'environnement dans le déploiement `hello` en utilisant la ConfigMap. Voici le manifest complet mis à jour :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello
  template:
    metadata:
      labels:
        app: hello
    spec:
      containers:
      - name: hello-container
        image: bob2606/hello-http:0.8.26
        ports:
        - containerPort: 8080
        env:
        - name: PORT
          valueFrom:
            configMapKeyRef:
              name: hello-configmap
              key: PORT
        - name: MSG
          valueFrom:
            configMapKeyRef:
              name: hello-configmap
              key: MSG
        - name: VERSION
          valueFrom:
            configMapKeyRef:
              name: hello-configmap
              key: VERSION
```

Appliquez ce fichier mis à jour :

```bash
kubectl apply -f hello-deployment.yaml
```

---

### **3. Vérification**

1. **Vérifiez que la ConfigMap est correctement créée :**

   ```bash
   kubectl get configmap hello-configmap -o yaml
   ```

2. **Vérifiez que les pods sont recréés avec les bonnes variables :**

   ```bash
   kubectl describe pod <pod-name>
   ```

   Cherchez dans la section `Environment Variables` pour vous assurer que les variables `PORT`, `MSG`, et `VERSION` sont bien définies.

3. **Tester depuis un Pod BusyBox (ou autre outil) :**

   ```bash
   kubectl exec -it <pod-name> -- env | grep -E "PORT|MSG|VERSION"
   ```

---

### **Explication**

- Les variables `PORT`, `MSG`, et `VERSION` sont injectées directement depuis la ConfigMap.
- En cas de modification de la ConfigMap, les pods devront être redémarrés pour prendre en compte les nouvelles valeurs, sauf si le déploiement utilise un mécanisme de rechargement dynamique.

## Les sondes d'état dans Kubernetes

Les sondes (**Probes**) permettent à Kubernetes de surveiller et de gérer la santé des conteneurs. Elles vérifient si un conteneur est prêt à recevoir du trafic, en vie ou correctement initialisé. Kubernetes utilise ces sondes pour prendre des décisions comme redémarrer un conteneur ou le retirer du service.

---

### 1. **StartupProbe**
- **Objectif** : Vérifier si le conteneur a fini de démarrer. Elle est utile pour les applications avec des phases d'initialisation longues.
- **Comportement** :
    - Pendant que la **StartupProbe** est en cours, les sondes **LivenessProbe** et **ReadinessProbe** sont désactivées.
    - Si la **StartupProbe** échoue, Kubernetes redémarre le conteneur.
- **Quand l'utiliser ?**
    - Pour des applications lentes à démarrer (bases de données volumineuses, serveurs web complexes).

---

### 2. **ReadinessProbe**
- **Objectif** : Vérifier si le conteneur est prêt à recevoir du trafic.
- **Comportement** :
    - Si elle échoue, Kubernetes exclut le pod du service (il ne reçoit plus de requêtes via les services comme ClusterIP ou NodePort).
    - Elle n'entraîne pas de redémarrage.
- **Quand l'utiliser ?**
    - Lorsque l'application nécessite une configuration interne ou des dépendances externes avant d'accepter les requêtes (exemple : connexion à une base de données).

---

### 3. **LivenessProbe**
- **Objectif** : Vérifier si le conteneur est en vie.
- **Comportement** :
    - Si elle échoue, Kubernetes redémarre le conteneur.
- **Quand l'utiliser ?**
    - Pour détecter des blocages ou des défaillances logicielles (deadlocks, erreurs critiques).

---

### Types de sondes
Les trois sondes peuvent être configurées avec les mêmes types d'actions :
1. **httpGet** : Envoie une requête HTTP à une URL spécifique (exemple : `/healthz`).
2. **tcpSocket** : Vérifie si un port TCP est ouvert.
3. **exec** : Exécute une commande dans le conteneur, et vérifie son code de retour.

---

### Exemple combiné : YAML

Voici comment configurer les trois sondes dans un conteneur Kubernetes :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: example
  template:
    metadata:
      labels:
        app: example
    spec:
      containers:
      - name: app-container
        image: example-image:latest
        ports:
        - containerPort: 8080
        startupProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
          failureThreshold: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 2
          failureThreshold: 3
        livenessProbe:
          httpGet:
            path: /alive
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10
          failureThreshold: 3
```

---

### Résumé rapide
| **Sonde**         | **Objectif**                           | **Action en cas d'échec**     | **Utilisation typique**                      |
|--------------------|----------------------------------------|--------------------------------|----------------------------------------------|
| **StartupProbe**   | Vérifier si le conteneur est démarré.  | Redémarrer le conteneur.      | Applications lentes à démarrer.             |
| **ReadinessProbe** | Vérifier si le conteneur est prêt.     | Retirer le pod du service.    | Vérification de la préparation au trafic.   |
| **LivenessProbe**  | Vérifier si le conteneur est en vie.   | Redémarrer le conteneur.      | Détecter des blocages ou erreurs critiques. |

Ces sondes assurent la robustesse et la résilience des applications dans Kubernetes.

### **K9s : Un outil CLI pour gérer vos clusters Kubernetes**

K9s est un outil **open-source** basé sur une interface en ligne de commande (CLI) qui permet d'interagir efficacement avec les clusters Kubernetes. Conçu pour être rapide et intuitif, il offre une vue en temps réel des ressources Kubernetes et simplifie la gestion des pods, services, déploiements, etc.

---

### **Pourquoi utiliser K9s ?**
1. **Vue temps réel** : Vous pouvez voir l'état de vos ressources Kubernetes en direct.
2. **Navigation simplifiée** : Une interface basée sur des menus permet de parcourir les ressources sans taper de longues commandes.
3. **Actions rapides** : Redémarrer des pods, supprimer des ressources, ou inspecter les logs est plus rapide et ergonomique.
4. **Gain de temps** : Moins de commandes à taper, avec un accès direct aux informations critiques.
5. **Compatible avec tous les clusters** : Fonctionne avec n'importe quelle configuration Kubernetes (cloud ou on-premises).

---

### **Installation de K9s**

#### Pré-requis
- **kubectl** installé et configuré pour votre cluster.
- Kubernetes v1.16 ou supérieur.

#### Étapes d'installation

##### Sur Linux/macOS (via Homebrew)
1. Installer avec Homebrew :
   ```bash
   brew install k9s
   ```
2. Vérifier l'installation :
   ```bash
   k9s version
   ```

##### Sur Linux (manuellement)
1. Télécharger le binaire depuis la page des [releases GitHub de K9s](https://github.com/derailed/k9s/releases).
   ```bash
   curl -L -o k9s.tar.gz https://github.com/derailed/k9s/releases/download/v<version>/k9s_Linux_amd64.tar.gz
   ```
2. Extraire le fichier :
   ```bash
   tar -xvf k9s.tar.gz
   ```
3. Déplacer le binaire dans `/usr/local/bin` :
   ```bash
   sudo mv k9s /usr/local/bin
   ```
4. Vérifier l'installation :
   ```bash
   k9s version
   ```

##### Sur Windows
1. Télécharger l'exécutable depuis la [page des releases GitHub](https://github.com/derailed/k9s/releases).
2. Ajouter l'exécutable à votre PATH pour un accès depuis le terminal.

---

### **Utilisation de base**

#### Lancer K9s
Pour démarrer K9s, utilisez simplement :
```bash
k9s
```
Cela ouvre une interface interactive.

#### Navigation
- **Ressources principales** :
    - `:pods` → Voir les pods.
    - `:svc` → Voir les services.
    - `:deploy` → Voir les déploiements.
    - `:cm` → Voir les ConfigMaps.
- **Changer de namespace** : Appuyez sur `:`, puis tapez `ns <nom_du_namespace>`.

#### Commandes interactives
- **Inspecter les logs** : Sélectionnez un pod, puis appuyez sur `l`.
- **Supprimer une ressource** : Sélectionnez une ressource, puis appuyez sur `d`.
- **Exécuter un shell dans un pod** : Sélectionnez un pod, puis appuyez sur `s`.
- **Recharger la configuration** : Appuyez sur `Ctrl+r`.

#### Quitter K9s
Pour quitter, appuyez sur `Ctrl+c`.

---

### **Personnalisation**
- Fichier de configuration : `~/.k9s/config.yml`.
- Vous pouvez personnaliser les raccourcis clavier, la disposition de l'écran et les filtres.

---

### **Avantages par rapport à kubectl**
| **Caractéristique**       | **kubectl**                    | **K9s**                        |
|---------------------------|--------------------------------|---------------------------------|
| Interface utilisateur     | Basé sur des commandes         | CLI interactive                |
| Temps réel                | Non                            | Oui                            |
| Facilité de navigation    | Moins intuitive                | Très intuitive                 |
| Gestion des logs          | Commande manuelle nécessaire   | Directement accessible         |
| Gain de productivité      | Moyen                          | Élevé                          |

---

### **Quand utiliser K9s ?**
- **Monitoring quotidien** : Surveiller vos pods et services en direct.
- **Développement local** : Tester et déboguer rapidement vos ressources.
- **Simplification des tâches** : Pour éviter de mémoriser et taper des commandes `kubectl` complexes.

K9s est un outil précieux pour tout administrateur ou développeur Kubernetes cherchant à gagner en efficacité !

## Persistance des données - Les volumes dans Kubernetes

Les volumes dans Kubernetes permettent d'externaliser et de persister les données générées ou utilisées par les applications, même au-delà de la durée de vie d’un pod. Cela est essentiel car les conteneurs eux-mêmes sont éphémères, et leurs données sont perdues une fois qu'ils sont arrêtés ou redéployés.

Kubernetes offre différents **types de volumes**, adaptés à divers besoins, grâce à un mécanisme appelé **pilotes de volumes**. Voici un aperçu des plus courants :

---

### **Principaux types de volumes :**

#### **`emptyDir`**
- **Description :** Un répertoire temporaire vide créé à chaque démarrage d’un pod.
- **Caractéristiques :**
    - Utilisé pour partager des données entre les conteneurs d’un même pod.
    - Disparaît lorsque le pod est supprimé.
- **Cas d’utilisation :** Stockage temporaire ou données intermédiaires, comme des caches ou des fichiers temporaires.

---

#### **`hostPath`**
- **Description :** Monte un répertoire du système de fichiers local d'un nœud dans un pod.
- **Caractéristiques :**
    - Le répertoire est associé au nœud spécifique sur lequel le pod est programmé.
    - Non recommandé pour les environnements multi-nœuds, car il dépend de l'emplacement physique.
- **Cas d’utilisation :** Accès à des fichiers système spécifiques du nœud ou journaux.

---

#### **`nfs` (Network File System)**
- **Description :** Monte un système de fichiers distant via un serveur NFS.
- **Caractéristiques :**
    - Les données sont accessibles depuis plusieurs pods et nœuds.
    - Permet un partage de fichiers à travers le cluster.
- **Cas d’utilisation :** Stockage partagé pour des applications distribuées.

---

#### **`fc` (Fibre Channel)**
- **Description :** Connecte un volume basé sur Fibre Channel à un pod.
- **Caractéristiques :**
    - Utilisé dans des environnements de stockage haute performance.
    - Nécessite un réseau de stockage SAN configuré.
- **Cas d’utilisation :** Stockage haute performance pour des bases de données ou applications exigeantes.

---

#### **`iscsi` (Internet Small Computer Systems Interface)**
- **Description :** Permet de connecter un pod à un volume iSCSI distant.
- **Caractéristiques :**
    - Nécessite une configuration préalable des cibles iSCSI.
    - Assure des performances élevées pour les systèmes critiques.
- **Cas d’utilisation :** Applications nécessitant un stockage rapide et fiable.

---

#### **`configMap`**
- **Description :** Fournit un moyen d'injecter des données de configuration non sensibles dans des pods.
- **Caractéristiques :**
    - Contient des données sous forme de paires clé-valeur.
    - Les données peuvent être montées sous forme de fichiers ou injectées comme variables d’environnement.
- **Cas d’utilisation :** Fichiers de configuration ou scripts non sensibles.

---

#### **`secret`**
- **Description :** Permet de gérer des données sensibles, comme des mots de passe, des clés SSH ou des certificats.
- **Caractéristiques :**
    - Les secrets sont encodés en Base64 (mais pas chiffrés par défaut).
    - Peuvent être montés comme fichiers ou injectés comme variables d’environnement.
- **Cas d’utilisation :** Stockage sécurisé pour des informations sensibles.

---

#### **Autres types courants :**
- **`persistentVolumeClaim` (PVC):** Requête d’un volume persistant géré par un administrateur (lié à un PersistentVolume).
- **`csi` (Container Storage Interface):** Permet d'utiliser des pilotes de stockage standard pour divers systèmes.
- **`azureDisk`, `awsElasticBlockStore`, `gcePersistentDisk`:** Pilotes spécifiques pour les volumes persistants dans les environnements cloud.

---

### **Avantages des volumes Kubernetes :**
1. **Isolation des données :** Les volumes permettent de séparer le cycle de vie des données de celui des conteneurs.
2. **Flexibilité :** Large choix de pilotes pour répondre à des besoins variés (temporaire, partagé, persistant, haute performance).
3. **Facilité d'intégration :** Intégration native avec les principaux systèmes de stockage cloud et on-premise.

---

### Exemple d’un volume dans un manifeste de pod :
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: my-container
    image: nginx
    volumeMounts:
    - mountPath: /usr/share/nginx/html
      name: html-volume
  volumes:
  - name: html-volume
    nfs:
      server: <NFS_SERVER_IP>
      path: /data
```

Ce manifeste monte un volume **NFS** sur le répertoire `/usr/share/nginx/html` du conteneur.

---

## Gestion des labels

### **Qu'est-ce qu'un label ?**
Un **label** est une étiquette sous forme de clé/valeur qui peut être associée à différentes ressources Kubernetes, comme les pods, les services, les déploiements, etc. Les labels sont utilisés pour organiser, sélectionner ou regrouper des ressources. Par exemple :
```yaml
labels:
  app: hello
  env: production
```

Ils permettent notamment :
- De lier des **pods** à des **services** ou à des **déploiements**.
- De sélectionner ou filtrer des ressources pour les gérer plus facilement.

---

### **Affichage des labels d'une ressource**
Pour visualiser les labels associés à une ressource spécifique, vous pouvez utiliser plusieurs commandes :

1. **Afficher en YAML** :
   ```bash
   k get ressource nom -o yaml
   ```
   Exemple :
   ```bash
   kubectl get pod my-pod -o yaml
   ```

2. **Afficher les détails** :
   ```bash
   k describe ressource nom
   ```
   Exemple :
   ```bash
   kubectl describe pod my-pod
   ```

3. **Afficher directement les labels** :
   ```bash
   k get ressource --show-labels
   ```
   Exemple :
   ```bash
   kubectl get pod --show-labels
   ```

---

### **Création d'une colonne pour afficher un label**
Vous pouvez ajouter une colonne personnalisée pour afficher certains labels :
```bash
k get pod -L app -L env
```
Cette commande affichera les pods avec deux colonnes supplémentaires : `app` et `env`.

---

### **Filtrage selon un label**

1. **Basé sur la présence d'un label (indépendamment de sa valeur)** :
   ```bash
   k get pod -l app
   ```

2. **Basé sur la valeur d'un label** :
   ```bash
   k get pod -l app=hello
   ```

3. **Suppression de pods selon leur label** :
   ```bash
   k delete pod -l app=hello
   ```

---

### **Affectation de labels à une ressource**

1. **Au moment de la création (dans le manifest)** :
   Ajoutez des labels dans la section `metadata` de votre manifest :
   ```yaml
   metadata:
     labels:
       app: hello
       env: dev
   ```

2. **Dynamique avec kubectl** :
    - **Ajout d'un label** :
      ```bash
      k label pod busy level=dev
      ```
    - **Modification d'un label existant** (en écrasant la valeur précédente) :
      ```bash
      k label pod busy level=preprod --overwrite
      ```
    - **Suppression d'un label** :
      ```bash
      k label pod busy level-
      ```

---

### **Sélecteurs de labels**

Les sélecteurs sont utilisés pour cibler des ressources spécifiques en fonction de leurs labels. Les principaux mécanismes de sélection incluent :

1. **`selector` (utilisé par les Services)** :
   Définit un dictionnaire de labels pour sélectionner les pods. Exemple :
   ```yaml
   selector:
     app: hello
   ```

2. **`matchLabels` (utilisé par les Deployments)** :
   Similaire à `selector`, mais permet de définir un dictionnaire dans un Deployment ou ReplicaSet :
   ```yaml
   matchLabels:
     app: hello
   ```

3. **`matchExpressions`** :
   Permet d'utiliser des expressions plus complexes. Exemple :
   ```yaml
   matchExpressions:
     - key: app
       operator: In
       values:
         - hello
         - http
   ```
   Les opérateurs disponibles :
    - `In` : la clé doit correspondre à l'une des valeurs spécifiées.
    - `NotIn` : la clé ne doit correspondre à aucune des valeurs spécifiées.
    - `Exists` : la clé doit exister.
    - `DoesNotExist` : la clé ne doit pas exister.

---

### **En résumé :**
Les labels sont une manière flexible et puissante d'organiser et de gérer vos ressources Kubernetes. Avec les sélecteurs de labels, vous pouvez cibler précisément les ressources nécessaires pour les Services, les Deployments, ou tout autre composant du cluster. Ces outils sont essentiels pour gérer des applications complexes dans Kubernetes.

---

## **Les mises à jour dans Kubernetes**

---

#### **Qu'est-ce qu'une mise à jour ?**
Une mise à jour dans Kubernetes correspond à une **modification de la configuration d'une ressource**, comme un Deployment, avec la possibilité de conserver l’historique des changements pour un **retour arrière (rollback)** si nécessaire.

- **Mise à jour versionnée** : Toute modification de la section `template` (conteneurs, labels des pods, variables d’environnement, etc.) déclenche une nouvelle version.
- **Mise à jour non versionnée** : Les changements en dehors de la section `template` (comme des labels ou annotations au niveau du Deployment lui-même) ne créent pas de nouvelle version.

Chaque version est représentée par un **ReplicaSet**. L’ensemble des ReplicaSets d’un Deployment correspond à son historique des versions.

---

#### **Gestion des révisions**
1. **Nombre de versions conservées** :  
   Kubernetes conserve par défaut les **10 dernières versions** d’un Deployment. Vous pouvez modifier ce comportement avec le paramètre `revisionHistoryLimit` dans le manifeste :
   ```yaml
   spec:
     revisionHistoryLimit: 5
   ```

2. **Liste des versions** :  
   Vous pouvez afficher toutes les versions enregistrées via la commande suivante :
   ```bash
   k rollout history deployment http
   ```

3. **Rollbacks (retours en arrière)** :  
   Kubernetes permet de revenir à une version précédente :
    - Revenir à la version précédente :
      ```bash
      k rollout undo deployment http
      ```
    - Revenir à une version spécifique :
      ```bash
      k rollout undo deployment http --to-revision=3
      ```

---

#### **Annotation `change-cause`**
L’annotation **`kubernetes.io/change-cause`** est un outil essentiel pour **documenter la raison des modifications** apportées à un Deployment. Cette annotation apparaît dans la commande `k rollout history` et facilite le suivi des changements, particulièrement en environnement collaboratif.

- **Sans annotation** : Par défaut, la colonne `Change-Cause` dans l’historique des versions reste vide.
- **Avec annotation** : Elle contient une description claire de la raison du changement, comme une mise à jour d’image ou une reconfiguration.

##### **Ajout de l’annotation après une mise à jour**
Vous pouvez ajouter manuellement une annotation pour expliquer un changement a posteriori :
```bash
k annotate deployment http kubernetes.io/change-cause="Mise à jour image nginx:1.27"
```

##### **Ajout de l’annotation dans le manifeste**
Pour inclure automatiquement une raison à chaque mise à jour, ajoutez l’annotation dans la section `metadata` de votre Deployment :
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: http
  annotations:
    kubernetes.io/change-cause: "Mise à jour image nginx:1.27"
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: http
    spec:
      containers:
      - name: nginx
        image: nginx:1.27
```

---

#### **Étapes d'une mise à jour**
1. **Modifier le Deployment** :  
   Par exemple, changer l’image utilisée dans le conteneur :
   ```bash
   k set image deployment http nginx=nginx:1.27
   ```

2. **Déploiement progressif** :  
   Kubernetes remplace les anciens pods par les nouveaux de manière incrémentale tout en maintenant la disponibilité.

3. **Suivre le statut de la mise à jour** :
   ```bash
   k rollout status deployment http
   ```

4. **Documenter la mise à jour** :  
   Si l'annotation `change-cause` n'a pas été configurée dans le manifeste, vous pouvez l’ajouter manuellement après la mise à jour.

---

#### **Bonnes pratiques avec `change-cause`**
- **Toujours documenter les changements** : Cela permet de comprendre rapidement les modifications apportées en cas de problème.
- **Utiliser `change-cause` systématiquement dans les manifestes** pour automatiser la documentation des mises à jour.

---
// ATTENTION : vérifier les commandes
### **Résumé des commandes principales**
| **Action**                      | **Commande**                                           |
|----------------------------------|-------------------------------------------------------|
| Lister les versions d'un déploiement | `k rollout history deployment http`                  |
| Annoter une raison de changement | `k annotate deployment http kubernetes.io/change-cause="description"` |
| Modifier l’image d’un conteneur  | `k set image deployment http nginx=nginx:1.27`        |
| Suivre l’état d’une mise à jour  | `k rollout status deployment http`                    |
| Revenir à la version précédente  | `k rollout undo deployment http`                      |
| Revenir à une version spécifique | `k rollout undo deployment http --to-revision=3`      |

---

L’annotation `change-cause` est particulièrement utile pour tracer l’historique des modifications. En combinant ce mécanisme avec l’historique des versions et les commandes de rollback, Kubernetes fournit une gestion puissante et flexible des mises à jour.

### Stratégies de mise à jour dans Kubernetes

Kubernetes propose deux principales stratégies de mise à jour des Pods associés à des Deployments : **Recreate** et **RollingUpdate**. Ces stratégies définissent comment les Pods existants sont remplacés par de nouvelles versions.

---

### **1. Stratégie `Recreate`**

#### Fonctionnement :
- Tous les Pods existants sont supprimés avant de créer les nouveaux Pods avec la nouvelle configuration ou image.
- Utilisée pour des applications où des Pods de différentes versions ne peuvent pas coexister.

#### Spécification dans un manifeste :
```yaml
strategy:
  type: Recreate
```

#### **Avantages** :
- Aucune coexistence de Pods ayant des configurations ou des versions différentes, ce qui simplifie le déploiement.

#### **Inconvénients** :
- Risque d'interruption de service, car il n'y a pas de Pods disponibles pendant la transition.
- Si la mise à jour échoue, le service peut rester indisponible.

---

### **2. Stratégie `RollingUpdate`**

#### Fonctionnement :
- Les Pods existants sont remplacés progressivement par de nouveaux Pods.
- Les paramètres `maxSurge` et `maxUnavailable` contrôlent la cadence de la mise à jour.

#### Spécification dans un manifeste :
**Exemple 1 :**
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 100%
    maxUnavailable: 0
```
**Effet :** Double la capacité pendant la mise à jour (10 Pods deviennent temporairement 20).

**Exemple 2 :**
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 1
```
**Effet :** Permet un remplacement Pod par Pod (9 Pods actifs pendant la mise à jour, maximum 11 Pods).

#### **Paramètres importants** :
1. **`maxSurge`** :
    - Nombre ou pourcentage de Pods supplémentaires autorisés pendant la mise à jour.
    - Exprime la capacité temporaire du cluster pendant le déploiement.

2. **`maxUnavailable`** :
    - Nombre ou pourcentage de Pods pouvant être indisponibles pendant la mise à jour.
    - Garantit une certaine continuité de service.

#### **Avantages** :
- Aucun temps d'arrêt complet : des Pods restent disponibles tout au long du déploiement.
- Convient aux applications nécessitant une haute disponibilité.

#### **Inconvénients** :
- Pendant la mise à jour, les ressources nécessaires augmentent temporairement.
- Peut être plus complexe à gérer si des bugs apparaissent dans les nouvelles versions.

---

### **Choix entre Recreate et RollingUpdate**
- **Recreate** est adapté pour des applications sans contraintes de haute disponibilité ou des incompatibilités entre versions.
- **RollingUpdate** est recommandé pour des applications nécessitant une disponibilité continue.

---

### **Personnalisation et compromis**
Le choix des valeurs pour `maxSurge` et `maxUnavailable` dépend de :
1. **Ressources disponibles dans le cluster** :
    - Si les ressources sont limitées, utilisez des valeurs basses pour `maxSurge`.
2. **Tolérance à l'indisponibilité** :
    - Si votre application est critique, optez pour `maxUnavailable: 0`.

---

### **Mise en pause et reprise d’un déploiement**

#### Mise en pause :
Permet de stopper temporairement la mise à jour pour inspection ou correction :
```bash
kubectl rollout pause deployment hello
```

#### Reprise :
Relance la mise à jour après une pause :
```bash
kubectl rollout resume deployment hello
```

---

### **Stratégies avancées**
Pour des stratégies plus complexes, des outils ou plugins tiers comme **Flagger** permettent d’implémenter :
1. **Canary Releases** : Test progressif d'une nouvelle version auprès d'un sous-ensemble des utilisateurs.
2. **Blue/Green Deployments** : Maintien des deux versions (ancienne et nouvelle) simultanément, avec basculement.

Ces stratégies offrent un contrôle granulaire sur le déploiement, réduisant davantage les risques.

### **InitContainers dans Kubernetes**

Les **InitContainers** sont des conteneurs spéciaux exécutés **avant** les conteneurs principaux d’un Pod. Ils permettent de réaliser des opérations préalables au démarrage des conteneurs applicatifs.

---

### **Caractéristiques principales des InitContainers**

1. **Exécution séquentielle :**
    - Les InitContainers s'exécutent **un par un**, dans l’ordre défini dans le manifeste.
    - Chaque InitContainer doit se terminer avec succès avant de passer au suivant.

2. **Indépendants des conteneurs principaux :**
    - Les InitContainers ont leur propre environnement et configuration (image, commandes, variables d’environnement).
    - Ils n’ont pas accès au cycle de vie des conteneurs principaux.

3. **Redémarrage en cas d'échec :**
    - Si un InitContainer échoue, Kubernetes redémarre le Pod et relance tous les InitContainers depuis le début.

4. **Utilisation temporaire :**
    - Les InitContainers ne tournent plus une fois terminés avec succès. Ils ne consomment pas de ressources après leur exécution.

---

### **Cas d’utilisation des InitContainers**

1. **Préparation de l’environnement :**
    - Télécharger des fichiers nécessaires pour les conteneurs principaux.
    - Effectuer des configurations spécifiques (par exemple, monter des fichiers de configuration).

2. **Validation :**
    - Vérifier les dépendances ou la disponibilité des services externes (bases de données, API, etc.).

3. **Initialisation de volumes :**
    - Copier des fichiers ou appliquer des permissions sur des volumes partagés.

4. **Ajout de délais :**
    - Introduire un délai ou attendre la disponibilité de ressources externes (par exemple, attendre qu’une base de données soit prête).

---

### **Déclaration d’un InitContainer**

Voici un exemple de Pod avec un InitContainer :

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  initContainers:
  - name: init-myservice
    image: busybox
    command: ["sh", "-c", "echo Initialisation... && sleep 10"]
  containers:
  - name: my-app
    image: my-app-image
    ports:
    - containerPort: 80
```

#### Décryptage de l'exemple :
1. **`init-myservice`** :
    - Cet InitContainer exécute une commande simple, simule une initialisation avec un délai de 10 secondes.
2. **Conteneur principal `my-app`** :
    - Il ne sera démarré qu’après l’exécution réussie de `init-myservice`.

---

### **Avantages des InitContainers**

1. **Séparation des responsabilités :**
    - Les tâches d’initialisation sont isolées des conteneurs principaux, rendant les applications plus modulaires.

2. **Robustesse :**
    - Si une étape critique de préparation échoue, les conteneurs principaux ne démarrent pas.

3. **Flexibilité :**
    - Les InitContainers peuvent utiliser des images et outils différents de ceux des conteneurs principaux.

---

### **Limitations des InitContainers**

1. **Temps supplémentaire au démarrage :**
    - Les InitContainers ajoutent un délai avant que le Pod soit pleinement opérationnel.

2. **Pas d’accès direct aux conteneurs principaux :**
    - Les InitContainers ne peuvent pas interagir directement avec les conteneurs principaux.

---

### **Bonnes pratiques avec InitContainers**

1. **Limiter les tâches complexes :**
    - Les InitContainers doivent se concentrer sur des actions rapides et essentielles.

2. **Utiliser des images légères :**
    - Optez pour des images minimalistes, comme `busybox` ou `alpine`, pour des tâches simples.

3. **Rendre les étapes idempotentes :**
    - Assurez-vous que les InitContainers peuvent être relancés sans créer de problèmes ou de conflits.

---

Les InitContainers permettent de renforcer la flexibilité et la fiabilité des déploiements Kubernetes, en garantissant un environnement de démarrage propre et bien préparé pour les conteneurs principaux.