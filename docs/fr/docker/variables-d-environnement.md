---
layout: doc
---

# Variables d'environnement

Parfois, il est nécessaire de passer des variables d'environnement à un conteneur.

Par exemple, pour initialiser une image `mariadb` (serveur de base de données), 
il est nécessaire de passer des variables d'environnement pour définir le mot de passe root, le nom de la base de données, etc.

## Passer des variables d'environnement

### En ligne de commande

```bash
docker run -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=my_database -e MYSQL_USER=my_user -e MYSQL_PASSWORD=my_password mariadb
```

### Avec un fichier d'environnement

```bash
docker run --env-file .env mariadb
```

Au lieu de passer les variables dans la commande, on les place dans un fichier `.env` : 

```plaintext
# .env
MYSQL_ROOT_PASSWORD=my-secret-pw
MYSQL_DATABASE=my_database
MYSQL_USER=my_user
MYSQL_PASSWORD=my_password
```