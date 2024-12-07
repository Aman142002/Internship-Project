// Utility functions for Cart Management
function getCart() {
    // Retrieve the cart from localStorage (or initialize it)
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, name, price, image) {
    const cart = getCart();

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
    } else {
        // Add new item to the cart
        cart.push({
            productId,
            name,
            price,
            image,
            quantity: 1
        });
    }

    saveCart(cart);
    alert(`${name} added to cart!`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    alert('Item removed from cart!');
}

const shippingRate = 5; // Flat shipping rate per item

// Fetch cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Render the cart items
function renderCart() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const shippingChargeDiv = document.getElementById('shipping-charge');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p>Your cart is empty. Start adding items!</p>`;
        cartTotalDiv.innerHTML = "0.00";
        shippingChargeDiv.innerHTML = "0.00";
        return;
    }

    let total = 0;
    let shippingCharge = 0;

    cartItemsDiv.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        shippingCharge += item.quantity * shippingRate;

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    cartTotalDiv.innerHTML = total.toFixed(2);
    shippingChargeDiv.innerHTML = shippingCharge.toFixed(2);
}

// Update quantity of a cart item
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }
    const cart = getCart();
    cart[index].quantity = newQuantity;
    saveCart(cart);
    renderCart();
}

// Remove item from cart
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1); // Remove item
    saveCart(cart);
    renderCart();
}

// Checkout functionality
function checkout() {
    document.getElementById('checkout-btn').addEventListener('click', () => {
        const cart = getCart();
    
        if (cart.length === 0) {
            alert("Your cart is empty. Add items to proceed.");
            return;
        }
    
        // Navigate to checkout page
        window.location.href = 'checkout.html';
    });
    
}

// Initialize the cart page
renderCart();


