## Documentation

https://mypads2.framapad.org/p/kubernetes-s5024-8to7o9nl

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

``` info
Une distribution on-premise (ou sur site) désigne une installation d'un logiciel ou d'une plateforme directement sur les serveurs physiques ou virtuels d'une organisation, 
au lieu d'être hébergée sur des serveurs tiers (comme dans le cas des services cloud). L'organisation contrôle totalement l'infrastructure et le déploiement.
```

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

``` info
Le Control Plane est le cerveau qui orchestre toutes les ressources Kubernetes.
La tolérance garantit que le cluster reste fonctionnel malgré des défaillances, 
grâce à des mécanismes comme la redondance, l'auto-réparation, et l'utilisation judicieuse des tolérances et contraintes.

La tolérance de 1 CP assure que le cluster Kubernetes peut fonctionner de manière résiliente même en cas de panne d'un nœud de son Control Plane, 
en s'appuyant sur les autres nœuds pour maintenir la gestion et la coordination des conteneurs.
```

## Installation de l'infrastructure

- 1 VM Debian 11 avec Docker