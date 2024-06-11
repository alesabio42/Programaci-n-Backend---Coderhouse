// RUTA RELATIVA: public/js/purchaseScript.js
document.addEventListener('DOMContentLoaded', () => {
  const purchaseForm = document.getElementById('purchaseForm');
  const userIdInput = document.getElementById('userId');

  // Agregar evento al enviar el formulario
  purchaseForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener el ID del usuario del input oculto
    const userId = userIdInput.value;

    try {
      const response = await fetch('/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const ticket = await response.json();
        console.log('Compra confirmada:', ticket);
        // Mostrar SweetAlert2 para confirmar la compra
        Swal.fire({
          icon: 'success',
          title: 'Compra confirmada',
          text: '¡Gracias por tu compra!',
          willClose: () => {
            // Redirigir a otra página
            window.location.href = '/products/products'; 
          }
        });
      } else {
        console.error('Error al confirmar la compra:', response.statusText);
        // Mostrar SweetAlert2 para informar al usuario sobre el error
        Swal.fire({
          icon: 'error',
          title: 'Error al confirmar la compra',
          text: 'Hubo un problema al procesar tu compra. Por favor, inténtalo de nuevo más tarde.',
        });
      }
    } catch (error) {
      console.error('Error al confirmar la compra:', error.message);
      // Mostrar SweetAlert2 para informar al usuario sobre el error
      Swal.fire({
        icon: 'error',
        title: 'Error al confirmar la compra',
        text: 'Hubo un problema al procesar tu compra. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  });
});
document.addEventListener('DOMContentLoaded', async () => {
  const stripePublicKey = document.querySelector('meta[name="stripe-public-key"]').getAttribute('content');
  const stripe = Stripe(stripePublicKey);

  const purchaseForm = document.getElementById('purchaseForm');
  const userIdInput = document.getElementById('userId');

  purchaseForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = userIdInput.value;

    try {
      const response = await fetch('/purchase/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const session = await response.json();
        await stripe.redirectToCheckout({ sessionId: session.id });
        console.log('session creada');
      } else {
        console.error('Error al crear la sesión de pago:', response.statusText);
        // Manejar el error
      }
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error.message);
      // Manejar el error
    }
  });
});
