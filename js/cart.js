let cart = [];

function addToCart(productId) {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            cart.push(product);
            renderCart();
        });
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'list-group-item d-flex justify-content-between align-items-center';
        itemDiv.innerHTML = `
            <div>
                <h6>${product.name}</h6>
                <p>$${product.price}</p>
            </div>
            <button class="btn btn-danger btn-sm remove-from-cart" data-id="${product.id}">Eliminar</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += product.price;
    });

    totalDiv.innerHTML = `<h4>Total: $${total}</h4>`;

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id != productId);
    renderCart();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    checkoutFormContainer.style.display = 'block';

    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (checkoutForm.checkValidity()) {
            alert('Formulario enviado correctamente');
            // Procesar el pedido aquí
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    });
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
        addToCart(e.target.dataset.id);
    }
});
