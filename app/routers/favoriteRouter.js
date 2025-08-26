const express = require('express');

// on importe nos controllers
const favoriteController = require('../controllers/favoriteController');
const userMiddleware = require('../middleware/userMiddleware');

const router = express.Router();

// récupération des stretch
router.get('/', userMiddleware.isUserLogged, favoriteController.getAllFavorites);
router.post('/:id', userMiddleware.isUserLogged, favoriteController.addOneFavorite);
router.delete('/:id', userMiddleware.isUserLogged, favoriteController.deleteOneFavorite);


// on exporte le router 
module.exports = router;
