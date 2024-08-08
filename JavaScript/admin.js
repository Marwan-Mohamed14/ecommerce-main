document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for add buttons
    document.getElementById('AddProdut').addEventListener('click', () => showModal('product'));
    document.getElementById('AddUser').addEventListener('click', () => showModal('user'));

    // Close modal event listener
    document.getElementById('modalCloseButton').addEventListener('click', closeModal);
    document.getElementById('modalCancelButton').addEventListener('click', closeModal);
    document.getElementById('modalSaveButton').addEventListener('click', saveData);
});

function showModal(type) {
    const modalTitle = document.getElementById('modalTitle');
    const modalForm = document.getElementById('modalForm');
    modalForm.innerHTML = '';

    switch (type) {
        case 'user':
            modalTitle.innerText = 'Add User';
            modalForm.innerHTML = `
                <label for="modalUsername">Username:</label>
                <input type="text" id="modalUsername" name="username" required>
                <label for="modalEmail">Email:</label>
                <input type="email" id="modalEmail" name="email" required>
                <label for="modalPassword">Password:</label>
                <input type="password" id="modalPassword" name="password" required>
                <label for="modalType">Type:</label>
                <select name="type" id="modalType" required>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>`;
            break;
        case 'product':
            modalTitle.innerText = 'Add Product';
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
                <input type="file" id="modalProductImage" name="productImage" required>`;
            break;
    }

    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function saveData() {
    const formData = new FormData(document.getElementById('modalForm'));
    const type = document.getElementById('modalTitle').innerText.split(' ')[1].toLowerCase();

    if (type === 'product') {
        const productData = {
            name: formData.get('name'),
            price: formData.get('price'),
            quantity: formData.get('quantity'),
            description: formData.get('description'),
        };

        fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            closeModal();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else if (type === 'user') {
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            type: formData.get('type') || 'User',
        };

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            closeModal();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
