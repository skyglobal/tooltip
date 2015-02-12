document.body.innerHTML = __html__['_site/index.html'];
function appendCSS(fileObj){
    var  link = document.createElement('link'); link.rel = 'stylesheet'; link.href='base/' + fileObj.path;  document.body.appendChild(link)
}
appendCSS({path: '_site/styles/demo.css'});
appendCSS({path: '_site/styles/tooltip.css'});

var tooltip = skyComponents['tooltip'];

describe('tooltip module can ', function () {

    it('sum an array of numbers', function () {

        expect(tooltip.sum([1,2,3])).toBe(6);

    });

});