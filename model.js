var M = {
    game: null,
    init: function() {
        this.FB = new Firebase("https://sizzling-fire-8223.firebaseio.com/");
        this.games = this.FB.child("games");
        this.users = this.FB.child("users");
        
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