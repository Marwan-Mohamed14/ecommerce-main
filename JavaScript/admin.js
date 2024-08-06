function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if (sectionId === 'manage') {
        document.querySelector('.button-container').style.display = 'flex';
    } else {
        document.querySelector('.button-container').style.display = 'none';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    var icon = document.getElementById('icon'); 
    if (document.body.classList.contains('dark-mode')) {
        icon.src = '/Pictures/sun_120349 (1).png'; 
        icon.alt = 'Light Mode Icon'; 
    } else {
        icon.src = '/Pictures/moon_icon-icons.com_48261 (1).png'; 
        icon.alt = 'Dark Mode Icon'; 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

    // Add event listeners for add buttons
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', function() {
            showModal(button.innerText.split(' ')[1].toLowerCase());
        });
    });

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
                <label for="modalImage">Image:</label>
                <input type="file" id="modalImage" name="image">
            `;
            break;
        case 'product':
            modalTitle.innerText = 'Add Product';
            modalForm.innerHTML = `
                <label for="modalProductName">Name:</label>
                <input type="text" id="modalProductName" name="name" required>
                <label for="modalProductPrice">Price:</label>
                <input type="number" id="modalProductPrice" name="price" required>
                <label for="modalProductImage">Image:</label>
                <input type="file" id="modalProductImage" name="image">
                <label for="modalProductQuantity">Quantity:</label>
                <input type="number" id="modalProductQuantity" name="quantity" required>
                <label for="modalProductCompany">Company:</label>
                <select id="modalProductCompany" name="company" required>
                    <!-- Add options dynamically if necessary -->
                </select>
        `;
    }

    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function saveData() {
    const formData = new FormData(document.getElementById('modalForm'));

 

    closeModal();
}
