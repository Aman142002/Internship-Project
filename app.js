
const apiBaseUrl = "http://127.0.0.1:3000/api/v1";

async function fetchProducts() {
    try {
        const response = await fetch(`${apiBaseUrl}/products`);
        const products = await response.json();

        const productListDiv = document.getElementById('product-list');
        if (products.length > 0) {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <span class="product-price">$${product.price}</span>
                    <a href="productdescription.html?id=${product._id}" class="view-details-btn">View Details</a>
                `;
                productListDiv.appendChild(productElement);
            });
        } else {
            productListDiv.innerHTML = "No products found.";
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

fetchProducts();
