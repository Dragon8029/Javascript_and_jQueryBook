var elUsername = document.getElementById('username'); // Get username input
var elMsg = document.getElementById('feedback'); // Get feedback element

function checkUsername(minLength) { // Declare function
    if (elUsername.value.length < minLength) { // If username too short
        // Set the error message
        elMsg.textContent = 'Username must be ' + minLength + ' characters or more';
    } else { // Otherwise
        elMsg.innerHTML = ''; // Clear msg
    }
}

elUsername.addEventListener('blur', function() { // When it loses focus
    checkUsername(5);
}, false);
