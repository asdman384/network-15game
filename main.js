/*global M, V, C, game15*/

var R = {
    init: function () {

        $('#start-host').on('click', C.startHost);        
        V.hostList.on('click', '.connect', C.connect);
    }
}


$(document).ready(function () {

    V.init();
    R.init();
    M.init();
    C.init();   

    V.$selfTiles.click(function () {
        var result = game15.swap(+this.innerText);
        if (result.swaped) {
            C.move(result.field);
            V.draw(result.field, 'self');    
            V.updateSelfMovesCounter(result.moves);
        }
    });


});