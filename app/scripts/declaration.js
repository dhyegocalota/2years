APP.declaration = {
    DURATION_PX: 200,

    $: {
        outdoor: $("#declaration-outdoor"),
        section: $("#declaration-section"),
        btnControl: $("#declaration-text-controls .control")
    },

    initialize: function() {
        this.attachEvents();
    },

    attachEvents: function() {
        $(window).on("scroll", this.blurryImgOnWindowScroll.bind(this));
        $(window).on("scroll", this.playTextOnWindowScroll.bind(this));
        this.$.btnControl.on("click", this.onBtnControlClick.bind(this));
    },

    blurryImgOnWindowScroll: function() {
        var outdoorOffset = this.$.outdoor.offset().top,
            $img = this.$.outdoor.find(".blurred-img"),
            scrollTop = $(window).scrollTop(),
            opacity;

        if (scrollTop < (outdoorOffset - this.DURATION_PX)) {
            $img.css("opacity", 0);
            return false;
        }

        opacity = ((scrollTop - outdoorOffset) / this.DURATION_PX);

        if (opacity < 0) {
            opacity = 0;
        } else if (opacity > 1) {
            opacity = 1;
        }

        $img.css("opacity", opacity);
    },

    playTextOnWindowScroll: function() {
        var sectionOffset = this.$.section.offset().top - 100, // 100px extra scroll
            windowScrollTop = $(window).scrollTop();

        if (windowScrollTop >= sectionOffset && !this.textIsPlaying()) {
            this.playText();
        } else if (windowScrollTop < sectionOffset && this.textIsPlaying()) {
            this.pauseText();
        }
    },

    onBtnControlClick: function(e) {
        e.preventDefault();

        if (this.textIsPlaying()) {
            this.pauseText();
        } else {
            this.playText();
        }
    },

    textIsPlaying: function() {
        return this.$.section.hasClass("playing");
    },

    pauseText: function() {
        this.$.section
            .removeClass("playing")
            .addClass("paused");
    },

    playText: function() {
        if (APP.sounds.playlist.current !== 1) {
            APP.sounds.playlist.play(1); // Play Give me love
        }

        this.$.section
            .removeClass("paused")
            .addClass("playing");
    }
};
