document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('user');
    const messageInput = document.getElementById('message');
    const btnGoToIndex = document.getElementById('btnGoToIndex');
  
    const socket = io();
  
    // Manejar mensajes existentes al conectarse
    socket.on('messages', (messages) => {
      messages.forEach((message) => {
        addMessageToChat(message);
      });
    });
  
    // Manejar nuevo mensaje del chat
    socket.on('message', (newMessage) => {
      addMessageToChat(newMessage);
    });
  
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = userInput.value;
      const message = messageInput.value;
  
      // Enviar nuevo mensaje al servidor a través de Socket.IO
      socket.emit('chatMessage', { user, message });
  
      // Limpiar campos después de enviar el mensaje
      userInput.value = '';
      messageInput.value = '';
    });
  
    btnGoToIndex.addEventListener('click', () => {
      // Lógica para redirigir a la página de Index
    });
  
    function addMessageToChat(message) {
      const messageElement = document.createElement('p');
      messageElement.textContent = `${message.user}: ${message.message}`;
      chatMessages.appendChild(messageElement);
    }
  });
  