document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items-list');
    const totalItemsSpan = document.getElementById('total-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCartItems() {
        cartItemsList.innerHTML = '';
        let totalItemCount = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
            if (totalItemsSpan) totalItemsSpan.textContent = '0 ($0)';
            return;
        }

        const ul = document.createElement('ul');
        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <div>
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <span class="item-price">$${item.price ? item.price : 5}</span>
                </div>
                <div>
                    <span>Quantity: ${item.quantity}</span>
                    <button class="remove-item-btn button" data-id="${item.id}">Remove</button>
                </div>
            `;
            ul.appendChild(li);
            totalItemCount += item.quantity;
            totalPrice += (item.price ? item.price : 5) * item.quantity;
        });
        cartItemsList.appendChild(ul);
        if (totalItemsSpan) totalItemsSpan.textContent = `${totalItemCount} ($${totalPrice})`;

        addRemoveButtonListeners();
    }

    function addRemoveButtonListeners() {
        const removeButtons = document.querySelectorAll('.remove-item-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemIdToRemove = event.target.dataset.id;
                cart = cart.filter(item => item.id !== itemIdToRemove);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            });
        });
    }

    if (cartItemsList) {
        displayCartItems();
    }

    const proceedButton = document.getElementById('proceed-to-payment');
    if (proceedButton) {
        proceedButton.addEventListener('click', () => {
            if (cart.length > 0) {
                if (isUserLoggedIn()) {
                    alert('Proceeding to payment (demo)!');
                } else {
                    alert('Please log in to proceed to payment.');
                }
            } else {
                alert('Your cart is empty.');
            }
        });
    }
});
