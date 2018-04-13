'use strict';

const expect = require('chai').expect,
    postcss = require('postcss'),
    jsdom = require('../src/jsdom'),
    uncss = require('../src/lib');

describe('uncss', () => {
    it('Report contains the correct information', (done) => {
        const cssStr = ['.stripped-selector { color: red; } p { color: green; }'];
        const options = { userAgent: 'Opera Mini' };
        const css = postcss.parse(cssStr);

        jsdom.fromSource( '<!DOCTYPE HTML><html><body><p>test</p></body></html>', options ).then((page) => {
            uncss([page], css, []).then((data) => {
                const report = data[1];
                expect(report.used).to.contain('p');
                expect(report.unused).to.contain('.stripped-selector');
                expect(report.all).to.contain('.stripped-selector');
                done();
            });
        })
    });
});
