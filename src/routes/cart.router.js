// cart.router.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { authTokenMiddleware } = require('../utils/jsonwebtoken');
const { auth } = require('../middleware/authetication.middleware');
const verifyRole = require('../middleware/verifyRole.middleware');
const { configObject } = require('../config/config');

const roleMiddleware = [auth, verifyRole(['user', 'premium'])];

// router.get('/', authTokenMiddleware, roleMiddleware, cartController.getCart);

router.get('/', authTokenMiddleware, roleMiddleware, async (req, res) => {
    try {
        const cartContent = await cartController.getCart(req.user.id);
        res.render('cart', {
            cartContent,
            stripePublicKey: configObject.stripe_public_key
        });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send('Error al obtener el carrito');
    }
});



router.post('/add-to-cart', authTokenMiddleware,roleMiddleware, cartController.addToCart);


module.exports = router;
