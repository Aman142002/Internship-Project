const apiUrl = "https://internship-project-8ub3.onrender.com/api/v1/users";

async function loginUser(event) {
    event.preventDefault(); // Prevent default form submission behavior

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
        const loginMessage = document.getElementById("login-message");

        if (response.status === 200) {
            loginMessage.style.color = "green";
            loginMessage.textContent = data.message;

            // Redirect to index.html after 2 seconds
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            loginMessage.style.color = "red";
            loginMessage.textContent = data.message || "Error logging in!";
        }
    } catch (error) {
        const loginMessage = document.getElementById("login-message");
        loginMessage.style.color = "red";
        loginMessage.textContent = "Error: " + error.message;
    }
}

// Attach the function to the form submission event
document.getElementById("loginForm").addEventListener("submit", loginUser);
