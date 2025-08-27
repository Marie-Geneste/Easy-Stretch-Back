const express = require('express');

// on importe nos controllers
const stretchController = require('../controllers/stretchController');
const userMiddleware = require('../middleware/userMiddleware');

const router = express.Router();

// récupération des stretch
/**
 * @openapi
 * /stretches:
 *   get:
 *     tags: [Stretches]
 *     summary: Liste des étirements
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stretch'
 */
router.get('/',  stretchController.getAllStretches);


/**
 * @openapi
 * /stretches/{id}:
 *   get:
 *     tags: [Stretches]
 *     summary: Détail d’un étirement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stretch'
 *       404:
 *         description: Non trouvé
 */
router.get('/:id',  stretchController.getOneStretch);

router.post("/",  userMiddleware.isUserLogged, userMiddleware.isAdmin, stretchController.createStretch);
router.patch("/:id", userMiddleware.isUserLogged, userMiddleware.isAdmin, stretchController.updateStretch)
router.delete("/:id", userMiddleware.isUserLogged, userMiddleware.isAdmin, stretchController.deleteStretch);

// on exporte le router 
module.exports = router;
