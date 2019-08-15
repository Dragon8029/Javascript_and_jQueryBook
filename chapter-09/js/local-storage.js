if (window.localStorage) {
    var txtUsername = document.getElementById('username'); // Get form elements
    var txtAnswer = document.getElementById('answer'); 

    txtUsername.value = localStorage.getItem('username'); // Elements populated
    txtAnswer.value = localStorage.getItem('answer'); // by localStorage data

    txtUsername.addEventListener('input', function () { // Data saved
        localStorage.setItem('username', txtUsername.value);
    }, false);

    txtAnswer.addEventListener('input', function () { // Data saved
        localStorage.setItem('answer', txtAnswer.value);
    }, false);
}