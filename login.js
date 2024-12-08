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


