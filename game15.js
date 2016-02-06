var game15 = (function () {

    var movesCounter, winResult, metaField;

    var init = function (field) {
        movesCounter = 0;
        winResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].join('');
        
        if (field) {
            metaField = field;
            return metaField;
        }
        
        metaField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        do {
            metaField.sort(function () {
                return Math.random() - 0.5;
            });
        } while (!isSolvable(metaField));
        return metaField;
    };
    var trueSwap = function (clickedTile) {

        var tile16index = metaField.indexOf(16),
                clickdIndex = metaField.indexOf(clickedTile),
                swaped = false;

        if ((Math.abs(tile16index - clickdIndex) === 1 && (Math.floor(tile16index / 4) === Math.floor(clickdIndex / 4))) ||
                Math.abs(tile16index - clickdIndex) === 4) {

            var t = metaField[tile16index];
            metaField[tile16index] = metaField[clickdIndex];
            metaField[clickdIndex] = t;

            movesCounter++;
            swaped = true;
        }
        
        return {
            swaped: swaped,
            win: isWin(),
            moves: movesCounter,
            field: metaField
        };
    };

    function isSolvable(arr) {
        var n = 0, ryad = 0;
        for (var j = 0; j < 16; j++) {
            if (arr[j] !== 16) {
                for (var k = j + 1; k < 16; k++) {
                    if (arr[j] > arr[k] && arr[k] !== 15) {
                        n++;
                    }
                }
            }
            else {
                ryad = Math.floor(j / 4) + 1;
            }
        }
        n = n + ryad;
        return n % 2 === 0;
    }
    function isWin() {
        return winResult === metaField.join('');
    }

    return {
        swap: trueSwap,
        init: init
    };
})();