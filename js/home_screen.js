document.addEventListener('DOMContentLoaded', () => {

    document.getElementsByTagName('div')[0].focus();

    // Initialize UI Elements
    const cartIcons = document.querySelectorAll('.cart-icon');
    
    // Header elements
    const headerElements = {
        loginButton: document.getElementById('login-button-header'),
        signupButton: document.getElementById('signup-button-header'),
        userGreeting: document.getElementById('user-greeting-header'),
        userGreetingText: document.getElementById('user-greeting-text-header'),
        logoutButton: document.getElementById('logout-button-header')
    };

    // Mobile elements
    const mobileElements = {
        loginButton: document.getElementById('login-button-mobile'),
        signupButton: document.getElementById('signup-button-mobile'),
        userGreeting: document.getElementById('user-greeting-mobile'),
        userGreetingText: document.getElementById('user-greeting-text-mobile'),
        logoutButton: document.getElementById('logout-button-mobile')
    };

    const checkoutButton = document.querySelector('.checkout-button');

    // Initialize Cart
    initializeCart(cartIcons);

    // Initialize Mobile Menu
    const menuButton = document.querySelector('.menu-button');
    const closeButton = document.querySelector('.close-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    initializeMobileMenu(menuButton, closeButton, mobileMenu);

    // Update UI Function
    function updateUI() {
        const isLoggedIn = isUserLoggedIn(); // From auth.js
        const username = getLoggedInUser(); // From auth.js

        updateAuthView(headerElements, isLoggedIn, username);
        updateAuthView(mobileElements, isLoggedIn, username);
        updateCartVisibility(cartIcons, checkoutButton, isLoggedIn);
    }

    // Handle Logout
    function handleLogout() {
        logoutUser();
        updateUI(); 
        window.location.reload();
    }

    // Mobile menu initialization
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

    // Event Listeners
    if (headerElements.logoutButton) {
        headerElements.logoutButton.addEventListener('click', handleLogout);
    }
    if (mobileElements.logoutButton) {
        mobileElements.logoutButton.addEventListener('click', handleLogout);
    }

    // Initialize UI
    updateUI();
});
