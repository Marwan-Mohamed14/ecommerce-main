document.getElementById("changePassForm").addEventListener("submit", (e) => {
    const newPass = document.getElementById("newPass").value;
    const confirmPass = document.getElementById("confirmPass").value;
    const currentPass = document.getElementById("currentPass").value;

    if (!confirmPass || !newPass || !currentPass) {
        alert('Please fill in all required fields');
        e.preventDefault();
        return; 
    }

    if (newPass !== confirmPass) {
        alert('Passwords do not match. Please enter again.');
        e.preventDefault();
        return; 
    }

    if (newPass.length < 8) {
        alert('Password must be at least 8 characters long');
        e.preventDefault();
        return; 
    }

    if (!/\d/.test(newPass)) {
        alert('Password must contain at least one number');
        e.preventDefault();
        return; 
    }
});
