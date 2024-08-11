// main.js

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    const checkoutButton = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');

    // Actualiza el carrito en el DOM
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalItems += item.quantity;
            totalPrice += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            cartItem.innerHTML = `
                <div>
                    <h5>${item.name}</h5>
                    <p>Precio individual: $${item.price}</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Total: $${itemTotal}</p>
                </div>
                <button class="btn btn-danger remove-from-cart" data-id="${item.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalItemsElement.textContent = `Total de productos: ${totalItems}`;
        totalPriceElement.textContent = `Precio total: $${totalPrice}`;

        // Asigna el evento de eliminar producto al botón de cada elemento
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    // Añade producto al carrito
    function addToCart(event) {
        const button = event.target;
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        updateCart();
    }

    // Elimina producto del carrito
    function removeFromCart(event) {
        const id = event.target.getAttribute('data-id');
        const itemIndex = cart.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity -= 1;

            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }

        updateCart();
    }

    // Mostrar el formulario de pago cuando se presiona "Abonar Pedido"
    checkoutButton.addEventListener('click', () => {
        checkoutFormContainer.style.display = 'block';
    });

    // Validar y manejar el envío del formulario
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (checkoutForm.checkValidity()) {
            alert('Formulario enviado con éxito');
            // Aquí puedes añadir la lógica para procesar el formulario
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    });

    // Agregar eventos a los botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});
