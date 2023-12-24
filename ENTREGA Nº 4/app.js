const express = require('express');
const ProductManager = require('./ProductManager');
const { router: productsRouter, createProductsRouter } = require('./api/products');
const { router: cardsRouter, createCardsRouter, CardManager } = require('./api/cards');

const app = express();
const port = 8080;

// Crear instancias de las clases ProductManager y CardManager
const productManager = new ProductManager('productos.json');
const cardManager = new CardManager('carrito.json');

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Rutas para productos
app.use('/api/products', createProductsRouter(productManager));

// Rutas para carritos
app.use('/api/cards', createCardsRouter(cardManager));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
