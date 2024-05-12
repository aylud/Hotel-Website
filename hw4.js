 /* this retrieves the users date and formats it into a sentence */
document.getElementById('dynamicData').innerHTML = 'Today is ' + new Date().toDateString();
/* this works by getting dynamicdata html element and making it equal the value
of a string. The string is made by getting the date with new Date() and using a method 
to make it a string so it can be readable   */
document.getElementById("fname-field").onblur = function() {
    validateField('#fname-field', /^[A-Za-z'-]+$/, 'Invalid First Name.')
};
document.querySelector("#mi-field input").onblur = function() {
    validateField('#mi-field input', /^[A-Za-z]?$/, 'Invalid MI.', true);
};
document.getElementById("lname-field").onblur = function() {
    validateField('#lname-field', /^[A-Za-z0-9'-]+$/, 'Invalid Last Name.')
};
document.querySelector('#registrationForm input[name="email"]').onblur = function() {
    validateField('#registrationForm input[name="email"]', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email address is invalid.')
};
document.querySelector('#registrationForm input[name="phone"]').onblur = function() {
    validateField('#registrationForm input[name="phone"]', /^\d{3}-\d{3}-\d{4}$/, 'Invalid Phone Number. Format: 123-456-7890')
};
document.querySelector('#registrationForm input[name="ssn"]').onblur = function() {
    validateField('#registrationForm input[name="ssn"]', /^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN. Format: 123-45-6789')
};
document.querySelector('#registrationForm input[name="zip"]').onblur = function() {
    validateField('#registrationForm input[name="zip"]', /^[0-9-]{5,10}$/, 'Invalid Postal Code.')
};
document.getElementById('state').onblur = function() {
    const selectedState = this.value;
    if (!selectedState) { // Checks if the value is empty
        showError('#state', 'Please select a state.'); // Show error if no state is selected
    } else {
        clearErrorMessage('#state'); // Clear the error message if a state is selected
    }
};

document.getElementById('userid').onblur = function() {
    const userid = this.value;
    let errorMessage = '';
    
    // Check if it starts with a letter
    if (!/^[A-Za-z]/.test(userid)) {
        errorMessage += 'Start with a letter. ';
    }
    // Check if it contains only letters and numbers
    if (!/^[A-Za-z0-9]+$/.test(userid)) {
        errorMessage += 'Use only letters and numbers. ';
    }
    // Check the length
    if (!(userid.length >= 5 && userid.length <= 20)) {
        errorMessage += 'Be 5 to 20 characters long. ';
    }

    // Display specific error message or clear it if the userid meets all criteria
    if (errorMessage) {
        showError('#userid', 'User ID must ' + errorMessage);
    } else {
        clearErrorMessage('#userid');
    }
};
document.getElementById('password').onblur = function() {
    const password = this.value;
    let errorMessage = '';
    
    // Check for each condition separately
    if (!/[a-z]/.test(password)) {
        errorMessage += 'At least one lowercase letter. ';
    }
    if (!/[A-Z]/.test(password)) {
        errorMessage += 'At least one uppercase letter. ';
    }
    if (!/\d/.test(password)) {
        errorMessage += 'At least one number. ';
    }
    if (!/[!@#%^&*()\-_+=\/><.,`~]/.test(password)) {
        errorMessage += 'At least one special character (!@#%^&*()-_+=/><.,`~). ';
    }
    if (!(password.length >= 8 && password.length <= 30)) {
        errorMessage += 'Password must be 8 to 30 characters long. ';
    }

    // Display the specific error message or clear it if the password meets all criteria
    if (errorMessage) {
        showError('#password', 'Password requirements not met: ' + errorMessage);
    } else {
        clearErrorMessage('#password');
    }
};
document.getElementById('confirmPassword').onblur = function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value; // 'this' refers to the confirmPassword input element
    if (password !== confirmPassword) {
        showError('#confirmPassword', 'Passwords do not match.');
    } else {
        clearErrorMessage('#confirmPassword'); // Clear any existing error message if the validation passes
    }
};

document.getElementById('dob').onblur = function() {
    const dobInput = this; /* constant variable to get date of birth inputted by user from HTML*/ 
    const dob = new Date(dobInput.value);  /* creating a date object that takes the inputted value and makes a string representing a date */
    const today = new Date(); /* creates a date object to represent the current date */
    const minDob = new Date(new Date().setFullYear(today.getFullYear() - 120)); /* creates a variable to get lowest dob allowed and creating an object for it. It gets the current date, uses setFullYear to leave the month and day unchanged while we subtract 120 from today */

    // Reset hours for an accurate comparison
    today.setHours(0,0,0,0); 
    minDob.setHours(0,0,0,0);

    if (dob > today) {
        showError('#dob', 'Date of birth cannot be in the future.');
    } else if (dob < minDob) {
        showError('#dob', 'Date of birth cannot be more than 120 years ago.');
    } else {
        clearErrorMessage('#dob'); // Clear any existing error message if the validation passes
    }
};

/* pattern validation function that can show errors*/
function validateField(selector, pattern, errorMessage, optional = false) { /* fill in arguments to select field that is effected, matching the field to a pattern for validity, and showing the error message to guide users, the optional effects non-required fields */
    const field = document.querySelector(selector); /* allows me to select the field for verification */
    const fieldContainer = field.closest('.input-box');
    let error = fieldContainer.querySelector('.error-message'); // Try to find an existing error message div.
    if (optional && !field.value) { /* if field is optional and empty, clear any existing error message */
        if (error)  {
            error.remove();
        }
        return true;
    }

    if (!pattern.test(field.value)) { // Tests the value against the pattern
        if (!error) { // If no error message exists, show it
            showError(selector, errorMessage); // Calls showError which displays the error message
        } else {
            // If an error element already exists, we simply update its message
            error.textContent = errorMessage;
        }
        return false; // Returns false indicating validation failure
    } else {
        // If the value is correct and matches the pattern, remove any existing error message
        if (error) {
            error.remove();
        }
        return true; // Returns true indicating validation success
    }
}


function showError(selector, message) { /* contains parameters of the field, and the error message */
    const fieldContainer = document.querySelector(selector).closest('.input-box'); /* we are finding the field with selector and using closest we are grouping the error message together with the input box */
    let error = fieldContainer.querySelector('.error-message'); // Try to find an existing error message div.
    if (!error) {
        // If there isn't an existing error message, create a new div for it.
        error = document.createElement('div'); /* this is to create the error message and effectively place or style it */
        error.className = 'error-message'; /* this is creating the class for css styling */
        fieldContainer.appendChild(error); /*this is what actually places the error on the page by appending to the field container or input box linked with the variable error we created earlier */
    }
    // Whether the error message div was just created or found existing, set its text content.
    error.textContent = message;
    //error.classList.add('active'); // Make sure the error message is visible
}

/* function to clear previous error messages */
function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = ''; // Clear the message text
        //error.classList.remove('active'); // Hide the message
    });
}


function clearErrorMessage(selector) {
    const fieldContainer = document.querySelector(selector).closest('.input-box');
    const error = fieldContainer.querySelector('.error-message');
    if (error) {
        error.textContent = ''; // Clear the message text
        //error.classList.remove('active'); // Hide the message
        
    }
}


function formHasErrors() {
    // Check for visible error messages
    const errors = document.querySelectorAll('#registrationForm .error-message');
    console.log('Errors found:', errors.length);
    return errors.length > 0; // True if any errors are actively visible
}


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    if (formHasErrors()) {
        event.preventDefault(); // Prevent form submission if there are errors
        alert('Please correct the errors before submitting.');
    }
    // If no errors, the form submits normally
});



/* this creates slider functionality */
document.addEventListener("DOMContentLoaded", function() { /*  domcontentloaded waits for the page to load before executing */
    var slider = document.getElementById("guestsSlider"); /* links the slider html to the JS function  */
    var output = document.getElementById("guestsOutput"); /* links the span html to display the slider value   */
    slider.oninput = function() { /* checks slider with oninput for value changes whenever user interacts with the slider   */
        output.value = this.value; /* changes the value for display after getting checked   */
    };

    setDynamicDateRestrictions();

});


function reviewFormData() {
    const reviewArea = document.getElementById('reviewArea');    /* reference to the review area and make it visible */
    reviewArea.innerHTML = ''; /* Clear previous content */
    reviewArea.style.display = 'block';

    /* creates a table */
    const table = document.createElement('table'); /* creating a table to satisfy the requirements */
    table.style.width = '100%'; /* adjusting width to 100% of container similar to css */
    table.setAttribute('border', '1'); /* For basic styling */

    /* adds table header */
    const thead = table.createTHead();
    const rowHeader = thead.insertRow();
    const th1 = document.createElement('th'); /* creating html element for header */
    th1.textContent = 'Input'; /*naming */
    const th2 = document.createElement('th');
    th2.textContent = 'Value';
    rowHeader.appendChild(th1); /*making the text appear on the header */
    rowHeader.appendChild(th2);

    /* function to add rows to the table */
    const addRow = (fieldName, value) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = fieldName;
        cell2.textContent = value;
    };

    /* filling in row values */
    addRow('First Name', document.querySelector('input[placeholder="First Name"]').value);
    addRow('Middle Initial', document.querySelector('input[placeholder="MI"]').value);
    addRow('Last Name', document.querySelector('input[placeholder="Last Name"]').value);
    addRow('Email', document.querySelector('input[name="email"]').value);
    addRow('Phone Number', document.querySelector('input[name="phone"]').value);
    addRow('Date of Birth', document.querySelector('input[name="dob"]').value);
    addRow('Social Security Number', document.querySelector('input[name="ssn"]').value);
    addRow('City', document.querySelector('input[name="city"]').value);
    addRow('State', document.querySelector('select[name="state"]').value);
    addRow('Address', document.querySelector('input[name="address"]').value);
    addRow('Postal Code', document.querySelector('input[name="zip"]').value);
    addRow('Gender', document.querySelector('input[name="gender"]:checked').value);
    addRow('Number of Guests', document.getElementById('guests').value);
    addRow('Additional Notes', document.getElementById('accommodations').value);
    addRow('User ID', document.querySelector('input[name="userid"]').value);
    addRow('Password', document.querySelector('input[name="password"]').value);
    addRow('Confirm Password', document.querySelector('input[name="confirmPassword"]').value);
    addRow('Agree to Terms', document.getElementById('termsConditions').checked ? "Yes" : "No");
    addRow('Acknowledged Privacy Policy', document.getElementById('privacyPolicy').checked ? "Yes" : "No");
    addRow('Subscribed to Newsletter', document.getElementById('subscribeNewsletter').checked ? "Yes" : "No");

    /* append the created table to the review area */
    reviewArea.appendChild(table);
}
