const mongoose = require('mongoose');

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const userModel = mongoose.model(usersCollection, usersSchema);

module.exports = {
    userModel
};
