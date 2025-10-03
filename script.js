// script.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registration-form');
  const feedbackDiv = document.getElementById('form-feedback');

  if (!form || !feedbackDiv) {
    console.error('Missing required elements (form or feedbackDiv).');
    return;
  }

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (!usernameInput || !emailInput || !passwordInput) {
    console.error('One or more input fields are missing.');
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve and trim values
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;
    const messages = [];

    // Reset input classes (visual helpers, optional)
    [usernameInput, emailInput, passwordInput].forEach(el => {
      el.classList.remove('invalid', 'valid');
    });

    // --- Username validation ---
    if (username.length < 3) {
      isValid = false;
      messages.push('Username must be at least 3 characters long.');
      usernameInput.classList.add('invalid');
    } else {
      usernameInput.classList.add('valid');
    }

    // --- Email validation ---
    // Requirement: email must include both '@' and '.'
    if (!(email.includes('@') && email.includes('.'))) {
      isValid = false;
      messages.push('Please enter a valid email address (must contain "@" and ".").');
      emailInput.classList.add('invalid');
    } else {
      // Extra basic ordering check: '.' should come after '@' and not be the last character
      const atIndex = email.indexOf('@');
      const lastDotIndex = email.lastIndexOf('.');
      if (!(atIndex > 0 && lastDotIndex > atIndex + 1 && lastDotIndex < email.length - 1)) {
        isValid = false;
        messages.push('Please enter a valid email address (check placement of "@" and ".").');
        emailInput.classList.add('invalid');
      } else {
        emailInput.classList.add('valid');
      }
    }

    // --- Password validation ---
    if (password.length < 8) {
      isValid = false;
      messages.push('Password must be at least 8 characters long.');
      passwordInput.classList.add('invalid');
    } else {
      passwordInput.classList.add('valid');
    }

    // --- Feedback display logic ---
    feedbackDiv.style.display = 'block';

    if (isValid) {
      feedbackDiv.textContent = 'Registration successful!';
      feedbackDiv.style.color = '#28a745';
      // Optionally style background/border (not required by checks)
      feedbackDiv.style.backgroundColor = '';
      feedbackDiv.style.border = '';
      form.reset();

      // Clear valid classes shortly after reset so the green borders don't stay forever
      setTimeout(() => {
        [usernameInput, emailInput, passwordInput].forEach(el => el.classList.remove('valid'));
      }, 700);
    } else {
      // Join messages with <br> so they appear on separate lines
      feedbackDiv.innerHTML = messages.join('<br>');
      feedbackDiv.style.color = '#dc3545';
      // Optionally style background/border (not required by checks)
      feedbackDiv.style.backgroundColor = '';
      feedbackDiv.style.border = '';
    }
  });
});
