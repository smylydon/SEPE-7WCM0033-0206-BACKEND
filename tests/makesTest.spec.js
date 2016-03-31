var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromise = require('chai-as-promised');
var expect = chai.expect;
var should = chai.should();

chai.use(chaiAsPromise);

describe('Makes Controller Tests', function() {
    var aMake, Make, req, res, makesController;

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
        aMake = {
        };
        Make = {
            create: dummy,
            destroy: dummy,
            findOne: dummy,
            findAll: dummy,
            then: dummy,
            catch: dummy,
            update: dummy
        };
        sinon.stub(Make);
        Make.create.returns(Make);
        Make.findOne.returns(Make);
        Make.findAll.returns(Make);
        Make.then.returns(Make);
        Make.destroy.returns(Make);
        Make.update.returns(Make);

        req = {};
        res = {
            status: dummy,
            send: dummy,
            json: dummy
        };

        sinon.stub(res);
        res.status.returns(res);
        makesController = require('../controllers/makesController')(Make);
    });

    afterEach(function() {
        Make = null;
    });

    it('should be possible to save a make to the DBMS', function() {
        req.body = aMake;
        makesController.makesPost(req, res);
        expect(Make.create.called).to.be.true;
        expect(Make.then.called).to.be.true;
        expect(Make.catch.called).to.be.true;
        expect(Make.destroy.called).to.be.false;
        expect(Make.update.called).to.be.false;
    });

    it('should be possible to retrieve one make from the DBMS', function() {
        req.params = {id: 9};
        makesController.makesGet(req, res);
        expect(Make.findOne.called).to.be.true;
        expect(Make.then.called).to.be.true;
        expect(Make.catch.called).to.be.true;
        expect(Make.destroy.called).to.be.false;
        expect(Make.update.called).to.be.false;
    });

    it('should be possible to retrieve all makes from the DBMS', function() {
        req.params = {id: null};
        makesController.makesGetAll(req, res);
        expect(Make.findAll.called).to.be.true;
        expect(Make.then.called).to.be.true;
        expect(Make.catch.called).to.be.true;
        expect(Make.destroy.called).to.be.false;
        expect(Make.update.called).to.be.false;
    });

    it('should be possible to update a make to the DBMS', function() {
        aMake.id = 9;
        req.body = aMake;
        makesController.makesPut(req, res);
        expect(Make.create.called).to.be.false;
        expect(Make.then.called).to.be.true;
        expect(Make.catch.called).to.be.true;
        expect(Make.destroy.called).to.be.false;
        expect(Make.update.called).to.be.true;
    });

    it('should be possible to delete a make from the DBMS', function() {
        req.params = {id: 9};
        makesController.makesDelete(req, res);
        expect(Make.findAll.called).to.be.false;
        expect(Make.then.called).to.be.true;
        expect(Make.catch.called).to.be.true;
        expect(Make.destroy.called).to.be.true;
        expect(Make.update.called).to.be.false;
    });
});
