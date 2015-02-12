document.body.innerHTML = __html__['_site/index.html'];
function appendCSS(fileObj){
    var  link = document.createElement('link'); link.rel = 'stylesheet'; link.href='base/' + fileObj.path;  document.body.appendChild(link)
}
appendCSS({path: '_site/styles/demo.css'});
appendCSS({path: '_site/styles/tooltip.css'});

var tooltip = skyComponents['tooltip'];
var $ = require('../../bower_components/jquery/dist/jquery.js');

describe('tooltip module can ', function () {


    var describeSpec = 'Tooltip shows and disappears';

    describe(describeSpec, function () {

        it('Tooltip shows on mouse over', function (done) {
            expect($('#demo-tooltip .tooltip-content').is(":visible")).toBe(false);
            $('#demo-tooltip').trigger('mouseenter');
            setTimeout(function() {
                expect($('#demo-tooltip .tooltip-content').is(":visible")).toBe(true);
                expect($('#demo-tooltip .tooltip-content').css('display')).toBe('block');
                done();
            }, 600);
        });

        it('Tooltip disappears on mouse leave with a minimum visible time', function (done) {
            $('#demo-tooltip').trigger('mouseenter');
            setTimeout(function() {
                $('#demo-tooltip').trigger('mouseleave');
                setTimeout(function() {
                    expect($('#demo-tooltip .tooltip-content').is(":visible")).toBe(false);
                    done();
                }, 600);
            }, 600);
        });

        it('Tooltip shows on touch', function (done) {
            expect($('#demo-tooltip .tooltip-content').is(":visible")).toBe(false);
            $('#demo-tooltip').trigger('touchstart');
            setTimeout(function() {
                expect($('#demo-tooltip .tooltip-content').is(":visible")).toBe(true);
                expect($('#demo-tooltip .tooltip-content').css('display')).toBe('block');
                done();
            }, 600);
        });

    });

    return describeSpec;

});