
// UI Element Management
function updateAuthView(elements, isLoggedIn, username) {
    const { loginButton, signupButton, userGreeting, userGreetingText } = elements;
    
    if (loginButton && signupButton && userGreeting && userGreetingText) {
        if (isLoggedIn) {
            loginButton.style.display = 'none';
            signupButton.style.display = 'none';
            userGreeting.style.display = 'flex';
            userGreetingText.textContent = `Welcome, ${username}!`;
        } else {
            loginButton.style.display = '';
            signupButton.style.display = '';
            userGreeting.style.display = 'none';
            userGreetingText.textContent = '';
        }
    }
}

function updateCartVisibility(cartIcons, checkoutButton, isLoggedIn) {
    if (isLoggedIn) {
        cartIcons.forEach(icon => icon.style.display = '');
        if (checkoutButton) checkoutButton.style.display = '';
    } else {
        cartIcons.forEach(icon => icon.style.display = 'none');
        if (checkoutButton) checkoutButton.style.display = 'none';
    }
}

// Used in login and registration
function displayMessage(messageContainer, message, type = 'error') {
    if (!messageContainer) return;
    messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
}

// Mobile menu 
function initializeMobileMenu(menuButton, closeButton, mobileMenu) {
    if (menuButton && closeButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
        closeButton.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }
}
