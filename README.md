# Book-Note

## Présentation

**Book-Note** est une application web de gestion de livres et de notes associées. Elle permet de consulter une liste de livres, d'en ajouter, de rechercher un titre, de modifier le contenu associé à un livre et de supprimer une entrée.

Le serveur est développé avec **Node.js**, **Express**, des vues **EJS** et une base de données **PostgreSQL**.

## Fonctionnalités

- Afficher les livres enregistrés dans la base de données.
- Ajouter un livre avec son titre, son auteur et son année.
- Associer ou modifier un texte/une note pour un livre.
- Rechercher les livres à partir du début de leur titre.
- Supprimer un livre.

## Technologies

- Node.js et modules JavaScript ES.
- Express 4 pour les routes HTTP.
- EJS pour le rendu des pages côté serveur.
- PostgreSQL avec le client `pg`.
- `body-parser` pour traiter les données envoyées par les formulaires.
- Axios est déclaré parmi les dépendances du projet.

## Structure du projet

```text
Book-Note/
├── index.js           # Serveur Express et routes
├── package.json       # Métadonnées et dépendances
├── package-lock.json  # Verrouillage des dépendances
├── views/
│   ├── index.ejs      # Liste des livres et recherche
│   ├── form.ejs       # Formulaire d'ajout
│   └── livre.ejs      # Consultation/édition d'une note
└── public/
    ├── css/           # Feuilles de style
    ├── font/          # Polices
    └── img/           # Images
```

## Prérequis

- Node.js et npm.
- PostgreSQL.
- Une base de données PostgreSQL nommée `book_note`, avec une table `book` contenant au minimum les colonnes utilisées par l'application : `id`, `title`, `author`, `year` et `message`.

Exemple de structure SQL à adapter à votre installation :

```sql
CREATE DATABASE book_note;

-- Connectez-vous ensuite à la base book_note, puis :
CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  year INTEGER,
  message TEXT
);
```

## Installation

Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/Cs7Awoumoujoseph/Book-Note.git
cd Book-Note
npm install
```

Configurez ensuite PostgreSQL et les variables d'environnement nécessaires avant de lancer le serveur.

## Configuration de la base de données

Le code actuel configure la connexion PostgreSQL directement dans `index.js`. **Avant toute utilisation, remplacez cette configuration par des variables d'environnement et changez tout mot de passe qui aurait été publié dans le dépôt.** Ne stockez jamais de secrets dans le code source.

Exemple de variables à définir dans votre environnement :

```text
DB_HOST=localhost
DB_PORT=5432
DB_NAME=book_note
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
PORT=3000
```

Le code doit être adapté pour lire ces variables (par exemple avec `process.env`) avant que cette configuration puisse être utilisée telle quelle.

## Lancement

Une fois la base de données créée et la configuration de connexion adaptée :

```bash
node index.js
```

Le serveur écoute actuellement sur le port `3000`. Ouvrez ensuite [http://localhost:3000](http://localhost:3000).

## Routes principales

| Méthode | Route | Rôle |
|---|---|---|
| GET | `/` | Afficher la liste des livres |
| POST | `/add` | Afficher le formulaire d'ajout |
| POST | `/add-book` | Enregistrer un livre |
| POST | `/update` | Ouvrir la page d'édition d'une note |
| POST | `/update1` | Enregistrer la note |
| POST | `/delete_book` | Supprimer un livre |
| POST | `/get_book` | Rechercher par titre |

## Points d'attention

- Le script de test dans `package.json` est un placeholder : aucun test automatisé n'est configuré.
- Vérifiez la gestion des erreurs et ajoutez des réponses HTTP explicites en cas d'échec de requête.
- Ajoutez une validation des données côté serveur et une protection adaptée contre les soumissions non autorisées.
- Configurez les secrets hors du dépôt et vérifiez l'historique Git si des identifiants ont déjà été commités.
