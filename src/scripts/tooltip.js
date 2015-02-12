var version  = require('./utils/version.js');
var $ = require('../../bower_components/jquery/dist/jquery.js');
var core = require('../../bower_components/bskyb-core/src/scripts/core');
var detect = core.detect;



function bindEvents() {
    ($(document)).on("mouseenter mouseleave", "[data-tooltip]", hover);

    ($(document)).on("click", "[data-tooltip] .tooltip-content", preventClicksToParent);

    ($(document)).on("touchstart", "[data-tooltip]", toggleTooltip);
}

function toggleTooltip(event) {
    event.preventDefault();

    var $tooltipContent = $(this).find(".tooltip-content");

    $(this).find(".tooltip-content").toggleClass('show fade');
}

function preventClicksToParent(event) {
    event.preventDefault();
    event.stopPropagation();
}

function hover(event) {
    var $hoveredElement = $(this),
        $tooltip = $hoveredElement.find('.tooltip-content');
    clearTimeout($tooltip.attr('data-tooltip-entry-timeout'));
    clearTimeout($tooltip.attr('data-tooltip-exit-timeout'));
    if (event.type == 'mouseenter') {
        if ($tooltip.text() !== "") {
            show($tooltip);
        }
    } else {
        hide($tooltip);
    }
}

function position($tooltip) {
    $tooltip.toggleClass("top", !detect.elementVisibleBottom($tooltip[0]));
}

function show($tooltip) {
    $tooltip.attr('data-tooltip-entry-timeout', setTimeout(function () {
        $tooltip.addClass('show');
        setTimeout(function() {
            $tooltip.addClass('fade');
            position($tooltip);
        }, 15);
    }, 500));
}

function hide($tooltip) {
    var transitionDuration=250;
    $tooltip.attr('data-tooltip-exit-timeout', setTimeout(function () {
        $tooltip.removeClass('fade');
        setTimeout(function() {
            $tooltip.removeClass('show top');
        }, transitionDuration);
    },300));

}

bindEvents();

module.exports = {
    version: version
};

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents['tooltip'] = module.exports;