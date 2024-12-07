const apiBaseUrl = "http://localhost:3000/api/v1/products/get/count";

// Fetch data on page load
window.onload = async () => {
    await fetchDashboardStats();
    await fetchProducts();
    await fetchUsers();
    await fetchOrders();
};

// Fetch Dashboard Stats
async function fetchDashboardStats() {
    // Simulate fetching stats
    document.getElementById("total-products").textContent = 10;
    document.getElementById("total-users").textContent = 50;
    document.getElementById("total-orders").textContent = 100;
    document.getElementById("total-sales").textContent = 5000;
}

// Fetch and Render Products
async function fetchProducts() {
    const response = await fetch(`${apiBaseUrl}/products`);
    const products = await response.json();
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.map(
        (product) => `
        <tr>
            <td>${product._id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td><button onclick="deleteProduct('${product._id}')">Delete</button></td>
        </tr>`
    ).join("");
}

// Fetch and Render Users
async function fetchUsers() {
    const response = await fetch(`${apiBaseUrl}/users`);
    const users = await response.json();
    const userList = document.getElementById("user-list");
    userList.innerHTML = users.map(
        (user) => `
        <tr>
            <td>${user._id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><button onclick="deleteUser('${user._id}')">Delete</button></td>
        </tr>`
    ).join("");
}

// Fetch and Render Orders
async function fetchOrders() {
    const response = await fetch(`${apiBaseUrl}/orders`);
    const orders = await response.json();
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = orders.map(
        (order) => `
        <tr>
            <td>${order._id}</td>
            <td>${order.user}</td>
            <td>${order.amount}</td>
            <td>${order.status}</td>
            <td><button onclick="updateOrderStatus('${order._id}')">Update</button></td>
        </tr>`
    ).join("");
}
