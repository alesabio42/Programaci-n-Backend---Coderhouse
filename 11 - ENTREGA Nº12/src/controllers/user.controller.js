const { userService } = require('../repositories/index');
const { createHash } = require('../utils/hashBcrypt');

class UserController {
    constructor() {
        this.service = userService;
    }

    async getUsers(page = 1) {
        try {
            const options = { page, limit: 10 };
            const result = await this.service.getUsersPaginate(options);
            return result;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw new Error('Error interno del servidor');
        }
    }

    getUsersBy = async (req, res) => {
        const query = req.query;
        try {
            const result = await this.service.getUsersBy(query);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    createUser = async (req, res) => {
        const { first_name, last_name, age, email, password } = req.body;
        const newUser = ({ first_name, last_name, age, email, password: createHash(password) });
    
        try {
            const result = await this.service.createUser(newUser);
            return res.send(result);
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    updateUser = async (req, res) => {
        const { uid } = req.params;
        const userData = req.body;
        try {
            const result = await this.service.updateUser(uid, userData);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    deleteUser = async (req, res) => {
        const { uid } = req.params; 
        try {
            const result = await this.service.deleteUser(uid); 
            res.send(result);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    getUserById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.service.getUserById(id);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

module.exports = UserController;
