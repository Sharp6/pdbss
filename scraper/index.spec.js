'use strict';
const scraper = require('./index');

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('Scraper module', () => {  
    it('exports a function', () => {
        expect(scraper).to.be.a('function');
    });
    
    describe('when called', () => {
        it('returns a promise', () => {
            expect(scraper()).to.be.a('promise');
        });

        describe('when resolved', () => {
            var result; 

            beforeEach(() => {
                result = scraper();
            }); 

            it('is an array', () => {
                return expect(result).to.eventually.be.an('array');
            }); 
        });
    });
});