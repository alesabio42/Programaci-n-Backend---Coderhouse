// chat.model.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages; 
