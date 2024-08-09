// user-management.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('AddUser').addEventListener('click', showModal);

    document.getElementById('modalCloseButton').addEventListener('click', closeModal);
    document.getElementById('modalCancelButton').addEventListener('click', closeModal);
    document.getElementById('modalSaveButton').addEventListener('click', saveUser);
});

function showModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalForm = document.getElementById('modalForm');
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
        </select>
    `;
    modalTitle.innerText = 'Add User';
    document.getElementById('modal').style.display = 'flex'; // Show the modal
}

function closeModal() {
    document.getElementById('modal').style.display = 'none'; // Hide the modal
}

function saveUser() {
    const form = document.getElementById('modalForm');
    const formData = new FormData(form);
    const userData = {};

    formData.forEach((value, key) => {
        userData[key] = value;
    });

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // Convert object to JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('User saved successfully!');
        closeModal();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
