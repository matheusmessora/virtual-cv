var PARALLUX = PARALLUX || {};

PARALLUX.SYSTEM = function () {

    var finished = false;
    var elements = [];
    var sectionElements = [];
    var config = {
        frameCount: 200
    };

    var init = function(config){
        this.config = config;

        getAll();
        getNexts(0);
        print(elements);

        elements[0].finished = 1;
        calculate(elements, 1, 0);

        print(sectionElements);
        calculate(sectionElements, 1, 1);
    };



    var getAll = function(){
        $( ".prlx" ).each(function( index ) {
            var jElement = $(this);

            elements.push({
                id: jElement.attr("id"),
                dom: jElement,
                after: []
            });
        });
    };

    var getNexts = function(section) {
        var previous = null;
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];

            var next = getNext(element.dom, section);
            if(next !== undefined){
                element.after.push(next);
            }

            if(isLinked(element)){
                element.after.push(getNext(element.dom, 1));
                sectionElements.push(element);
            }

            previous = element.id;
        }
    };

    var isLinked = function(element){
        return element.dom.hasClass("prlx-linked");
    };

    var getNext = function(domElement, section) {
        var attr;
        if(section === 0){
            attr = domElement.attr("prlx-after");
        }else {
            attr = domElement.attr("prlx-after-" + section);
        }
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


    var print = function(elements){
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            console.log(element);

        }
    };

    var alreadyCalculated = function(element){
        var already = element.finished !== undefined;
        return already;
    };

    var calculate = function(subElements, startAt, section){
        var afterElements = [];
        for (var i = 0; i < subElements.length; ++i) {
            var element = subElements[i];

            var after = element.after[section];
            if(after !== undefined && after !== null){
                var afterElement = getByID(after, section);
                if(alreadyCalculated(afterElement)){
                    time(element, afterElement.finished, section);
                }else {
                    afterElements.push(element);
                }
            }else {
                startAt = time(element, startAt, section);
            }
        }

        if(afterElements.length > 0){
            calculate(afterElements, startAt, section);
        }
    };

    var time = function(element, startAt, section){
        if(section === 0){
            var ratio = element.dom.attr("prlx-ratio");

            var data_start = element.dom.attr("prlx-start");
            var data_end = element.dom.attr("prlx-end");
            var finishAt = startAt + (config.frameCount * ratio);

            element.dom.attr("data-" + startAt + "-start", data_start);
            element.dom.attr("data-" + finishAt + "-start", data_end);

            element.finished = finishAt;
            return finishAt;
        }else {
            var ratio = element.dom.attr("prlx-ratio-"+section);

            var data_start = element.dom.attr("prlx-start-"+section);
            var data_end = element.dom.attr("prlx-end-"+section);
            var finishAt = startAt + (config.frameCount * ratio);

            element.dom.attr("data-" + startAt + "-start", data_start);
            element.dom.attr("data-" + finishAt + "-start", data_end);

            element.finished = finishAt;
            return finishAt;
        }

    };

    return {
        init: init
    };

}();