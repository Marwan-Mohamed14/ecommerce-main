document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('AddProduct').addEventListener('click', showModal);

    document.getElementById('modalCloseButton').addEventListener('click', closeModal);
    document.getElementById('modalCancelButton').addEventListener('click', closeModal);
    document.getElementById('modalSaveButton').addEventListener('click', saveProduct);
});

function showModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalForm = document.getElementById('modalForm');
    modalForm.innerHTML = `
        <label for="modalProductName">Name:</label>
        <input type="text" id="modalProductName" name="name" required>
        <label for="modalProductPrice">Price:</label>
        <input type="number" id="modalProductPrice" name="price" required>
        <label for="modalProductQuantity">Quantity:</label>
        <input type="number" id="modalProductQuantity" name="quantity" required>
        <label for="modalProductDescription">Description:</label>
        <input type="text" id="modalProductDescription" name="description" required>
        <label for="modalProductImage">Image:</label>
        <input type="file" id="modalProductImage" name="productImage" required>
    `;
    modalTitle.innerText = 'Add Product';
    document.getElementById('modal').style.display = 'flex'; // Show the modal
}

function closeModal() {
    document.getElementById('modal').style.display = 'none'; // Hide the modal
}

function saveProduct() {
    const modalForm = document.getElementById('modalForm');
    const formData = new FormData(modalForm);

    fetch('/products', {
        method: 'POST',
        body: formData // Do not set Content-Type header; fetch will automatically set it to multipart/form-data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        closeModal(); // Close the modal on success
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
