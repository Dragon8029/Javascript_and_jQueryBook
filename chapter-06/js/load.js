function setup() { // Declare function
    var textInput; // Create variable
    textInput = document.getElementById('username'); // Get username input
    textInput.focus(); // Give username focus
}

window.addEventListener('load', setup, false); // When page loaded call setup()