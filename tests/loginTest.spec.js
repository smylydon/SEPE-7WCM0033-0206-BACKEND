var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromise = require('chai-as-promised');
var expect = chai.expect;
var should = chai.should();

chai.use(chaiAsPromise);

describe('Authentication Controller Tests', function() {
  var User, req, res, authenticationController;

  beforeEach(function() {
    var dummy = function() {};
    User = {
      findOne: dummy,
      then: dummy,
      catch: dummy,
    }
    sinon.stub(User);
    User.findOne.returns(User);
    User.then.returns(User);

    req = {};
    res = {
      status: dummy,
      send: dummy,
      json: dummy
    };

    sinon.stub(res);
    res.status.returns(res);
    authenticationController = require('../controllers/authenticationController')(User);
  });

  afterEach(function() {
    User = null;
  });

  describe('Post', function() {
    it('should login a user with credentials email=guest@abc.com and password=password', function() {
      req.body = {
        email: 'guest@abc.com',
        password: 'password'
      };
      authenticationController.login(req, res);
      expect(User.findOne.called).to.be.true;
      expect(User.then.called).to.be.true;
      expect(User.catch.called).to.be.true;
    });
  })

});
