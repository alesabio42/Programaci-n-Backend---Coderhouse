// const { Router } = require('express');
// const { PaymentService } = require('../public/js/payments');
// const cartController = require('../controllers/cart.controller');

// const router = Router();

// router.post('/payment-intents', async (req, res) => {
//     try {
//       // Obtener los datos del cuerpo de la solicitud
//       const { userId, cardHolderName, cardNumber, cardExpiry, cardCvc } = req.body;
  
      
// // Validar que todos los campos necesarios estén presentes
// if (!userId || !cardHolderName || !cardNumber || !cardExpiry || !cardCvc) {
//     return res.status(400).json({ error: 'Faltan campos requeridos.' });
//   }
  
//   const cartContent = await cartController.getCart(userId);
  
//   // Crear el objeto de datos para el intento de pago en Stripe
//   const paymentIntentInfo = {
//     amount: cartContent.total * 100, // Ajusta el monto según sea necesario (en centavos)
//     currency: 'usd',
//     metadata: {
//       userId: userId,
//       orderDetail: JSON.stringify({
//         products: cartContent.products.map(product => ({
//           productId: product.productId,
//           quantity: product.quantity
//         }))
//       }),
//       address: JSON.stringify({
//         street: 'Calle de prueba',
//         postalCode: '08191',
//         externalNumber: '131321321'
//       })
//     }
//   };
  
  
//       // Crear el intento de pago en Stripe utilizando el servicio PaymentService
//       const service = new PaymentService();
//       const paymentIntent = await service.createPaymentIntent(paymentIntentInfo);
  
//       // Enviar el ID del intento de pago como respuesta al cliente
//       res.status(200).json({ id: paymentIntent.id });
  
//     } catch (error) {
//       console.error('Error al crear el intento de pago:', error.message);
//       res.status(500).json({ error: 'Error al procesar el pago.' });
//     }
//   });
  

// module.exports = router;
