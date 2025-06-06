# ProxiTalent Frontend

ProxiTalent est une plateforme  qui connecte les compétences locales aux besoins professionnels, transformant vos besoins en opportunités concrètes. La plateforme facilite la mise en relation entre prestataires de services et entreprises, offrant une expérience fluide pour trouver des experts et des solutions professionnelles.

## Fonctionnalités

- Authentification utilisateur : inscription, connexion, réinitialisation et changement de mot de passe, gestion du profil
- Navigation et gestion des prestataires de services
- Navigation et gestion des entreprises
- Gestion des offres d'emploi et consultation détaillée des offres
- Pages d'articles et contenu éditorial
- Interface moderne et responsive avec TailwindCSS
- Profils sécurisés et vérifiés, paiement sécurisé, support 7j/7

## Technologies utilisées

- React 19
- TypeScript
- Vite (outil de build)
- TailwindCSS (styling)
- React Router DOM (routing)
- Axios (client HTTP)
- Lucide React et React Icons (icônes)
- ESLint (linting)

## Installation

### Prérequis

- Node.js (version 16 ou supérieure recommandée)
- npm ou yarn

### Installation des dépendances

```bash
git clone <url-du-repository>
cd frontend
npm install
# ou
yarn install
```

### Lancement du serveur de développement

```bash
npm run dev
# ou
yarn dev
```

Ouvrez votre navigateur à l'adresse `http://localhost:5173` (ou le port indiqué dans le terminal).

### Construction pour la production

```bash
npm run build
# ou
yarn build
```

### Prévisualisation de la build production

```bash
npm run preview
# ou
yarn preview
```

## Structure du projet

- `src/` - Code source
  - `components/` - Composants React réutilisables
  - `pages/` - Pages correspondant aux routes
  - `services/` - Modules d'API
  - `types/` - Définitions TypeScript
  - `utils/` - Fonctions utilitaires et instance axios
- `public/` - Ressources statiques
- `README.md` - Documentation du projet
- `package.json` - Métadonnées et scripts
- `vite.config.ts` - Configuration Vite

## Démo en ligne

Vous pouvez consulter la version en ligne de la plateforme ici :  
[https://proxitalents-frontend.onrender.com/](https://proxitalents-frontend.onrender.com/)

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir des issues ou à soumettre des pull requests.

## Licence

Ce projet est privé et n'est pas sous licence publique.

## Contact

Pour toute question ou support, veuillez contacter l'équipe de développement.
