const CartManager = require('../dao/managers/MDB/CartManager');
const cartManager = new CartManager(); 
const logger = require('../utils/logger').logger;
const ProductController = require('../controllers/product.controller');

const productService = new ProductController();

class CartController {

    async addToCart(req, res) {
        try {
            const user = req.user;
            const userId = user.id;
            const productId = req.body.productId;
            const quantity = req.body.quantity;
            const owner = req.body.owner;

            // Verificar si el usuario es premium y es el propietario del producto
            if (user.role === 'premium' && owner === user.email) {
                return res.status(403).json({ error: 'No puedes agregar a tu carrito un producto que te pertenece' });
            }

            // Agregar el producto al carrito
            const cart = await cartManager.addProductToCart(userId, productId, quantity);

            res.json({ success: true });

        } catch (error) {
            logger.error('Error al agregar el producto al carrito:', error);
            res.status(500).json({ error: 'Error al agregar el producto al carrito' });
        }
    }



    async getCart(params) {
        try {
            const cartContent = await cartManager.getCartByUserId(params);
            return cartContent;
        } catch (error) {
            logger.error('Error al obtener el carrito:', error);
            throw new Error('Error al obtener el carrito');
        }
    }
}

module.exports = new CartController();
