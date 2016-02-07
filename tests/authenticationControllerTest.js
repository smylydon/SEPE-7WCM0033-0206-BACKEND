var sinon = require('sinon');

describe('Authentication Controller Tests', function() {
  var User, req, res;

  beforeEach(function() {
    User = require('./../models/User');
    res = {
      status: sinon.spy(),
      send: sinon.spy()
    }
  });

  afterEach(function() {
    User = null;
  });

  describe('Post', function() {
    it('should all an authentication post', function() {

    });
  })

});
