const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
document.getElementById('signInForm').addEventListener('submit', (e) => {
    const email=document.getElementById('signInEmail').value;
    const password=document.getElementById('signInPassword').value;
    if(!email || !password){
        alert('please fill in required information');
        e.preventDefault
    }
    if(password.length<8) {
        e.preventDefault();
        if(!/\d/.test(password)) {
            e.preventDefault();}
            alert('Password must contain at least one number and 8 characters');
        }
});


document.getElementById('signUpForm').addEventListener('submit', (e) => {
    const email=document.getElementById('signUpEmail').value;
    const password=document.getElementById('signUpPassword').value;
    const username=document.getElementById('signUpUsername').value;
    if(!email || !password || !username) {
        alert('please fill in required information');
        e.preventDefault
    }   
    
    if(password.length<8) {
        e.preventDefault();
        if(!/\d/.test(password)) {
            e.preventDefault();}
            alert('Password must contain at least one number and 8 characters');
        }
    
});

