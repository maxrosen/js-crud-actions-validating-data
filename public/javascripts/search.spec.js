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
  });

  it('should test something', function(done) {
    done();
  });

  it('should parse the fetched response data as JSON', function(done) {
    const db = {
        "products": [
          {
            "name": "Essential Backpack",
            "price": 259.99,
            "quantity": 5,
            "color": "orange",
            "id": "0124081a-4daa-425a-bb40-d5c016893fe3",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Risus quis varius quam quisque. Quis risus sed vulputate odio. Ultrices eros in cursus turpis. Est velit egestas dui id ornare arcu. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Dictumst quisque sagittis purus sit amet volutpat. Sed libero enim sed faucibus turpis in eu. Dui vivamus arcu felis bibendum ut tristique et egestas."
          }
        ]
      };
    var dataJson = JSON.stringify(db);

    axios.get(`/api/products/search?keywords=${textValue}`)
    .then(showResults);
   
    // myapi.get(function(err, result) {
    //   result.should.deep.equal(db);
    //   done();
    // });
   
    this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
  });

});