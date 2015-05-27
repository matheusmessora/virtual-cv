var PANDOX = PANDOX || {};

PANDOX.SYSTEM = function () {

    var init = function(){
        $( ".color-picker" ).click(function() {
            var color = $(this).attr("pandox-color");
            console.log(color);
            $("#pandox-section-box").css("background-color", color);
        });
    };

    return {
        init: init
    };
}();