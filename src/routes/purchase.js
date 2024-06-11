// RUTA RELATIVA: src/routes/purchase.routes.js
const fs = require('fs');
const path = require('path'); // Asegúrate de importar el módulo path
const express = require('express');
const router = express.Router();
const { sendMail } = require('../utils/sendEmail');
const PurchaseManager = require('../dao/managers/MDB/PurchaseManager');
const UserController = require('../controllers/user.controller');
const cartController = require('../controllers/cart.controller');
const userController = new UserController();

const { configObject } = require('../config/config');
const Stripe = require('stripe');
const stripe = Stripe(configObject.stripe_secret_key);


const purchaseManager = new PurchaseManager();


router.post('/', async (req, res) => {
  const { userId } = req.body; 
  console.log('ID del usuario:', userId);

  if (!userId) {
    return res.status(400).json({ error: 'Se requiere el ID de usuario para realizar la compra.' });
  }

  try {
    const ticket = await purchaseManager.createPurchaseTicket(userId);
    if (ticket) {
    
      const user = await userController.getUserById({ params: { id: userId } });
    
    if (!user || !user.user || !user.user.email) {
      return res.status(404).json({ error: 'Usuario no encontrado o correo electrónico no disponible.' });
    }

      const userEmail = user.user.email; 

      // Lee el archivo HTML de confirmación de compra
      const htmlPath = path.join(__dirname, '..', 'html', 'confirmationEmail.html');
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');

      // Reemplaza las variables dinámicas en el HTML
      const processedHtml = htmlContent.replace('{{ ticketId }}', ticket.id);

      // Envía el correo electrónico
      const subject = 'Confirmación de Compra';
      await sendMail(userEmail, subject, processedHtml);


      return res.status(201).json({ ticket });
    } else {
      return res.status(500).json({ error: 'No se pudo completar la compra.' });
    }
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    return res.status(500).json({ error: 'Ocurrió un error al procesar la compra.' });
  }
});

router.post('/create-checkout-session', async (req, res) => {
  const { userId } = req.body;

  try {
    // Obtener detalles del carrito del usuario
    const cartContent = await cartController.getCart(userId);

    // Verificar si el carrito está vacío
    if (!cartContent || !cartContent.products || cartContent.products.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío.' });
    }

    // Construir line_items para Stripe
    const lineItems = cartContent.products.map(product => {
      return {
        price_data: {
          currency: 'usd', 
          product_data: {
            name: product.productId.title,
            description: product.productId.description,
          },
          unit_amount: Math.round(product.productId.price * 100), // El precio debe ser en centavos
        },
        quantity: product.quantity,
      };
    });

    console.log('LineItems:', lineItems);

    // Crear la sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:8080/success', // URL a la que redirigir después del pago exitoso
      cancel_url: 'http://localhost:8080/cancel', // URL a la que redirigir si se cancela el pago
    });

    // Redirigir al usuario a la URL de Stripe para completar el pago
    res.redirect(303, session.url);

  } catch (error) {
    console.error('Error al crear la sesión de pago:', error.message);
    res.status(500).json({ error: 'Error al procesar el pago.' });
  }
});
module.exports = router;