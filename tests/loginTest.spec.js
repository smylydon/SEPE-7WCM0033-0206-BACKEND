var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromise = require('chai-as-promised');
var expect = chai.expect;
var should = chai.should();

chai.use(chaiAsPromise);

describe('Authentication Controller Tests', function() {
    var Person, req, res, loginController;

    beforeEach(function() {
        var dummy = function() {};
        Person = {
            findOne: dummy,
            then: dummy,
            catch: dummy,
        }
        sinon.stub(Person);
        Person.findOne.returns(Person);
        Person.then.returns(Person);

        req = {};
        res = {
            status: dummy,
            send: dummy,
            json: dummy
        };

        sinon.stub(res);
        res.status.returns(res);
        loginController = require('../controllers/loginController')(Person);
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
            loginController.login(req, res);
            expect(Person.findOne.called).to.be.true;
            expect(Person.then.called).to.be.true;
            expect(Person.catch.called).to.be.true;
        });
    })

});
