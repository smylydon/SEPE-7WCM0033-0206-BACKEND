var models = require('../models');
var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromise = require('chai-as-promised');
var expect = chai.expect;
var should = chai.should();

chai.use(chaiAsPromise);

describe('sequelize Model Tests', function() {
  var User;

  describe('User Model', function() {
    beforeEach(function() {
      User = models.User;
    });

    afterEach(function() {
      User = null;
    });

    it('should find a user with credentials email=guest@abc.com and password=password', function(done) {
      var user = {
        email: 'guest@abc.com',
        password: 'password'
      };

      User.findOne({
        where: user
      }).then(function(user) {
        expect(user.email).to.equal('guest@abc.com');
        expect(user.password).to.equal('password');
        done();
      });
    });

    xit('should not find a user with credentials email=xguest@abc.com and password=password', function(done) {
      var user = {
        email: 'guest@abc.com',
        password: 'password'
      };

      User.findOne({
        where: user
      }).then(function(user) {
        expect(false).to.equal(true);
        done();
      }).catch(function(error) {
        expect(true).to.be.true;
        done();
      });
    });
  })

});
