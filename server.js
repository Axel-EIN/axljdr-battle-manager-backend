import { ENV } from './config.js';
import express from 'express';
import cookieParser from 'cookie-parser'; // Module pour pouvoir lire les cookies

// Importation des routes
import routeurUtilisateur from './src/routes/utilisateur.route.js';
import routeurPersonnage from './src/routes/personnage.route.js';
import routeurCombat from './src/routes/combat.route.js';

import './src/models/index.js'; // Importation et connexion de la base de données

const app = express(); // Lancement du serveur express

// Implémentation des middlewares
app.use(express.json()); // Pour lire les données JSON
app.use(cookieParser()); // Pour parser les cookies

app.use((requete, reponse, next) => { // Methode pour faire fonctionner les cors
    reponse.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    reponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    reponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    reponse.setHeader("Access-Control-Allow-Credentials", true);
    return next();
});

// Middleware qui rend le dossier /public accessible sur http://localhost:8080/
app.use(express.static('public'));

// Middleware pour connecter les routes
app.use("/api/utilisateur", routeurUtilisateur);
app.use("/api/personnage", routeurPersonnage);
app.use("/api/combat", routeurCombat);

// Lancement de l'écoute du serveur
const PORT = ENV.PORT;
app.listen(PORT, () => {
    console.log(`Serveur à l'écoute sur http://localhost:${PORT}`);
});
