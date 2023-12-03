function validateForm() {
    var isValid = true;

    // Name validation
    var name = document.getElementById('name').value;
    if (name.length <= 5) {
        document.getElementById('name-error').innerText = 'Name must be more than 5 characters';
        isValid = false;
    } else {
        document.getElementById('name-error').innerText = '';
    }

    // Email validation
    var email = document.getElementById('email').value;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').innerText = 'Invalid email address';
        isValid = false;
    } else {
        document.getElementById('email-error').innerText = '';
    }

    // Subject validation
    var subject = document.getElementById('subject').value;
    if (subject.length <= 15) {
        document.getElementById('subject-error').innerText = 'Subject must be more than 15 characters';
        isValid = false;
    } else {
        document.getElementById('subject-error').innerText = '';
    }

    // Message content validation
    var content = document.getElementById('content').value;
    if (content.length <= 25) {
        document.getElementById('content-error').innerText = 'Message content must be more than 25 characters';
        isValid = false;
    } else {
        document.getElementById('content-error').innerText = '';
    }

    // If all fields are valid, you can proceed with form submission or further processing
    if (isValid) {
        // Form submission logic here
        console.log('Form is valid. Submitting...');
        // You might want to actually submit the form here
    }
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Trigger the form's submit event
            this.form.dispatchEvent(new Event('submit'));
        }
    });
  });
