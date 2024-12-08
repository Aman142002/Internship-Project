document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please fill out both email and password fields');
        return;
    }

    try {
        // Send the login request to the backend API
        const response = await fetch(`https://internship-project-8ub3.onrender.com/users//email-check?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Login successful
            alert(data.message || 'Login successful!');
            localStorage.setItem('userToken', JSON.stringify(data.user)); // Save user details locally

            // Redirect based on user role
            if (data.user.isAdmin) {
                window.location.href = 'dashboard.html'; // Redirect to admin dashboard
            } else {
                window.location.href = 'index.html'; // Redirect to user dashboard
            }
        } else {
            // Login failed (wrong credentials or other server error)
            alert(data.message || 'Login failed!');
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error('Error during login:', error);
        alert('Something went wrong. Please try again.');
    }
});
