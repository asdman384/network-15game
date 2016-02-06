var V = {
    init: function () {
        this.$usersCount = $('#users-count');
        this.hostList = $('#host-list');
        this.$selfTiles = $('#game15 > div');
        this.$opponentTiles = $('#opponent > div');
        this.$selfMoves = $('#your-moves');
        this.$opponentMoves = $('#opponent-moves');

    },
    updateUsersCounter: function (count) {
        this.$usersCount.text(count);
    },
    updateSelfMovesCounter: function (count) {
        this.$selfMoves.text(count);
    },
    updateOpponentMovesCounter: function (count) {
        this.$opponentMoves.text(count);
    },
    clearUserList: function () {
        this.userList.html('');
    },
    addHost: function (id) {
        $('<button/>', {
            id: id,
            class: 'connect',
            text: 'connect to: ' + id
        }).appendTo(this.hostList);
    },
    clearHostList: function () {
        this.hostList.html('');
    },
    hideHostList: function () {
        this.hostList.parent().hide();
    },
    draw: function (field, p) {

        switch (p) {
            case 'self':
                var $tiles = V.$selfTiles;
                break;
            case 'opponent':
                var $tiles = V.$opponentTiles;
                break;
        }

        $tiles.removeClass('hidden');
        $.each($tiles, function (i, tile) {
            var $tile = $(tile);
            $tile.text(field[i]);
            if (field[i] === 16)
                $tile.addClass('hidden');
        });
    }
};


