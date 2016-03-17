var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromise = require('chai-as-promised');
var expect = chai.expect;
var should = chai.should();

chai.use(chaiAsPromise);

describe('People Controller Tests', function() {
    var aPerson, Person, req, res, peopleController;

    beforeEach(function() {
        var dummy = function() {};
        var middleware = function(req, res, next) {
            next(req,res);
        };
        authentication = middleware;
        authorization = function() {
            return {
                authorize: function() {},
                authorization: middleware,
            };
        };
        aPerson = {
            'name': 'Guest User',
            email: 'guest@abc.com',
            subject: 'Test',
            message: 'Testing test'
        };
        Person = {
            create: dummy,
            destroy: dummy,
            findOne: dummy,
            findAll: dummy,
            then: dummy,
            catch: dummy,
            update: dummy
        };
        sinon.stub(Person);
        Person.create.returns(Person);
        Person.findOne.returns(Person);
        Person.findAll.returns(Person);
        Person.then.returns(Person);
        Person.destroy.returns(Person);
        Person.update.returns(Person);

        req = {};
        res = {
            status: dummy,
            send: dummy,
            json: dummy
        };

        sinon.stub(res);
        res.status.returns(res);
        peopleController = require('../controllers/peopleController')(Person);
    });

    afterEach(function() {
        Person = null;
    });

    it('should be possible to save a person to the DBMS', function() {
        req.body = aPerson;
        peopleController.peoplePost(req, res);
        expect(Person.create.called).to.be.true;
        expect(Person.then.called).to.be.true;
        expect(Person.catch.called).to.be.true;
        expect(Person.destroy.called).to.be.false;
        expect(Person.update.called).to.be.false;
    });

    it('should be possible to retrieve one person from the DBMS', function() {
        req.params = {id: 1};
        peopleController.peopleGet(req, res);
        expect(Person.findOne.called).to.be.true;
        expect(Person.then.called).to.be.true;
        expect(Person.catch.called).to.be.true;
        expect(Person.destroy.called).to.be.false;
        expect(Person.update.called).to.be.false;
    });

    it('should be possible to retrieve all people from the DBMS', function() {
        req.params = {id: null};
        peopleController.peopleGetAll(req, res);
        expect(Person.findAll.called).to.be.true;
        expect(Person.then.called).to.be.true;
        expect(Person.catch.called).to.be.true;
        expect(Person.destroy.called).to.be.false;
        expect(Person.update.called).to.be.false;
    });

    it('should be possible to update a person to the DBMS', function() {
        aPerson.id = 1;
        req.body = aPerson;
        peopleController.peoplePut(req, res);
        expect(Person.create.called).to.be.false;
        expect(Person.then.called).to.be.true;
        expect(Person.catch.called).to.be.true;
        expect(Person.destroy.called).to.be.false;
        expect(Person.update.called).to.be.true;
    });

    it('should be possible to delete a person from the DBMS', function() {
        req.params = {id: 1};
        peopleController.peopleDelete(req, res);
        expect(Person.findAll.called).to.be.false;
        expect(Person.then.called).to.be.true;
        expect(Person.catch.called).to.be.true;
        expect(Person.destroy.called).to.be.true;
        expect(Person.update.called).to.be.false;
    });
});
