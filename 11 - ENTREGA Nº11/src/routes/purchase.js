// RUTA RELATIVA: src/routes/purchase.routes.js

const express = require('express');
const router = express.Router();
const PurchaseManager = require('../dao/managers/MDB/PurchaseManager');

const purchaseManager = new PurchaseManager();

// Ruta para realizar una compra
router.post('/purchase', async (req, res) => {
  const { userId, products } = req.body;

  if (!userId || !products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Se requieren el ID de usuario y al menos un producto para realizar la compra.' });
  }

  const ticket = await purchaseManager.createPurchaseTicket(userId, products);

  if (ticket) {
    return res.status(201).json({ ticket });
  } else {
    return res.status(500).json({ error: 'No se pudo completar la compra.' });
  }
});

module.exports = router;