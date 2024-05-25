const { configObject } = require("../config/config");

let UserDao;
let ProductDao;
let CartsDao;

switch (configObject.persistence) {
    case 'FILE':
        // Aquí se van a asignar las implementaciones de FILE para UserDao, ProductDao, y CartsDao
        // Ejemplo: UserDao = require("./managers/FILE/userDao.file");
        break;
    case 'MEMORY':
        // Aquí  se van a asignar las implementaciones de MEMORY para UserDao, ProductDao, y CartsDao
        // Ejemplo: UserDao = require("./managers/MEMORY/userDao.memory");
        break;
    default:
        const { connectToDatabase } = require("../config/config");
        connectToDatabase();
        const UserDaoMongo = require("./managers/MDB/userDao.mongo");
        UserDao = UserDaoMongo;
        // Aquí también deberías asignar las implementaciones Mongo para ProductDao y CartsDao
        // Ejemplo: ProductDao = require("./managers/MDB/productDao.mongo");
        // Ejemplo: CartsDao = require("./managers/MDB/cartsDao.mongo");
        break;
}

module.exports = { UserDao, ProductDao, CartsDao };
