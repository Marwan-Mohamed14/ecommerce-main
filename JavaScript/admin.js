function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    var icon = document.getElementById('icon'); 
    if (document.body.classList.contains('dark-mode')) {
        icon.src = '../public/Pictures/sun_120349.png'; // Path to your light mode icon
        icon.alt = 'Light Mode Icon'; 
    } else {
        icon.src = '../public/Pictures/moon_icon-icons.com_48261.png'; // Path to your dark mode icon
        icon.alt = 'Dark Mode Icon'; 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
});
