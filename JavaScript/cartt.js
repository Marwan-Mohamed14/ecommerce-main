document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const decreaseBtn = item.querySelector('.decrease-btn');
        const increaseBtn = item.querySelector('.increase-btn');
        const quantityElem = item.querySelector('.quantity');
        const priceElem = item.querySelector('.price');
        const totalPriceElem = document.querySelector('.total-price');

        decreaseBtn.addEventListener('click', (event) => {
            event.preventDefault();  // Prevent form submission
            let quantity = parseInt(quantityElem.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElem.textContent = quantity;
                updateTotalPrice();
            }
        });

        increaseBtn.addEventListener('click', (event) => {
            event.preventDefault();  // Prevent form submission
            let quantity = parseInt(quantityElem.textContent);
            quantity++;
            quantityElem.textContent = quantity;
            updateTotalPrice();
        });

        function updateTotalPrice() {
            let totalPrice = 0;
            cartItems.forEach(item => {
                const quantity = parseInt(item.querySelector('.quantity').textContent);
                const price = parseFloat(item.querySelector('.price').textContent);
                totalPrice += quantity * price;
            });
            totalPriceElem.textContent = totalPrice.toFixed(2);
        }
    });
});
