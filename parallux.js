var PARALLUX = PARALLUX || {};

PARALLUX.SYSTEM = function () {

    var finished = false;
    var elements = [];
    var config = {
        frameCount: 200
    }

    var init = function(config){
        this.config = config;

        getAll();
        getNexts();
        print();

        elements[0].finished = 1;
        calculate(elements, 1);
        print();

    };



    var getAll = function(){
        $( ".prlx" ).each(function( index ) {
            var jElement = $(this);

            elements.push({
                id: jElement.attr("id"),
                dom: jElement
            });
        });
    };

    var getNexts = function() {
        var previous = null;
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];

            var next = getNext(element.dom);
            if(next !== undefined){
                element.after = next;
            }else {
                element.after = null;
            }

            previous = element.id;
        }
    };

    var getNext = function(domElement) {
        var attr = domElement.attr("prlx-after");
        return attr;
    };

    var getByID = function(id){
        console.log("finding:" + id);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if(element.id === id)
                return element;
        }

        return null;
    };


    var print = function(){
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            console.log(JSON.stringify(element));

        }
    };

    var alreadyCalculated = function(element){
        var already = element.finished !== undefined;
        console.log(element.finished, already);
        return already;
    };

    var calculate = function(subElements, startAt){
        var afterElements = [];
        for (var i = 0; i < subElements.length; ++i) {
            var element = subElements[i];

            var after = element.after;
            if(after !== undefined && after !== null){
                var afterElement = getByID(after);
                if(alreadyCalculated(afterElement)){
                    time(element, afterElement.finished);
                }else {
                    afterElements.push(element);
                }
            }else {
                startAt = time(element, startAt);
            }
        }

        if(afterElements.length > 0){
            calculate(afterElements, startAt);
        }
    };

    var time = function(element, startAt){
        var ratio = element.dom.attr("prlx-ratio");

        var data_start = element.dom.attr("prlx-start");
        var data_end = element.dom.attr("prlx-end");
        var finishAt = startAt + (config.frameCount * ratio);

        element.dom.attr("data-" + startAt + "-start", data_start);
        element.dom.attr("data-" + finishAt + "-start", data_end);

        element.finished = finishAt;
        return finishAt;
    };

    return {
        init: init
    };

}();