let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function addProductToCart(product) {
    const existingProduct = carrito.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.cantidad += 1;
    } else {
        carrito.push({
            ...product,
            cantidad: 1
        });
    }

    saveCart();
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = '';

    let total = 0;

    carrito.forEach(item => {
        const itemTotal = parseFloat(item.precio.replace('$', '')) * item.cantidad;
        total += itemTotal;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        cartItemDiv.innerHTML = `
            <span>${item.nombre} (x${item.cantidad}) - ${item.precio}</span>
            <span>$${itemTotal.toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;

        cartItemsDiv.appendChild(cartItemDiv);
    });

    cartTotalSpan.innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    const productIndex = carrito.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        const product = carrito[productIndex];

        if (product.cantidad > 1) {
            product.cantidad -= 1;
        } else {
            carrito.splice(productIndex, 1);
        }
    }

    saveCart();
    updateCartDisplay();
}

document.getElementById('checkout-button').addEventListener('click', function() {
    document.getElementById('checkout-form-container').style.display = 'block';
});

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const tarjeta = document.getElementById('tarjeta').value;

    // Simulamos el proceso de compra
    alert(`Compra confirmada para ${nombre}. Gracias por su compra!`);

    // Limpia el carrito y localStorage
    carrito = [];
    saveCart();
    updateCartDisplay();

    // Cierra el formulario
    document.getElementById('checkout-form-container').style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function() {
    updateCartDisplay();
});
