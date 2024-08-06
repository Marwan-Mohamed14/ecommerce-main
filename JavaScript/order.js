document.getElementById('order-form').addEventListener('submit',(e) => {
const name=document.getElementById('name').value;
const address=document.getElementById('address').value;
const postalCode=document.getElementById('postalcode').value;
const paymentMethod = document.querySelector('input[name="payment"]:checked').value;


if(!name ||!address ||!postalCode) {
    alert('Please fill in all required fields')
    e.preventDefault();
}
else if (paymentMethod === 'visa') {
    const isVisaValid = validateVisa();
    if (!isVisaValid) {
        e.preventDefault();
    }
}
});
function validateVisa() {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    let isValid = true;

    if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
        alert('Please enter a valid 16-digit card number');
        isValid = false;
    }

    if (!expiryDate || !isValidExpiryDate(expiryDate)) {
        alert('Please enter a valid expiry date in MM/YY format');
        isValid = false;
    }

    if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
        alert('Please enter a valid 3-digit CVV');
        isValid = false;
    }

    return isValid;
}

function isValidExpiryDate(date) {
    const parts = date.split('/');
    if (parts.length !== 2) return false;

    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);

    return month >= 1 && month <= 12 && year >= 0 && year <= 99;
}
