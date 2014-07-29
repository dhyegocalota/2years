APP.tests = {
    cssRules: [
        'csstransitions',
        'cssanimations',
        'csstransforms',
        'csstransforms3d',
        'backgroundsize',
        'opacity'
    ],

    initialize: function() {
        var able = true;

        $.each(this.cssRules, function(key, rule) {
            able = Modernizr[rule];
        });

        if (!able) {
            $("html").addClass("browser-too-old");
        }
    }
};
