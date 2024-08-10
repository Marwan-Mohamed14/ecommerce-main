// JavaScript: problem.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('problemForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);

        fetch('/report-problem', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Problem reported successfully');
            form.reset(); // Optional: Clear the form fields
        })
        .catch(error => {
            console.error('Error submitting problem:', error);
            alert('There was a problem submitting your report. Please try again later.');
        });
    });
});
