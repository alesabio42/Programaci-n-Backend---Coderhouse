const { configObject } = require('../../config/config');


const Stripe = require('stripe');
const stripe = new Stripe(configObject.stripe_secret_key);

class PaymentService {
  async createPaymentIntent(data) {
    try {
      const paymentIntent = await stripe.paymentIntents.create(data);
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }
}

module.exports = {
    PaymentService
}; // Exportar una instancia única de PaymentService
