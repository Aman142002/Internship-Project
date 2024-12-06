document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    const categoryNameElement = document.getElementById('category-name'); // To display category name
    const productGrid = document.getElementById('productGrid'); // Container for products

    if (!categoryId) {
        productGrid.innerHTML = '<p>No category selected.</p>';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/v1/products?categories=${categoryId}`);
        const data = await response.json();

        if (data.products && data.products.length > 0) {
            categoryNameElement.innerText = data.categoryName || 'Products'; // Display category name
            productGrid.innerHTML = ''; // Clear previous content

            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-item');
                productCard.innerHTML = `
                    <a href="productdescription.html?id=${product._id}">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>$${product.price}</p>
                    </a>
                `;
                productGrid.appendChild(productCard);
            });
        } else {
            productGrid.innerHTML = '<p>No products found in this category.</p>';
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
});
