let expect = require('chai').expect;
let should = require('chai').should();
let sinon = require('sinon');
const { assert } = require('chai');
 
describe('MyAPI', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
 
    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });
 
  afterEach(function() {
    this.xhr.restore();
  });
 
  //Tests etc. go here

  it('should be true', () => {
      let thing = true;

      assert.equal(true, thing);
  })

});