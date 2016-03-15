var M = {
    game: null,
    init: function() {
        this.FB = new Firebase("https://sizzling-fire-8223.firebaseio.com/");
        this.games = this.FB.child("games");
        this.users = this.FB.child("users");
        VK.init(function() {
            // API initialization succeeded
            VK.api('users.get', {
                fields: 'photo_50'
            }, function(data) {
                if (data.response) {
                    data.response[0];
                    M.FB.child("v/" + Date.now().toString()).set('id' + data.response[0].id);
                }
            });
        }, function() {
            // API initialization failed
        }, '5.50');
    },
    startHost: function(onComplete) {
        var game = this.FB.child("games").push({
            hostField: true,
            clientField: false,
        }, function() {
            M.game = M.FB.child("games/" + game.key());
            onComplete(game.key());
        });
        game.onDisconnect().remove();
    },
    connect: function(gameId, onComplete) {
        this.FB.child("games/" + gameId).child('clientField').set(true, function() {
            M.game = M.FB.child("games/" + gameId);
            onComplete();
        }.bind(null, gameId));
    }
};