document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('AddUser').addEventListener('click', showModal);
    document.getElementById('modalCloseButton').addEventListener('click', closeModal);
    document.getElementById('modalCancelButton').addEventListener('click', closeModal);
    document.getElementById('modalSaveButton').addEventListener('click', saveUser);

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', handleEdit);
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', handleDelete);
    });
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
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function validateForm() {
    const username = document.getElementById('modalUsername').value.trim();
    const email = document.getElementById('modalEmail').value.trim();
    const password = document.getElementById('modalPassword').value;
    const type = document.getElementById('modalType').value;

    if (!username || !email || !password || !type) {
        alert('All fields are required.');
        return false;
    }

    const emailPattern = /@.*\./;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address with "@" and "."');
        return false;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }

    return true;
}

function saveUser() {
    if (!validateForm()) {
        return;
    }

    const form = document.getElementById('modalForm');
    const formData = new FormData(form);
    const userData = {};

    formData.forEach((value, key) => {
        userData[key] = value;
    });

    const action = document.getElementById('modalSaveButton').getAttribute('data-action');
    const url = action === 'edit' ? `/update-user/${userData.userId}` : '/signup';
    const method = action === 'edit' ? 'POST' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        window.alert('User saved successfully!');
        closeModal(); // Close the modal after saving
        location.reload(); // Reload the page to reflect changes
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function handleEdit(event) {
    const row = event.target.closest('tr');
    const userId = row.getAttribute('data-id');
    const username = row.querySelector('td:nth-child(1)').innerText;
    const email = row.querySelector('td:nth-child(2)').innerText;
    const type = row.querySelector('td:nth-child(3)').innerText;

    // Populate the modal with user data
    document.getElementById('modalForm').innerHTML = `
        <label for="modalUsername">Username:</label>
        <input type="text" id="modalUsername" name="username" value="${username}" required>
        <label for="modalEmail">Email:</label>
        <input type="email" id="modalEmail" name="email" value="${email}" required>
        <label for="modalPassword">Password:</label>
        <input type="password" id="modalPassword" name="password">
        <label for="modalType">Type:</label>
        <select name="type" id="modalType" required>
            <option value="Admin" ${type === 'Admin' ? 'selected' : ''}>Admin</option>
            <option value="User" ${type === 'User' ? 'selected' : ''}>User</option>
        </select>
        <input type="hidden" id="modalUserId" name="userId" value="${userId}">
    `;
    document.getElementById('modalTitle').innerText = 'Edit User';
    document.getElementById('modalSaveButton').setAttribute('data-action', 'edit');
    document.getElementById('modal').style.display = 'flex';
}


// Function to handle delete button click
function handleDelete(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/users/delete-user/${userId}`, {
            method: 'DELETE',
        })
        .then(response => {
            console.log('Response status:', response.status); // Debugging
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            console.log('Response text:', text); // Debugging
            alert('User deleted successfully');
            document.querySelector(`tr[data-id="${userId}"]`).remove(); // Remove user row from table
        })
        .catch(error => {
            console.error('Error:', error); // Debugging
            
        });
    }
}




function saveUser() {
    if (!validateForm()) {
        return;
    }

    const form = document.getElementById('modalForm');
    const formData = new FormData(form);
    const userData = {};

    formData.forEach((value, key) => {
        userData[key] = value;
    });

    const action = document.getElementById('modalSaveButton').getAttribute('data-action');
    const url = action === 'edit' ? `/users/update-user` : '/signup';
    const method = 'POST'; // Both adding and editing use POST

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        console.log('Response text:', text); // Debugging
        alert('User saved successfully!');
        closeModal(); // Close the modal after saving
        location.reload(); // Reload the page to reflect changes
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving user');
    });
}
