// SET UP THE SCRIPT
(function () {
    document.forms.register.noValidate = true; // Disable HTML5 validation
    $('form') .on('submit', function(e) { // When form is submitted
        var elements = this.elements; // Collection of form controls
        var valid = {}; // Custom valid object
        var isValid; // isValid: checks form controls
        var isFormValid; // isFormValid: checks entire form

        // PERFORM GENERIC CHECKS ( calls functions outside the event handler)
        for (var i = 0, l = (elements.length - 1); i < l; i++) { 
            // Next line calls validateRequired() & validateTypes()
            isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
            if (!isValid) { // If it does not pass these two tests
                showErrorMessage(elements[i]); // Show error messages
            } else { // Otherwise
                removeErrorMessage(elements[i]); // Remove error messages
            } // End if statement
            valid[elements[i].id] = isValid; // Add element to the valid object
        } // End for loop

        // PERFORM CUSTOM VALIDATION (just 1 of 3 functions)
        if (!validateBio()) { // Call validateBio(), if not valid
            showErrorMessage(document.getElementById('bio')); // Show error
            valid.bio = false; // Update valid object-not valid
        } else { // Otherwise
            removeErrorMessage(document.getElementById('bio')); // Remove error
        }
        if (!validatePassword()) { // call validatePassword()
            showErrorMessage(document.getElementById('password'));
            valid.password = false; // Update valid object-not valid
        } else { // Otherwaise
            removeErrorMessage(document.getElementById('password'));
        }
        if (!validateParentsConsent()) { 
            showErrorMessage(document.getElementById('parents-consent'));
            valid.parentsConsent = false; 
        } else {
            removeErrorMessage(document.getElementById('parents-consent'));
        }

        // DID IT PASS / CAN IT SUBMIT THE FORM
        // Loop through valid object, if there are errors set isFormValid to false
        for (var field in valid) { // Check properties of the valid object
            if (!valid[field]) { // If it is not valid
                isFormValid = false; // Set isFormValid variable to false
                break;
            } // Otherwise
            isFormValid = true; // The form is valid and OK to submit
        }
        // If the form did not validate, prevent it being submitted
        if (!isFormValid) { // If isFormValid is not true
            e.preventDefault(); // Prevent the form being submitted
        }
    }); // End event handler

    function validateRequired(el) {
        if (isRequired(el)) { // Is this element required?
            var valid = !isEmpty(el); // Is value not empty (true/false)
            if (!valid) { // If valid variable holds false
                setErrorMessage(el, 'Field is required'); // Set the error message
            }
            return valid; // Return valid variable (true/false)
        }
        return true; // If not required, all is okay
    }

    function isRequired(el) {
        return ((typeof el.required === 'boolean') && el.required) ||
            (typeof el.required === 'string'); 
    }

    function isEmpty(el) {
        return !el.value || el.value === el.placeholder; 
    }

    function validateTypes(el) {
        if (!el.value) return true; // If element has no value, return true

        var type = $(el).data('type') || el.getAttribute('type'); // Otherwise get the value from .data() or get the type of input
        if (typeof validateType[type] === 'function') { // Is type a method of validate object?
            return validateType[type](el); // If yes, check if the value validates
        } else { // If not
            return true; // Return true as it cannot be tested
        }
    }

    function validateParentsConsent() {
        var parentsConsent = document.getElementById('parents-consent');
        var consentContainer = document.getElementById('consent-container');
        var valid = true; // Variable: valid set to true
        if (consentContainer.className.indexOf('hide') === -1) { // If checkbox shown
            valid = parentsConsent.checked; // Update valid: is it checked/not
            if (!valid) { // If not, set the error message
                setErrorMessage(parentsConsent, 'You need your parents\' consent');
            }
        }
        return valid; // Return whether valid or not
    }

    function validateBio() {
        var bio = document.getElementById('bio'); // Store ref to bio text area
        var valid = bio.value.length <= 140; // Is bio <= 140 characters?
        if (!valid) { // If not, set an error message
            setErrorMessage(bio, 'Your bio should not exceed 140 characters');
        }
        return valid; // Return Boolean value
    }

    function validatePassword() {
        var password = document.getElementById('password'); // Store ref to element
        var valid = password.value.length >= 8; // Is its value >= 8 chars
        if (!valid) { // If not, set error msg
            setErrorMessage(password, 'Password must be at least 8 characters'); 
        }
        return valid; // Return true / false
    }

    function setErrorMessage(el, message) {
        $(el).data('errorMessage', message); // Store error message with element
    }

    function getErrorMessage(el) {
        return $(el).data('errorMessage') || el.title // Get error message or title of element
    }

    function showErrorMessage(el) {
        var $el = $(el); // The element with the error
        var errorContainer = $el.siblings('.error.message'); // Any siblings holding an error message

        if (!errorContainer.length) { // If no errors exist with the element
            // Create a <span> element to hold the error and add it after the element with the error
            errorContainer = $('<span class="error message"></span>').insertAfter($el);
        }
        errorContainer.text(getErrorMessage(el)); // Add error message
    }

    function removeErrorMessage(el) {
        var errorContainer = $(el).siblings('.error.message'); // Get the siblings of this form control used to hold the error message
        errorContainer.remove(); // Remove the element that contains the error message
    }

    var validateType = {
        email: function (el) { // Create email() method
            var valid = /[^@]+@[^@]+/.test(el.value);
            if (!valid) {
                setErrorMessage(el, 'Please enter a valid email'); 
            }
            return valid;
        },
        number: function (el) {
            var valid = /^\d+$/.test(el.value); 
            if (!valid) {
                setErrorMessage(el, 'Please enter a valid number');
            }
            return valid;
        },
        date: function (el) {
            var valid = /^(d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
            if (!valid) {
                setErrorMessage(el, 'Please enter a valid date');
            }
            return valid;
        }
    };


}());