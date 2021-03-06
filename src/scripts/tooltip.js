var version  = require('./utils/version.js');
var core = require('../../bower_components/bskyb-core/src/scripts/core');
var detect = core.detect;
var event = core.event;

function bindEvents() {
    event.live("mouseenter mouseleave", "[data-tooltip]", hover)
    event.live("click", "[data-tooltip] .tooltip-content", preventClicksToParent)
    event.live("touchstart", "[data-tooltip]", toggleTooltip)
}

function toggleTooltip(event) {
    event.preventDefault();
    var tooltip = this.querySelector(".tooltip-content") || this.querySelector(".tooltip__content");
    tooltip.classList.toggle('tooltip--show');
    tooltip.classList.toggle('tooltip--fade');
}

function preventClicksToParent(event) {
    event.preventDefault();
    event.stopPropagation();
}

function hover(event) {
    //todo: remove reference to .tooltip-content n v1.0.0
    var tooltip = this.querySelector(".tooltip-content") || this.querySelector(".tooltip__content");
    if (!tooltip) return;
    clearTimeout(tooltip.dataset['entry']);
    clearTimeout(tooltip.dataset['exit']);
    if (event.type == 'mouseenter') {
        if (tooltip.innerText !== "") {
            show(tooltip);
        }
    } else {
        hide(tooltip);
    }
}

function position(tooltip) {
    if (!detect.elementVisibleBottom(tooltip)){
        tooltip.classList.add('tooltip--top')
    } else {
        tooltip.classList.remove('tooltip--top')
    }
}

function show(tooltip) {
    var timeout = setTimeout(function () {
        tooltip.classList.add('tooltip--show');
        setTimeout(function() {
            tooltip.classList.add('tooltip--fade');
            position(tooltip);
        }, 15);
    }, 500);
    tooltip.dataset['entry'] = timeout;
}

function hide(tooltip) {
    var timeout = setTimeout(function () {
        tooltip.classList.remove('tooltip--fade');
        setTimeout(function() {
            tooltip.classList.remove('tooltip--show');
            tooltip.classList.remove('tooltip--top');
        }, 250);
    },300)
    tooltip.dataset['exit'] = timeout;
}

bindEvents();


module.exports = {
    version: version
};

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents['tooltip'] = module.exports;