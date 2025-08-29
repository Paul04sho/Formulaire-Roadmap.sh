const form = document.getElementById('profile-form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const passwordError = document.getElementById('password-error');
const progressBar = document.getElementById('progress');
const progressText = document.getElementById('progress-text');
const updateButton = document.getElementById('update-btn');
const successMessage = document.getElementById('success-message');

let isPasswordVisible = false;
let isConfirmPasswordVisible = false;

// Event listeners
document.getElementById('toggle-password').addEventListener('click', () => {
    isPasswordVisible = !isPasswordVisible;
    password.type = isPasswordVisible ? 'text' : 'password'; /* Users can verify their password by toggling visibility */
});

document.getElementById('toggle-confirm-password').addEventListener('click', () => {
    isConfirmPasswordVisible = !isConfirmPasswordVisible;
    confirmPassword.type = isConfirmPasswordVisible ? 'text' : 'password'; 
});

form.addEventListener('input', updateProgress);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(email.value === 'john@doe.com'){
       emailError.classList.add('active');
        return;
    }

    if(password.value !== confirmPassword.value){
        passwordError.classList.add('active');
        return;
    }

    successMessage.classList.add('active');

    // Reset form and progress after 2 seconds
    setTimeout(() => {
        resetForm();
    }, 2000);
    });

    function updateProgress() {
        let filledFields = 0;
        if (fullName.value.trim() !== '') filledFields++;
        if (email.value.trim() !== '') filledFields++;
        if (password.value.trim() !== '') filledFields++;
        if (confirmPassword.value.trim() !== '') filledFields++;

        const progressPercent = (filledFields / 4) * 100; /* Calculate progress based on filled fields, each one done equal 25% complete */
        progressBar.style.width = progressPercent + '%';
        progressText.innerText = `${Math.round(progressPercent)}%Complete`;

        const hue = 10 + (progressPercent * 1.2);
        progressBar.style.backgroundColor = `hsl(${hue}, 100%, 50%)`; /* Change color from red to green as progress increases */

        updateButton.disabled = progressPercent !== 100; /* Enable update button only when all fields are filled */
    }

    function resetForm() {
        form.reset();
        progressBar.style.width = '0%';
        progressBar.style.backgroundColor = 'var(--bar-fill)';
        progressText.innerText = '0% Complete';
        updateButton.disabled = true;
        
        successMessage.classList.remove('active');
        emailError.classList.remove('active');
        passwordError.classList.remove('active');
    }
