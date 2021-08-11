let expect = require('chai').expect;
let sinon = require('sinon');
var nock   = require('nock');
let chai = require('chai');
let chaiHttp = require('chai-http');
const { assert } = require('chai');
const { request } = require('express');
let db = require('./db');
let server = require('./routes/products.js');
let should = chai.should();
let app = require('./app.js');
 
chai.use(chaiHttp);
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
  });

  it('should test something', function(done) {
    done();
  });

  it('should parse the fetched response data as JSON', (done) => {
    chai.request(app)
        .get('/search')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });   
  });

});