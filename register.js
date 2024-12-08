const apiUrl = "https://internship-project-8ub3.onrender.com/api/v1/users";

// Register User
async function registerUser() {
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    const userData = {
        name,
        email,
        password
    };

    try {
        // Check if email already exists before registering
        const emailCheckResponse = await fetch(`${apiUrl}/email-check?email=${email}&type=register`);
        const emailCheckData = await emailCheckResponse.json();
        
        if (emailCheckResponse.status === 400) {
            document.getElementById("register-message").textContent = "This email is already registered!";
            return;
        }

        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.status === 201) {
            document.getElementById("register-message").textContent = "Registration successful!";
        } else {
            document.getElementById("register-message").textContent = data.message || "Error registering!";
        }
    } catch (error) {
        document.getElementById("register-message").textContent = "Error: " + error.message;
    }
}
