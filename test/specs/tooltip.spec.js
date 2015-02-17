document.body.innerHTML = __html__['_site/index.html'];
function appendCSS(fileObj){
    var  link = document.createElement('link'); link.rel = 'stylesheet'; link.href='base/' + fileObj.path;  document.body.appendChild(link)
}
appendCSS({path: '_site/styles/demo.css'});
appendCSS({path: '_site/styles/tooltip.css'});

var tooltip = skyComponents['tooltip'];
var core = require('../../bower_components/bskyb-core/src/scripts/core');
var event = core.event;
var detect = core.detect;

describe('tooltip module : ', function () {

    var demoTooltip = document.querySelector('#demo-tooltip')
    var demoTooltipContent = document.querySelector('#demo-tooltip .tooltip__content')

    it('Tooltip shows on mouse over', function (done) {
        expect(demoTooltipContent.classList.contains('tooltip--show')).toBe(false);
        event.trigger(demoTooltip, 'mouseenter');
        setTimeout(function() {
            expect(demoTooltipContent.classList.contains('tooltip--show')).toBe(true);
            expect(detect.css(demoTooltipContent,'display')).toBe('block');
            done();
        }, 600);
    });

    it('Tooltip disappears on mouse leave with a minimum visible time', function (done) {
        event.trigger(demoTooltip, 'mouseenter');
        setTimeout(function() {
            event.trigger(demoTooltip, 'mouseleave');
            setTimeout(function() {
                expect(demoTooltipContent.classList.contains('tooltip--show')).toBe(false);
                done();
            }, 600);
        }, 600);
    });

    it('Tooltip shows on touch', function (done) {
        expect(demoTooltipContent.classList.contains('tooltip--show')).toBe(false);
        event.trigger(demoTooltip, 'touchstart');
        setTimeout(function() {
            expect(demoTooltipContent.classList.contains('tooltip--show')).toBe(true);
            expect(detect.css(demoTooltipContent,'display')).toBe('block');
            done();
        }, 600);
    });


});