document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const productDetails = document.querySelector('.product-details');
    
    addToCartBtn.addEventListener('click', function () {
        const stock = parseInt(productDetails.dataset.stock, 10);

        Swal.fire({
            title: '¿Estás seguro que quieres agregar este producto al carrito?',
            input: 'number',
            inputAttributes: {
                max: stock,
                min: 1,
                step: 1,
            },
            inputValue: 1,
            text: 'Selecciona la cantidad de unidades:',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value || value < 1) {
                    return 'Debes ingresar una cantidad válida.';
                }
                if (value > stock) {
                    return 'No hay suficiente stock disponible.';
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const quantity = result.value;
                alert(`Producto agregado al carrito con ${quantity} unidades.`);
                // Aquí puedes realizar acciones adicionales con la cantidad seleccionada
            }
        });
    });
});