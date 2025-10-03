// script.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registration-form');
  const feedbackDiv = document.getElementById('form-feedback');

  // Safety: ensure elements exist before proceeding
  if (!form || !feedbackDiv) {
    console.error('Required form or feedback element not found.');
    return;
  }

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Extra safety: check fields
  if (!usernameInput || !emailInput || !passwordInput) {
    console.error('One or more input fields are missing.');
    return;
  }

  // Simple, reliable email regex (not exhaustive but good for client-side check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Trim values
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;
    const messages = [];

    // Reset field styles
    [usernameInput, emailInput, passwordInput].forEach(el => {
      el.classList.remove('invalid', 'valid');
    });

    // Username validation
    if (username.length < 3) {
      isValid = false;
      messages.push('Username must be at least 3 characters long.');
      usernameInput.classList.add('invalid');
    } else {
      usernameInput.classList.add('valid');
    }

    // Email validation using regex
    if (!emailRegex.test(email)) {
      isValid = false;
      messages.push('Please enter a valid email address.');
      emailInput.classList.add('invalid');
    } else {
      emailInput.classList.add('valid');
    }

    // Password validation
    if (password.length < 8) {
      isValid = false;
      messages.push('Password must be at least 8 characters long.');
      passwordInput.classList.add('invalid');
    } else {
      passwordInput.classList.add('valid');
    }

    // Display feedback
    feedbackDiv.style.display = 'block';

    if (isValid) {
      feedbackDiv.textContent = 'Registration successful!';
      feedbackDiv.style.color = '#155724';          // dark green
      feedbackDiv.style.backgroundColor = '#d4edda'; // light green background
      feedbackDiv.style.border = '1px solid #c3e6cb';

      // Optionally clear the form
      form.reset();

      // Remove 'valid' classes after a short delay so the user sees the green borders briefly
      setTimeout(() => {
        [usernameInput, emailInput, passwordInput].forEach(el => el.classList.remove('valid'));
      }, 700);
    } else {
      // Join messages with <br> so they render on separate lines
      feedbackDiv.innerHTML = messages.join('<br>');
      feedbackDiv.style.color = '#721c24';           // dark red
      feedbackDiv.style.backgroundColor = '#f8d7da'; // light red background
      feedbackDiv.style.border = '1px solid #f5c6cb';
    }
  });
});
