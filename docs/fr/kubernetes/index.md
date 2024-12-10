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

- **LoadBalancer :**
  - Crée automatiquement un load balancer externe (généralement dans le cloud) pour distribuer le trafic vers le service.
  - Cela permet d'exposer un service à l'extérieur du cluster avec un équilibrage de charge géré par le cloud provider (ex: AWS, GCP).
  - Nécessite un environnement cloud qui prend en charge cette fonctionnalité.

- **ExternalName :**
  - Fournit une abstraction pour un service externe, en utilisant un nom DNS externe.
  - Il redirige les demandes vers un service externe au lieu de gérer des pods internes.

#### 3. **Comment un Service fonctionne-t-il ?**
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

#### 5. **Résolution DNS :**
- Lorsque vous créez un Service, Kubernetes configure automatiquement un nom DNS interne pour ce service, généralement sous la forme de `<nom-du-service>.<namespace>.svc.cluster.local`.
- Par exemple, un service nommé `hello` dans le namespace `default` sera accessible via `hello.default.svc.cluster.local`.

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