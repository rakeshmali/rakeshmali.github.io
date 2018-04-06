(function($){
    $(function(){

        var window_width = $(window).width();

        // convert rgb to hex value string
        function rgb2hex(rgb) {
            if (/^#[0-9A-F]{6}$/i.test(rgb)) { return rgb; }

            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

            if (rgb === null) { return "N/A"; }

            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }

            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        $('.dynamic-color .col').each(function () {
            $(this).children().each(function () {
                var color = $(this).css('background-color'),
                    classes = $(this).attr('class');
                $(this).html(rgb2hex(color) + " " + classes);
                if (classes.indexOf("darken") >= 0 || $(this).hasClass('black')) {
                    $(this).css('color', 'rgba(255,255,255,.9');
                }
            });
        });


        // Floating-Fixed table of contents
        if ($('nav').length) {
            $('.toc-wrapper').pushpin({ top: $('nav').height() });
        }
        else if ($('#index-banner').length) {
            $('.toc-wrapper').pushpin({ top: $('#index-banner').height() });
        }
        else {
            //$('.toc-wrapper').pushpin({ top: 0 });
        }



        // Toggle Flow Text
        var toggleFlowTextButton = $('#flow-toggle');
        toggleFlowTextButton.click( function(){
            $('#flow-text-demo').children('p').each(function(){
                $(this).toggleClass('flow-text');
            });
        });

//    Toggle Containers on page
        var toggleContainersButton = $('#container-toggle-button');
        toggleContainersButton.click(function(){
            $('body .browser-window .container, .had-container').each(function(){
                $(this).toggleClass('had-container');
                $(this).toggleClass('container');
                if ($(this).hasClass('container')) {
                    toggleContainersButton.text("Turn off Containers");
                }
                else {
                    toggleContainersButton.text("Turn on Containers");
                }
            });
        });

        // Detect touch screen and enable scrollbar if necessary
        function is_touch_device() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        }
        if (is_touch_device()) {
            $('#nav-mobile').css({ overflow: 'auto'});
        }

        // Set checkbox on forms.html to indeterminate
        var indeterminateCheckbox = document.getElementById('indeterminate-checkbox');
        if (indeterminateCheckbox !== null)
            indeterminateCheckbox.indeterminate = true;


        // Floating-Fixed table of contents
        setTimeout(function() {
            var tocWrapperHeight = 260; // Max height of ads.
            var tocHeight = $('.toc-wrapper .table-of-contents').length ? $('.toc-wrapper .table-of-contents').height() : 0;
            var socialHeight = 95; // Height of unloaded social media in footer.
            var footerOffset = $('body > footer').first().length ? $('body > footer').first().offset().top : 0;
            var bottomOffset = footerOffset - socialHeight - tocHeight - tocWrapperHeight;

            if ($('nav').length) {
                $('.toc-wrapper').pushpin({
                    top: $('nav').height(),
                    bottom: bottomOffset
                });
            }
            else if ($('#index-banner').length) {
                $('.toc-wrapper').pushpin({
                    top: $('#index-banner').height(),
                    bottom: bottomOffset
                });
            }
            else {
                $('.toc-wrapper').pushpin({
                    top: 0,
                    bottom: bottomOffset
                });
            }
        }, 10000);

        // Plugin initialization
        //$('.carousel.carousel-slider').carousel({full_width: true});
        //$('.carousel').carousel();
        $('.slider').slider({full_width: true});
        $('.parallax').parallax();
        //$('.modal-trigger').leanModal();
        $('.scrollspy').scrollSpy();
        $('.button-collapse').sideNav({'edge': 'left'});
        $('.datepicker').pickadate({selectYears: 20});
        $('select').not('.disabled').material_select();

        // Pushpin Demo Init
        if ($('.pushpin-demo-nav').length) {
            $('.pushpin-demo-nav').each(function() {
                var $this = $(this);
                var $target = $('#' + $(this).attr('data-target'));
                $this.pushpin({
                    top: $target.offset().top,
                    bottom: $target.offset().top + $target.outerHeight() - $this.height()
                });
            });
        }


        $(document).ready(function()
        {
            $(function() {
                $('a[href*="#"]:not([href="#"])').click(function() {
                    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                        if (target.length) {
                            $('html, body').animate({
                                scrollTop: target.offset().top
                            }, 1000);
                            return false;
                        }
                    }
                });
            });

        });

    }); // end of document ready
})(jQuery); // end of jQuery name space