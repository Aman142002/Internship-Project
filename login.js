const apiUrl = "https://internship-project-8ub3.onrender.com/api/v1/users";
async function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const loginData = { email, password };

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        if (response.status === 200) {
            document.getElementById("login-message").textContent = data.message;
        } else {
            document.getElementById("login-message").textContent = data.message || "Error logging in!";
        }
    } catch (error) {
        document.getElementById("login-message").textContent = "Error: " + error.message;
    }
}

// Forgot Password
async function forgotPassword() {
    const email = document.getElementById("forgot-email").value;

    try {
        const response = await fetch(`${apiUrl}/email-check?email=${email}&type=forgot-password`);

        const data = await response.json();
        if (response.status === 404) {
            document.getElementById("forgot-message").textContent = data.message || "Email not found!";
        } else if (response.status === 200) {
            const userId = data._id; // Use the user ID for password reset
            document.getElementById("forgot-message").textContent = "Please proceed with password reset.";
            // Call the password update function with the user ID and new password
            updatePassword(userId);
        }

    } catch (error) {
        document.getElementById("forgot-message").textContent = "Error: " + error.message;
    }
}
