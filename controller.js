/*global M, V, game15*/

var C = {
    state: null, /* null | host | client */
    game: null,
    gameStarted: false,
    usersCounter: 0,
    opponentMoves: 0,
    init: function () {
        M.users.transaction(function (usersCount) {
            C.usersCounter = ++usersCount;
            return C.usersCounter;
        });
        M.users.on("value", this.usersListener);

        window.onunload = function () {
            M.users.transaction(function (usersCount) {
                C.usersCounter = --usersCount;
                return C.usersCounter;
            });
        };

        M.games.on("value", this.gamesListener);
    },
    connect: function () {
        if (C.game) {
            return;
        }        

        var gameId = this.id;
        M.connect(
                gameId,
                function () {
                    C.game = gameId;
                    C.state = 'client';
                    M.games.off("value", C.gamesListener);
                    M.game.on("value", C.gameListener);
                }
        );

    },
    startHost: function () {
        if (C.game) {
            return;
        }        

        M.startHost(
                C.currentUserId,
                function (key) {
                    C.game = key;
                    C.state = 'host';
                    M.games.off("value", C.gamesListener);
                    M.game.on("value", C.gameListener);
                }
        );
    },
    move: function (field) {
        switch (C.state) {
            case 'host':
                M.game.child('hostField').set(field);
                break;
            case 'client':
                M.game.child('clientField').set(field);
                break;
        }
    },
    gameListener: function (data) {
        var game = data.val();        

        if (!game.hostField || !game.clientField) {
            return;
        }

        if (!C.gameStarted) {
            C.startGame();
            return;
        }

        M.game.off("value", C.gameListener);        
        switch (C.state) {
            case 'host':
                C.opponentMoves = -1;
                M.game.child('clientField').on("value", C.opponentFieldListener);
                break;
            case 'client':
                M.game.child('hostField').on("value", C.opponentFieldListener);
                break;
        }

    },
    opponentFieldListener: function (data) {
        var opponentField = data.val();        
        V.draw(opponentField, 'opponent');
        V.updateOpponentMovesCounter(C.opponentMoves++);
    },
    startGame: function () {

        switch (C.state) {
            case 'host':
                C.gameStarted = true;
                var field = game15.init();
                V.draw(field, 'self');
                M.game.child('hostField').set(field);

                break;
            case 'client':
                M.game.on("value", function init(data) {
                    var game = data.val();                    
                    if (typeof game.hostField === "boolean") {
                        return;
                    }
                    C.gameStarted = true;
                    M.game.off("value", init);
                    var field = game15.init(game.hostField);
                    V.draw(field, 'self');
                    M.game.child('clientField').set(field);
                });

                break;
        }
    },
    gamesListener: function (data) {
        var games = data.val();        
        V.clearHostList();
        for (var item in games) {
            if (!games[item].client) {
                V.addHost(item);
            }
        }
    },
    usersListener: function (data) {
        var count = data.val();        
        C.usersCounter = count;
        V.updateUsersCounter(count);
    }
};