# Easy Stretch - Backend

Backend de l’application **Easy Stretch**, développé en **Node.js** et utilisant **Express + Sequelize** pour interagir avec une base **PostgreSQL**.

---

## Technologies
- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- JWT pour l’authentification
- Docker / Docker Compose

---

## Fonctionnalités principales
- Authentification & gestion utilisateurs
  - Inscription / Connexion
  - Rôles (Utilisateur, Admin)
  - Gestion du profil
  - Suppression de compte
- Étirements
  - CRUD (ajout, modification, suppression)
  - Consultation liste et détail
  - Gestion favoris
- Produits
  - CRUD Produits
  - Gestion du stock
- Panier & Commandes
  - Panier persistant côté serveur
  - Modification / suppression produits
  - Validation commande
  - Paiement Paypal
- Formulaire de contact (envoi côté admin)

---

## Installation

### 1. Cloner le projet
```bash
git clone https://github.com/Marie-Geneste/Easy-Stretch-Back.git
```

### 2. Lancement

Docker : 
```bash
docker compose up --build
```

Sans Docker :
```bash
npm install
npm run dev
```

API disponible sur : http://localhost:3000


---

## Structure du projet

```c#
O-STRETCH--BACK/
 ├── app/
 │   ├── models/           # Modèles Sequelize (User, Stretch, Product, Order…)
 │   ├── controllers/      # Logique métier
 │   ├── routers/          # Définition des routes
 │   ├── middleware/       # Middlewares (auth, validation…)
 ├── data/                 # scripts BDD
 │── index.js              # Point d'entrée
 ├── docker-compose.yml
 └── package.json
 ```

---

## Notes

Sequelize est configuré en mode POO avec classes !

Le backend est totalement compatible avec Docker pour faciliter le déploiement.