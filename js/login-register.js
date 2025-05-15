
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageContainer = document.getElementById('message-container');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            messageContainer.innerHTML = ''; // Clear previous messages

            const result = handleRegistration(registerForm);
            displayMessage(messageContainer, result.message, result.success ? 'success' : 'error');

            if (result.success) {
                registerForm.reset();
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            messageContainer.innerHTML = '';

            const username = loginForm.username.value.trim();
            const password = loginForm.password.value;
            
            const result = handleLogin(username, password);
            displayMessage(messageContainer, result.message, result.success ? 'success' : 'error');

            if (result.success) {
                loginForm.reset();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }
});