$(function() { // DOM has loaded
    function loadContent(url){ // Load new content into page
        $('#content').load(url + ' #container').hide().fadeIn('slow');
    }
    $('nav a').on('click', function(e) { // Click handler
        e.preventDefault(); // Stop link loading new page
        var href = this.href; // Get href attribute of link
        var $this = $(this); // Store link in jQuery object
        $('a').removeClass('current'); // Remove current from links
        $this.addClass('current'); // Update current link
        loadContent(href); // Call function: loads content
        history.pushState('', $this.text, href); // Update history
    });

    window.onpopstate = function() { // Handle back/forward buttons
        var path = location.pathname; // Get the file path
        loadContent(path); // Call function to load page
        var page = path.substring(location.pathname.lastIndexOf('/') + 1);
        $('a').removeClass('current'); // Remove current from links
        $('[href="' + page + '"]').addClass('current'); // Update current link
    };
});