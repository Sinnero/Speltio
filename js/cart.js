// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cart Management Functions
function updateCartIcon(icon, gameId) {
    const existingItem = cart.find(item => item.id === gameId);
    const iconSpan = icon.querySelector('.material-symbols-outlined');
    if (existingItem) {
        icon.classList.add('in-cart');
        if (iconSpan) iconSpan.textContent = 'remove_shopping_cart';
    } else {
        icon.classList.remove('in-cart');
        if (iconSpan) iconSpan.textContent = 'add_shopping_cart';
    }
}

function toggleCartItem(icon, gameId, gameTitle, gameDescription) {
    const existingItem = cart.find(item => item.id === gameId);
    if (existingItem) {
        cart = cart.filter(item => item.id !== gameId);
    } else {
        cart.push({ id: gameId, title: gameTitle, description: gameDescription, quantity: 1, price: 5 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon(icon, gameId);
}

function initializeCart(cartIcons) {
    cartIcons.forEach(icon => {
        const gameId = icon.dataset.id;
        const gameTitle = icon.dataset.title;
        const gameDescription = icon.dataset.description;
        if (gameId && gameTitle && gameDescription) {
            // Add click event listener
            icon.addEventListener('click', () => toggleCartItem(icon, gameId, gameTitle, gameDescription));
            
            // Keyboard support for Enter key
            const cartButton = icon.querySelector('.material-symbols-outlined');
            if (cartButton) {
                cartButton.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        toggleCartItem(icon, gameId, gameTitle, gameDescription);
                    }
                });
            }
            
            updateCartIcon(icon, gameId);
        }
    });
}

function getCart() {
    return cart;
}
