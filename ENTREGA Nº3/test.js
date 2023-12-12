const ProductManager = require('./ProductManager');

// Crear una instancia de la clase ProductManager
const productManager = new ProductManager('productos.json');

// Probar el método getProducts al inicio (debería devolver un arreglo vacío)
console.log('Productos al inicio:', productManager.getProducts()); 

// Probar el método addProduct
const newProduct = productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log('Producto agregado:', newProduct);

// Probar el método getProducts después de agregar un producto
console.log('Productos después de agregar uno:', productManager.getProducts());

// Probar el método getProductById con un id existente
const productById = productManager.getProductById(newProduct.id);
console.log('Producto encontrado por ID:', productById);

// Probar el método getProductById con un id inexistente (debería arrojar un error)
const nonExistingProduct = productManager.getProductById(999);
console.log('Producto inexistente por ID:', nonExistingProduct);

// Probar el método updateProduct
const updatedProduct = productManager.updateProduct(newProduct.id, { price: 250 });
console.log('Producto actualizado:', updatedProduct);

// Probar el método deleteProduct
productManager.deleteProduct(newProduct.id);
console.log('Productos después de eliminar el producto:', productManager.getProducts());
