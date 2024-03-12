// RUTA RELATIVA: public/js/purchaseScript.js

// Importar el script directamente
document.addEventListener('DOMContentLoaded', async () => {
  const confirmPurchaseButton = document.querySelector('.btn-confirm-purchase');

  confirmPurchaseButton.addEventListener('click', async () => {
    // Obtener datos del carrito desde la vista
    const cartContent = getCartContentFromView();

    // Crear una solicitud al servidor para confirmar la compra
    const response = await fetch('/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartContent),
      });

    if (response.ok) {
      const ticket = await response.json();
      console.log('Compra confirmada:', ticket);
      // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario o redirigir a otra página.
    } else {
      console.error('Error al confirmar la compra:', response.statusText);
      // Manejar el caso de error, por ejemplo, mostrar un mensaje de error al usuario.
    }
  });

  // Función para obtener datos del carrito desde la vista
  function getCartContentFromView() {
    const userId = 'el_id_del_usuario'; // Aquí deberías obtener el ID del usuario de alguna manera

    const products = [];
    const productElements = document.querySelectorAll('.product-item');

    productElements.forEach(productElement => {
      const productId = productElement.querySelector('.product-title').innerText; // Obtener el ID del producto del título
      const quantity = parseInt(productElement.querySelector('.unique-product-details li:last-child').innerText.split(':')[1].trim()); // Obtener la cantidad del último elemento de detalles

      if (!isNaN(quantity)) {
        products.push({
          productId,
          quantity
        });
      }
    });

    return {
      userId,
      products
    };
  }
});
