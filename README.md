# Twitter en NodeJS

## FR

### Description

Application web Node.js/Express qui permet de creer, lister, modifier et supprimer des "tweets".  
L'interface est rendue avec Pug et stylisee avec Bootstrap. Les donnees sont stockees dans MongoDB via Mongoose.

### Installation

1. Prerequis: Node.js (avec npm) et un serveur MongoDB.
1. Configurer l'environnement:
   ```bash
   cp env.example .env
   ```
1. Modifier `.env` avec vos valeurs (voir section Configuration).
1. Installer les dependances:
   ```bash
   npm install
   ```
1. Lancer l'application:
   ```bash
   npm run start
   ```
1. Ouvrir `http://localhost:3000`.

### Configuration

- `MONGODB_URI`: URL de connexion MongoDB.
- `NODE_ENV`: `dev` ou `prod`.
- `PORT`: port d'ecoute HTTP (defaut `3000`).
- `MORGAN_FORMAT`: format de logs HTTP (defaut `combined`).
- `SESSION_SECRET`: le secret utilisé pour signer la session
- `SESSION_EXPIRATION`: La durée en jours avant expiration de la session (default `14`)

### Dev vs Prod

- `dev`: active `errorhandler` et affiche des erreurs detaillees pour faciliter le debug.
- `prod`: desactive `errorhandler` et renvoie des erreurs JSON plus sobres (sans details internes).

---

## EN

### Description

Node.js/Express web app to create, list, edit, and delete "tweets".  
The UI is rendered with Pug and styled with Bootstrap. Data is stored in MongoDB via Mongoose.

### Installation

1. Prerequisites: Node.js (with npm) and a MongoDB server.
1. Configure environment:
   ```bash
   cp env.example .env
   ```
1. Edit `.env` with your values (see Configuration).
1. Install dependencies:
   ```bash
   npm install
   ```
1. Start the app:
   ```bash
   npm run start
   ```
1. Open `http://localhost:3000`.

### Configuration

- `MONGODB_URI`: MongoDB connection URL.
- `NODE_ENV`: `dev` or `prod`.
- `PORT`: HTTP listening port (default `3000`).
- `MORGAN_FORMAT`: HTTP log format (default `combined`).
- `SESSION_SECRET`: secret used to sign the session
- `SESSION_EXPIRATION`: number of days before the session expires (default `14`)

### Dev vs Prod

- `dev`: enables `errorhandler` and shows detailed errors for easier debugging.
- `prod`: disables `errorhandler` and returns more minimal JSON errors (without internal details).
