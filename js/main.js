document.addEventListener("DOMContentLoaded", function() {
    fetch('data/product.json')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        
        data.forEach(producto => {
            const productDiv = document.createElement('div');
            productDiv.className = 'producto';

            productDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <button onclick="addToCart(${producto.id})">Comprar</button>
            `;

            productList.appendChild(productDiv);
        });
    });
});

function addToCart(productId) {
    fetch('data/product.json')
    .then(response => response.json())
    .then(data => {
        const product = data.find(item => item.id === productId);
        if (product) {
            addProductToCart(product);
        }
    });
}
