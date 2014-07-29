APP.outdoor = {
    PHOTOS: 24, // Images total
    SLIDER_INTERVAL: 3000,

    $: {
        presentation: $(".presentation-container"),
        photo: $(".photo"),
        declarationSection: $("#declaration-section"),
        sliders: {}
    },

    initialize: function() {
        this.attachEvents();
        this.create();
        this.insert();
        this.doSlider();
    },

    attachEvents: function() {
        $("#presentation-section .btn-section-down").on("click", this.onBtnSectionDownClick.bind(this));
    },

    onBtnSectionDownClick: function(e) {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: this.$.declarationSection.offset().top
        }, 1000);
    },

    create: function() {
        var $shadow = $("<span/>"),
            $photos = $("<div/>");

        $photos.addClass("presentation-outdoor");
        $shadow.addClass("photo-shadow");

        // Create the containers
        for (var i = 1; i < (this.PHOTOS + 1); i++) {
            var $photo = $("<figure/>");

            $photo
                .addClass("photo")
                .attr("data-key", i)
                // UGLY HACK'S REASON: $.css() doesn't works and i hadn't been having time :/
                .attr("style", "background-image:url('images/personal/" + i + ".jpg')")
                .append($shadow.clone());

            $photos.append($photo);
        }

        // Export
        this.$.photos = $photos;
    },

    insert: function() {
        var self = this;

        this.$.presentation.each(function() {
            $(this).append($(self.$.photos).clone());
        });
    },

    doSlider: function() {
        var self = this;

        this.$.slidersCount = this.$.presentation.length;

        this.$.presentation.each(function() {
            self.changeUniqueRandomSlider(this);
        });

        // Random slider's transition
        setInterval(function() {
            var randomKey = self.randomNumber(self.$.slidersCount),
                $container;

            while (randomKey === self.$.lastSliderKeyChanged) {
                randomKey = self.randomNumber(self.$.slidersCount);
            }

            self.$.lastSliderKeyChanged = randomKey;

            $container = self.$.presentation.eq(randomKey - 1);

            self.changeUniqueRandomSlider($container);
        }, this.SLIDER_INTERVAL);
    },

    changeUniqueRandomSlider: function(container) {
        var $container = $(container),
            containerIndex = $container.index(),
            $slider = $container.find(".presentation-outdoor"),
            newPhotoKey = this.randomNumber(this.PHOTOS),
            $oldPhoto,
            $newPhoto;

        if (this.$.slidersCount) {
            while (this.indexOfKey(newPhotoKey) !== -1) {
                newPhotoKey = this.randomNumber(this.PHOTOS);
            }
        }

        // Removes that old photo
        if (typeof this.$.sliders[containerIndex] !== "undefined") {
            $oldPhoto = $slider.children(".active");
            $oldPhoto.removeClass("active");
        }

        // Manages the new photo
        this.$.sliders[containerIndex] = newPhotoKey;

        $newPhoto = $slider.children(":eq(" + (newPhotoKey - 1) + ")");

        $newPhoto.addClass("active");
    },

    randomNumber: function(max) {
        if (typeof max === "undefined") {
            return 0;
        }

        return Math.floor(Math.random() * parseInt(max)) + 1;
    },

    indexOfKey: function(key) {
        return this.getImagesKeys().indexOf(key);
    },

    getImagesKeys: function() {
        return $.map(this.$.sliders, function(value) { return value; });
    }
};
