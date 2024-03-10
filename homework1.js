 /* Place your JavaScript in this file */
 /* this retrieves the users date and formats it into a sentence */
document.getElementById('dynamicData').innerHTML = 'Today is ' + new Date().toDateString();
/* this works by getting dynamicdata html element and making it equal the value
of a string. The string is made by getting the date with new Date() and using a method 
to make it a string so it can be readable   */
/* this creates slider functionality */
document.addEventListener("DOMContentLoaded", function() { /*  domcontentloaded waits for the page to load before executing */
    var slider = document.getElementById("guestsSlider"); /* links the slider html to the JS function  */
    var output = document.getElementById("guestsOutput"); /* links the span html to display the slider value   */
    slider.oninput = function() { /* checks slider with oninput for value changes whenever user interacts with the slider   */
        output.value = this.value; /* changes the value for display after getting checked   */
    }
});
/*this checks password is correct*/
document.getElementById('registrationForm').onsubmit = function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    /* Check if both passwords match */
    if (password !== confirmPassword) { /* checks if passwords match */
        alert('Passwords do not match.');
        event.preventDefault(); /* Prevent form submission */
        return false; /* Stop the function */
    }

};

