(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var state = { css: {} };
var html = document.documentElement;
var toolkitClasses = ["no-touch", "touch-device"];
var vendorPrefix = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
var classes = { hasNot: toolkitClasses[0], has: toolkitClasses[1] };

function attachClasses() {
    var arrClasses = html.className.split(' ');
    arrClasses.push(touch() ? classes.has : classes.hasNot);
    html.className = arrClasses.join(' ');
}

function translate3d() {
    var transforms = {
            'webkitTransform': '-webkit-transform',
            'OTransform': '-o-transform',
            'msTransform': '-ms-transform',
            'MozTransform': '-moz-transform',
            'transform': 'transform'
        },
        body = document.body || document.documentElement,
        has3d,
        div = document.createElement('div'),
        t;
    body.insertBefore(div, null);
    for (t in transforms) {
        if (transforms.hasOwnProperty(t)) {
            if (div.style[t] !== undefined) {
                div.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(div).getPropertyValue(transforms[t]);
            }
        }
    }
    body.removeChild(div);
    state.css.translate3d = (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    return state.css.translate3d;
}

function supportsCSS(property) {
    if (state.css[property]) {
        return state.css[property];
    }
    if (property === 'translate3d') {
        return translate3d(property);
    }
    var style = html.style;
    if (typeof style[property] == 'string') {
        state.css[property] = true;
        return true;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    for (var i = 0; i < vendorPrefix.length; i++) {
        if (typeof style[vendorPrefix[i] + property] == 'string') {
            state.css[property] = true;
            return state.css[property];
        }
    }
    state.css[property] = false;
    return state.css[property];
}

function css(el, property) {
    if (!property) {
        return supportsCSS(el);
    }
    var strValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        strValue = document.defaultView.getComputedStyle(el, "").getPropertyValue(property);
    } else if (el.currentStyle) {
        property = property.replace(/\-(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });
        strValue = el.currentStyle[property];
    }
    return strValue;
}

function touch() {
    state.touch = (typeof window.ontouchstart !== "undefined");
    return state.touch;
}

function getElementOffset(el) {
    return {
        top: el.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop,
        left: el.getBoundingClientRect().left + window.pageXOffset - document.documentElement.clientLeft
    };
}

function elementVisibleBottom(el) {
    if (el.length < 1)
        return;
    var elementOffset = getElementOffset(el);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    return (elementOffset.top + el.offsetHeight <= scrollTop + document.documentElement.clientHeight);
}

function elementVisibleRight(el) {
    if (el.length < 1)
        return;
    var elementOffset = getElementOffset(el);
    return (elementOffset.left + el.offsetWidth <= document.documentElement.clientWidth);
}

attachClasses();

module.exports = {
    _attachClasses: attachClasses,
    _state: state,
    css: css,
    touch: touch,
    elementVisibleBottom: elementVisibleBottom,
    elementVisibleRight: elementVisibleRight
};

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents.detect = module.exports;
},{}],2:[function(require,module,exports){
var utils = require('../utils/event-helpers');
var timeout = { resize: null };

function bindEvents() {
    on(window, 'resize', initResizeEnd);
}

function initResizeEnd() {
    clearTimeout(timeout.resize);
    timeout.resize = setTimeout(function triggerResizeEnd() {
        trigger(window, 'resizeend');
    }, 200);
}


function ready(exec) {
    if (/in/.test(document.readyState)) {
        setTimeout(function () {
            ready(exec);
        }, 9);
    } else {
        exec();
    }
}

function trigger(el, eventName) {
    utils.dispatchEvent(el, eventName);
}

function live(events, selector, eventHandler){
    events.split(' ').forEach(function(eventName){
        utils.attachEvent(eventName, selector, eventHandler);
    });
}

function off(el, eventNames, eventHandler) {
    eventNames.split(' ').forEach(function(eventName) {
        if (el.isNodeList) {
            Array.prototype.forEach.call(el, function (element, i) {
                utils.removeEventListener(element, eventName, eventHandler);
            });
        } else {
            utils.removeEventListener(el, eventName, eventHandler);
        }
    });
}

function on(el, eventNames, eventHandler, useCapture) {
    eventNames.split(' ').forEach(function(eventName) {
        if (el.isNodeList){
            Array.prototype.forEach.call(el, function(element, i){
                utils.addEventListener(element, eventName, eventHandler, useCapture);
            });
        } else {
            utils.addEventListener(el, eventName, eventHandler, useCapture);
        }
    });
}

bindEvents();

module.exports = {
    live: live,
    on: on,
    off: off,
    emit: trigger, //deprecate me
    trigger: trigger,
    ready: ready
};

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents.event = module.exports;

},{"../utils/event-helpers":4}],3:[function(require,module,exports){
var version  = require('./utils/version');
var event  = require('./api/event');
var detect  = require('./api/detect');

module.exports = {
    version: version,
    event: event,
    detect: detect
}

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents['version'] = version;
skyComponents['event'] = event;
skyComponents['detect'] = detect;
},{"./api/detect":1,"./api/event":2,"./utils/version":5}],4:[function(require,module,exports){
var eventRegistry = {};
var state = {    };
var browserSpecificEvents = {
    'transitionend': 'transition',
    'animationend': 'animation'
};
NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = true;

function capitalise(str) {
    return str.replace(/\b[a-z]/g, function () {
        return arguments[0].toUpperCase();
    });
}

function check(eventName) {
    var type = '';
    if (browserSpecificEvents[eventName]){
        eventName =  browserSpecificEvents[eventName];
        type = 'end';
    }
    var result = false,
        eventType = eventName.toLowerCase() + type.toLowerCase(),
        eventTypeCaps = capitalise(eventName.toLowerCase()) + capitalise(type.toLowerCase());
    if (state[eventType]) {
        return state[eventType];
    }
    ['ms', 'moz', 'webkit', 'o', ''].forEach(function(prefix){
        if (('on' + prefix + eventType in window) ||
            ('on' + prefix + eventType in document.documentElement)) {
            result = (!!prefix) ? prefix + eventTypeCaps : eventType;
        }
    });
    state[eventType] = result;
    return result;
}

function dispatchEvent(el, eventName){
    eventName = check(eventName) || eventName;
    var event;
    if (document.createEvent) {
        event = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
        event.initCustomEvent(eventName, false, false, null);
        el.dispatchEvent(event);
    } else {
        event = document.createEventObject();
        el.fireEvent('on' + eventName, event);
    }
}

function addEventListener(el, eventName, eventHandler, useCapture){
    eventName = check(eventName) || eventName;
    if (el.addEventListener) {
        el.addEventListener(eventName, eventHandler, !!useCapture);
    } else {
        el.attachEvent('on' + eventName, eventHandler);
    }
}

function removeEventListener(el, eventName, eventHandler){
    eventName = check(eventName) || eventName;
    if (el.removeEventListener) {
        el.removeEventListener(eventName, eventHandler, false);
    } else {
        el.detachEvent('on' + eventName, eventHandler);
    }
}

function dispatchLiveEvent(event) {
    var targetElement = event.target;

    eventRegistry[event.type].forEach(function (entry) {
        var potentialElements = document.querySelectorAll(entry.selector);
        var hasMatch = false;
        Array.prototype.forEach.call(potentialElements, function(el){
            if (el.contains(targetElement) || el === targetElement){
                hasMatch = true;
                return;
            }
        });

        if (hasMatch) {
            entry.handler.call(targetElement, event);
        }
    });

}

function attachEvent(eventName, selector, eventHandler){
    if (!eventRegistry[eventName]) {
        eventRegistry[eventName] = [];
        addEventListener(document.documentElement, eventName, dispatchLiveEvent, true);
    }

    eventRegistry[eventName].push({
        selector: selector,
        handler: eventHandler
    });
}


module.exports = {
    dispatchEvent: dispatchEvent,
    attachEvent: attachEvent,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
};
},{}],5:[function(require,module,exports){
module.exports = "0.1.1";
},{}],6:[function(require,module,exports){
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
},{"../../bower_components/bskyb-core/src/scripts/core":3,"./utils/version.js":8}],7:[function(require,module,exports){
var local = {}; local['tooltip'] = require('./tooltip');

if (typeof window.define === "function" && window.define.amd) {
    define('bower_components/bskyb-tooltip/dist/scripts/tooltip.requirejs', [], function() {
        'use strict';
        return local['tooltip'];
    });
}
},{"./tooltip":6}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}]},{},[7]);
