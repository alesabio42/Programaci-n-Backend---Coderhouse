const bcrypt = require('bcrypt');
const { userModel } = require('../../models/user.model');

const CartManager = require('./CartManager');

const CartService = new CartManager();


class UserManager {
    async createUser({ first_name, last_name, age, email, password }) {
        try {
            const exists = await userModel.findOne({ email });

            if (exists) {
                return { status: 'error', message: 'El usuario ya existe' };
            }

            const newUser = await userModel.create({
                first_name,
                last_name,
                age,
                email,
                password,
                cart: undefined
            });

            // Obtener el _id del usuario
            const userId = (await userModel.findOne({ email }))._id;

            // Crear el carrito para el nuevo usuario con el mismo _id
            const newCart = await CartService.createCart(userId.toString());
            
            // Actualizar el campo cart del usuario con el _id del carrito
            await userModel.findByIdAndUpdate(userId, { cart: newCart._id });

            return { status: 'success', message: 'Usuario creado correctamente', user: newUser };
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return { status: 'error', message: 'Error al crear el usuario' };
        }
    }


    async getUsersPaginate({ page = 1, limit = 10 }) {
        try {
            const users = await userModel
                .find()
                .skip((page - 1) * limit)
                .limit(Number(limit))
                .exec();

            return { status: 'success', users };
        } catch (error) {
            console.error('Error al obtener el listado paginado de usuarios:', error);
            return { status: 'error', message: 'Error al obtener el listado paginado de usuarios' };
        }
    }

    async getUsersBy(query) {
        try {
            const users = await userModel.find(query);

            return { status: 'success', users };
        } catch (error) {
            console.error('Error al obtener usuarios por consulta:', error);
            return { status: 'error', message: 'Error al obtener usuarios por consulta' };
        }
    }

    async updateUser(id, { first_name, last_name, email }) {
        try {
            const user = await userModel.findByIdAndUpdate(
                id,
                { $set: { first_name, last_name, email } },
                { new: true }
            );

            if (!user) {
                return { status: 'error', message: 'Usuario no encontrado' };
            }

            return { status: 'success', user, message: 'Usuario actualizado correctamente' };
        } catch (error) {
            console.error('Error al editar el usuario por ID:', error);
            return { status: 'error', message: 'Error al editar el usuario por ID' };
        }
    }

    async deleteUser(id) {
        try {
            const user = await userModel.findByIdAndDelete(id);

            if (!user) {
                return { status: 'error', message: 'Usuario no encontrado' };
            }

            return { status: 'success', message: 'Usuario eliminado correctamente' };
        } catch (error) {
            console.error('Error al eliminar el usuario por ID:', error);
            return { status: 'error', message: 'Error al eliminar el usuario por ID' };
        }
    }


async getUserById(id) {
    try {
        const user = await userModel.findById(id);

        if (!user) {
            return { status: 'error', message: 'Usuario no encontrado' };
        }

        return { status: 'success', user };
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        return { status: 'error', message: 'Error al obtener usuario por ID' };
    }
}
}

module.exports = UserManager;
