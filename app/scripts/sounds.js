APP.sounds = {
    $: {
        player: $("#jplayer"),
        playerContainer: $("#jplayer-container")
    },

    initialize: function() {
        this.doList();
    },

    doList: function() {
        this.playlist = new jPlayerPlaylist({
            jPlayer: this.$.player.selector,
            cssSelectorAncestor: this.$.playerContainer.selector
        }, [
            {
                title: "The A team",
                mp3: "musics/the-a-team.mp3"
            },
            {
                title: "Give me love",
                mp3: "musics/give-me-love.mp3"
            }
        ], {
            playlistOptions: {
                autoPlay: true
            },
            swfPath: "http://jplayer.org/latest/js",
            supplied: "mp3",
            wmode: "window",
            smoothPlayBar: true,
            keyEnabled: true
        });
    }
};
