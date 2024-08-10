document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('AddProduct').addEventListener('click', () => showModal('add'));
    document.getElementById('modalCloseButton').addEventListener('click', closeModal);
    document.getElementById('modalCancelButton').addEventListener('click', closeModal);
    document.getElementById('modalSaveButton').addEventListener('click', saveProduct);
    fetchProducts(); // Fetch and display existing products
});

function showModal(mode, product = {}) {
    console.log('Opening modal in mode:', mode, 'with product:', product);

    const modalTitle = document.getElementById('modalTitle');
    const modalForm = document.getElementById('modalForm');

    modalForm.innerHTML = `
        <label for="modalProductName">Name:</label>
        <input type="text" id="modalProductName" name="name" value="${product.name || ''}" required>
        <label for="modalProductPrice">Price:</label>
        <input type="number" id="modalProductPrice" name="price" value="${product.price || ''}" required>
        <label for="modalProductQuantity">Quantity:</label>
        <input type="number" id="modalProductQuantity" name="quantity" value="${product.quantity || ''}" required>
        <label for="modalProductDescription">Description:</label>
        <input type="text" id="modalProductDescription" name="description" value="${product.description || ''}" required>
        <label for="modalProductImage">Image:</label>
        <input type="file" id="modalProductImage" name="productImage">
    `;

    modalTitle.innerText = mode === 'edit' ? 'Edit Product' : 'Add Product';

    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'flex'; // Make sure the modal is visible
    } else {
        console.error('Modal element not found');
    }

    document.getElementById('modalSaveButton').dataset.mode = mode;
    document.getElementById('modalSaveButton').dataset.productId = product._id || '';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        // Reset the form
        document.getElementById('modalForm').reset();
    } else {
        console.error('Modal element not found');
    }
}



function validateForm() {
    const form = document.getElementById('modalForm');
    const name = form.querySelector('#modalProductName').value.trim();
    const price = parseFloat(form.querySelector('#modalProductPrice').value);
    const quantity = parseInt(form.querySelector('#modalProductQuantity').value, 10);
    const description = form.querySelector('#modalProductDescription').value.trim();

    if (!name || !description) {
        alert('Name and Description cannot be empty.');
        return false;
    }

    if (isNaN(price) || price < 0) {
        alert('Price must be a non-negative number.');
        return false;
    }

    if (isNaN(quantity) || quantity < 0) {
        alert('Quantity must be a non-negative number.');
        return false;
    }

    return true;
}

function saveProduct() {
    if (!validateForm()) {
        return; 
    }

    const modalForm = document.getElementById('modalForm');
    const formData = new FormData(modalForm);
    const mode = document.getElementById('modalSaveButton').dataset.mode;
    const productId = document.getElementById('modalSaveButton').dataset.productId;

    const endpoint = mode === 'edit' ? `/products/${productId}` : '/products';
    const method = mode === 'edit' ? 'PUT' : 'POST';

    fetch(endpoint, {
        method: method,
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        console.log('Response Text:', text);
        try {
            const data = JSON.parse(text);
            console.log('Parsed Data:', data);
            return data;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            throw new Error('Invalid JSON response');
        }
    })
    .then(data => {
        console.log('Success:', data);
        closeModal();
        fetchProducts(); // Refresh the product list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




function saveProduct() {

    if (!validateForm()) {
        return; // Stop execution if validation fails
    }
    const modalForm = document.getElementById('modalForm');
    const formData = new FormData(modalForm);
    const mode = document.getElementById('modalSaveButton').dataset.mode;
    const productId = document.getElementById('modalSaveButton').dataset.productId;

    const endpoint = mode === 'edit' ? `/products/${productId}` : '/products';
    const method = mode === 'edit' ? 'PUT' : 'POST';

    fetch(endpoint, {
        method: method,
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        console.log('Response Text:', text);
        try {
            const data = JSON.parse(text);
            console.log('Parsed Data:', data);
            return data;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            throw new Error('Invalid JSON response');
        }
    })
    .then(data => {
        console.log('Success:', data);
        closeModal();
        fetchProducts(); // Refresh the product list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchProducts() {
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productTableBody = document.querySelector('tbody');
            productTableBody.innerHTML = '';
            products.forEach(product => {
                const row = document.createElement('tr');
                row.dataset.id = product._id;
                row.innerHTML = `
                    <td><img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;"></td>
                    <td>${product.name}</td>
                    <td>$${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>${product.description}</td>
                    <td class="actions">
                        <button class="edit" data-id="${product._id}">Edit</button>
                        <button class="delete" data-id="${product._id}">Delete</button>
                    </td>
                `;
                productTableBody.appendChild(row);
            });
            // Reattach event listeners for edit and delete buttons
            document.querySelectorAll('.edit').forEach(button => {
                button.addEventListener('click', function() {
                    editProduct(this.dataset.id);
                });
            });
            document.querySelectorAll('.delete').forEach(button => {
                button.addEventListener('click', function() {
                    deleteProduct(this.dataset.id);
                });
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

function editProduct(productId) {
    console.log(`Edit button clicked for product ID: ${productId}`);
    fetch(`/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            return response.json();
        })
        .then(product => {
            console.log('Fetched product:', product);
            showModal('edit', product);
        })
        .catch(error => console.error('Error fetching product:', error));
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`/products/${productId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Product deleted:', data);
            fetchProducts(); // Refresh the product list
            alert('Product deleted successfully!');
        })
        .catch(error => console.error('Error deleting product:', error));
    }
}
