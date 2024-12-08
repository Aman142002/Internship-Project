// Signup Form Handler
document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Signup successful
            alert(data.message || 'Signup successful!');
            window.location.href = 'login.html'; // Redirect to login page after successful signup
        } else {
            // Show error from server
            alert(data.message || 'Signup failed!');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Something went wrong. Please try again.');
    }
});

// Google Sign Up Handler
document.querySelector('.google-signup').addEventListener('click', function () {
    window.location.href = 'https://your-auth-provider.com/google'; // Replace with your OAuth 2.0 provider URL
});
