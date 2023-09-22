function threadedChat() {
    $(document).ready(function () {
        // Check if the screen width is 1200px or more
        if ($(window).width() >= 1200) {
            // Check if the dropdown already exists
            if ($('#enableThreadingChat').length === 0) {
                var chatView = $('<div class="threads-wrapper"><i class="fa fa-fw fa-bars left"></i><form class="form"><div class="form-check form-switch sticky-tools-bar"> \
                    <input class="form-check-input" id="enableThreadingChat" type="checkbox" data-toggle="tooltip" data-placement="left" title="Threading On/Off" data-field="enableThreading"> \
                    <label class=" d-none d-md-inline fw-semibold" for="enableThreadingChat"><i class="fa fa-fw fa-bars-staggered right"></i></label> \
                </div></form></div>');
                $('[component="chat/header"]').prepend(chatView);
                // Check if there's a stored state for the checkbox and update it
                var storedState = localStorage.getItem('enableThreadingStateChat');
                if (storedState === 'true') {
                    $('#enableThreadingChat').prop('checked', true);
                }
            }
            // Toggle the class 'threaded' on or off when the checkbox changes state
            $('#enableThreadingChat').on('change', function () {
                var isChecked = $(this).is(':checked');
                var theTooltip = isChecked ? "Disable Threading" : "Enable Threading"; // Update tooltip message
                if (isChecked) {
                    console.log('Thread view is active.');
                    // Add the 'threaded' class to elements with attribute [data-self="0"]
                    $('[component="chat/message"][data-self="0"]').addClass('threaded');
                    $('[component="chat/message"][data-self="1"]').addClass('threaded');
                } else {
                    console.log('Thread view is inactive.');
                    // Remove the 'threaded' class from elements with attribute [data-self="0"]
                    $('[component="chat/message"][data-self="0"]').removeClass('threaded');
                    $('[component="chat/message"][data-self="1"]').removeClass('threaded');
                }
                
                // Update the tooltip title
                $(this).attr('data-original-title', theTooltip).tooltip('dispose').tooltip({
                    placement: 'bottom',
                    title: theTooltip,
                    trigger: 'hover'
                });
                // Store the checkbox state in localStorage
                localStorage.setItem('enableThreadingStateChat', isChecked);
            });

            // Check for changes in the checkbox state when the page loads
            $('#enableThreadingChat').trigger('change');
        }
    });
}



$(window).on('action:chat.loaded', function(data) {
    	$(document).ready(function() {
        console.log('hook triggered'); 
        threadedChat();
});
});
$(window).on('action:chat.received', function(data) {
    	$(document).ready(function() { 
    	    console.log('hook triggered'); 
        threadedChat();
});
});
$(window).on('action:chat.onMessagesAddedToDom', function(data) {
        	$(document).ready(function() { 
    	    console.log('hook triggered'); 
        threadedChat();
});
});
