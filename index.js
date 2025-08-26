// Charger les variables d'environnements
require("dotenv/config");

// Import des dépendances
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const userMiddleware = require("./app/middleware/userMiddleware");

const router = require("./app/routers");
// const userMiddleware = require("./app/middleware/userMiddleware");

// Créer l'app
const app = express();

// On autorise les requêtes Cross-Origin suivantes
app.use(cors({
    origin:["https://easy-stretch.netlify.app", "http://localhost:3001"],
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET","POST","DELETE","PUT","PATCH","OPTIONS"],
}));

// On limite le nombre de requête des clients
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100000, //10
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);


// Body parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Token parsing
// req.token en global si jamais il y a
app.use(userMiddleware.decodeToken);

//multer
// const multer = require("multer");
// const bodyParser = multer();

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
// app.use( bodyParser.none() );

// Pour un test
app.get('/health', (req, res) => res.status(200).send('ok'));


// Router
app.use(router);

// Lancer l'app si pas en env de test
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
}

module.exports = app;
