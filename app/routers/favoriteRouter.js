const express = require('express');

// on importe nos controllers
const favoriteController = require('../controllers/favoriteController');
const userMiddleware = require('../middleware/userMiddleware');

const router = express.Router();

// récupération des stretch

/**
 * @openapi
 * /user/me/stretches:
 *   get:
 *     tags: [Favoris]
 *     summary: Récupère les favoris de l’utilisateur
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stretch'
 *       401:
 *         description: Non authentifié
 */
router.get('/', userMiddleware.isUserLogged, favoriteController.getAllFavorites);
router.post('/:id', userMiddleware.isUserLogged, favoriteController.addOneFavorite);
router.delete('/:id', userMiddleware.isUserLogged, favoriteController.deleteOneFavorite);


// on exporte le router 
module.exports = router;
