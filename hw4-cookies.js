document.addEventListener("DOMContentLoaded", function() { /* created a new js file for clarity and ease. this line reads the document once its loaded for the function to start */
    const greetingElement = document.getElementById('greeting'); /* creating a variables where can maybe start inserting a personalized greeting*/
    const newUserButton = document.getElementById('newUser'); /* creating a variable for new user to later replace when have a name from a cookie */
    const regForm = document.getElementById('registrationForm'); /* a variable to attach items to the actual form */
    const rememberCheckbox = document.getElementById('rememberMe'); /* variable to attach to a checkbox and run the function to remember a cookie if requested*/
    const fnameField = document.getElementById('fname-field');  /* this is the variable that remembers the actual name given by the cookie */

    function getCookie(name) { /* this function will get the name created by setcookie once they check remember me and make it parseable for later use */
        let cookieArray = document.cookie.split(';'); /* this will split the cookie into arrays with each cookie separated with a semicolon. document.cookie provides access to the browsers cookies */
        for(let i = 0; i < cookieArray.length; i++) { /* setting a for loop to find each specific cookie by name  */
            let cookie = cookieArray[i]; /* putting the cookies into an array */
            while (cookie.charAt(0) == ' ') { /* this reformats cookies because cookies typically have a space after the semicolon and we are getting rid of this if present */
                cookie = cookie.substring(1); /* this is removing the first character which has to be space */
            }
            if (cookie.indexOf(name + "=") == 0) { /* this is what we are using to find the cookie that contains name instead of something like userid and indicates a match*/
                return cookie.substring(name.length + 1, cookie.length);  /* this is how we extract the actual name where we get the cookie name and add 1 length to account for the '=' and extract whatever comes after which will be the name */
            }
        }
        return "";
    }

    function setCookie(name, value, days) { /* this sets the expiry of cookies for security purposes */
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function deleteCookie(name) { /* this function is run to delete the cookies as it sets the date back to trigger expiry */
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    let firstName = getCookie('firstName'); /* this is run to set the variable to whatever the user inputs for their name */
    if (firstName !== "") { 
        greetingElement.textContent = 'Welcome back, ' + firstName;  /* this is the script that will display the users name if they are returning*/
        newUserButton.style.display = 'block'; /* hides the text if they are a new user */
    } else {
        greetingElement.textContent = 'Hello New User'; /* otherwise this generic message will be sent as a greeting */
    }

    newUserButton.addEventListener('click', function() { /* this is function in case a new user is incorrectly indentified as a returning user and is given the chance to restart as a new user*/
        deleteCookie('firstName'); /* runs the deletecookie function and resets the form and ultimately refreshed the page for the user to get a fixed experience */
        regForm.reset();
        window.location.reload(); // Refresh the page to update the UI
    });

    regForm.addEventListener('submit', function(event) { /* listens for the submit button to remember the cookie if the rememberme box is ticked*/
        if (rememberCheckbox.checked) {
            setCookie('firstName', fnameField.value, 2); // Set cookie to expire in 48 hours
        } else {
            deleteCookie('firstName');
        }
        greetingElement.textContent = 'Welcome, ' + fnameField.value; 
        newUserButton.style.display = 'block';
    });
});
