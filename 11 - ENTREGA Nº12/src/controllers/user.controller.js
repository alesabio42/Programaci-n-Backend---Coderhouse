const { UserDao } = require('../dao/factory'); // Asegúrate de importar UserDao desde tu fábrica
const { UserDto } = require('../dto/userDto');

class UserController {
    constructor() {
        this.userDao = new UserDao();
    }

    async getUsers(page = 1) {
        try {
            const options = { page, limit: 10 };
            const result = await this.userDao.getUsersPaginate(options);
    
            return result;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw new Error('Error interno del servidor');
        }
    }
    getUsersBy = async (req, res) => {
        const query = req.query;
        try {
            const result = await this.userDao.getUsersBy(query);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    createUser = async (req, res) => {
        console.log('Llegó a createUser'); // Verifica si llega aquí
        const { first_name, last_name, age, email, password } = req.body;
        const newUser = new UserDto({ first_name, last_name, age, email, password });
        console.log(newUser);
    
        try {
            const result = await this.UserDaoMongo.createUser(newUser);
            return res.send(result);
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    updateUser = async (req, res) => {
        const { uid } = req.params;
        const userData = req.body;
        console.log('Datos del usuario a actualizar:', userData);
        try {
            const result = await this.userDao.updateUser(uid, userData);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    deleteUser = async (req, res) => {
        const { uid } = req.params; 
        try {
            const result = await this.userDao.deleteUser(uid); 
            console.log(`Usuario eliminado correctamente: ${uid}`);
            res.send(result);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    getUserById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.userDao.getUserById(id);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

module.exports = UserController;
