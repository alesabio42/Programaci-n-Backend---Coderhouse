const express = require('express');
const http = require('http');
const helmet = require('helmet');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const { Server: ServerIO } = require('socket.io');
const { productModel } = require('./src/dao/models/products.model');
const ProductManager = require('./src/dao/managers/MDB/ProductManager');

const app = express();
const server = http.createServer(app);
const io = new ServerIO(server, {
  cors: {
    origin: '*',
  },
});

// Crear instancia del gestor de productos de MongoDB
const productManager = new ProductManager(productModel);

// Conexión a la base de datos
(async () => {
  try {
    await mongoose.connect('mongodb+srv://alejandrosabio24:aslaebio12344321@alejandrosabio.fo2mcjv.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    });
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
  }
})();

// Middleware para configurar la política de seguridad de contenido
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "http://localhost:8080/", "https://cdn.socket.io/"],
      "font-src": ["'self'", "http://localhost:8080/"],
    },
  })
);

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
const hbs = exphbs.create({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'src', 'views', 'layouts'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');

// Rutas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('home', { products: productManager.products });
});

app.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts', { products: productManager.products });
});

app.use(express.static(path.join(__dirname, 'src', 'public')));

// Socket del lado del servidor
io.on('connection', async (socket) => {
  console.log('Cliente conectado');

  // Obtener la lista de productos y enviarla al cliente cuando se conecta
  const productList = await productManager.getProducts();
  io.to(socket.id).emit('updateProducts', productList);

  // Manejar evento de nuevo producto
  socket.on('newProduct', async (newProduct) => {
    await productManager.addProduct(newProduct);
    const updatedProductList = await productManager.getProducts();
    io.emit('updateProducts', updatedProductList);
  });

  // Manejar evento de eliminación de producto
  socket.on('deleteProduct', async ({ productId }) => {
    const result = await productManager.deleteProduct(productId);
    if (result.success) {
      const updatedProductList = await productManager.getProducts();
      io.emit('updateProducts', updatedProductList);
    }
    io.to(socket.id).emit('deleteProduct', result);
  });



});

// Iniciar el servidor
const port = 8080;
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
