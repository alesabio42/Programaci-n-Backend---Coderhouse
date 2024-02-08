// src/routes/chat.js
const express = require('express');
const router = express.Router();
const ChatManager = require('../dao/managers/MDB/ChatManager');
const Messages = require('../dao/models/chat.model'); // Asegúrate de tener la ruta correcta y el modelo Message definido

// Crear instancia del gestor de chat
const chatManager = new ChatManager();

router.get('/', async (req, res) => {
  try {
    const messages = await chatManager.getMessages(); // Usa getMessages en lugar de getChatMessages
    res.render('chat', { messages });
  } catch (error) {
    console.error('Error al obtener mensajes del chat:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

// Enviar mensaje al chat
router.post('/', async (req, res) => {
  const { user, message } = req.body;
  try {
    // Guardar el nuevo mensaje utilizando el ChatManager o directamente el modelo Message
    const newMessage = await Messages.create({ user, message });
    res.status(201).send('Mensaje enviado correctamente');
  } catch (error) {
    console.error('Error al enviar mensaje:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
