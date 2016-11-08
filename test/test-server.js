var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on get', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });
    
    it('should add an item on post');
    it ('should error on post without body data');
    it ('should should error on post with invalid json');
    
    it('should edit an item on put');
    it('should error on put without id');
    it('should error on put with different id in endpoint and body')
    it('should error on put with non-existant id');
    it('should error on put without body data');
    it('should error on put with invalid json');
    
    it('should delete an item on delete');
    it('should error on delete an item not in the list');
    it('should error on delete without id');
});
