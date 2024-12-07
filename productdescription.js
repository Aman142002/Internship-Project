const apiBaseUrl = "http://127.0.0.1:3000/api/v1";

// Fetch and display product details
async function fetchProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const response = await fetch(`${apiBaseUrl}/products/${productId}`);
    const product = await response.json();

    const detailsDiv = document.getElementById('product-details');
    detailsDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div>
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <span>$${product.price}</span>
            <button onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
        </div>
    `;
}

// Fetch and display related products
async function fetchRelatedProducts() {
    const response = await fetch(`${apiBaseUrl}/products?limit=3`);
    const products = await response.json();

    const relatedDiv = document.querySelector('.related-products .product-grid');
    products.forEach(product => {
        relatedDiv.innerHTML += `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <p>$${product.price}</p>
                <button onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            </div>
        `;
    });
}

// Add product to the cart
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = { id, name, price, image, quantity: 1 };

    const existingProductIndex = cart.findIndex(item => item.id === id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

fetchProductDetails();
fetchRelatedProducts();
