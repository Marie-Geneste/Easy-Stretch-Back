// Charger les variables d'environnements
require("dotenv/config");

// Import des dépendances
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const userMiddleware = require("./app/middleware/userMiddleware");

const router = require("./app/routers");
// const userMiddleware = require("./app/middleware/userMiddleware");

//import swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

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


// Pour un test
app.get('/health', (req, res) => res.status(200).send('ok'));


// Router
app.use(router);

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Easy Stretch API",
            version: "1.0.0",
            description: "Documentation OpenAPI de l’API Easy Stretch",
        },
        servers: [
            { url: "http://localhost:3000", description: "Dev" },
            { url: "https://easy-stretch-back.onrender.com", description: "Prod" }
        ],
        components: {
            securitySchemes: {
                bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
            },
            schemas: {
                Stretch: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        name: { type: "string", example: "Étirement ischio-jambiers" },
                        description: { type: "string" },
                        main_image: { type: "string", format: "uri" },
                        description_image: { type: "string", format: "uri" },
                        category_id: { type: "integer", example: 2 }
                    },
                    required: ["id", "name"]
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ["./app/**/*.js", "./routes/**/*.js"], // fichiers où on mets des blocs JSDoc
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Lancer l'app si pas en env de test
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
}

module.exports = app;
