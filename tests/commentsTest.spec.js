var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromise = require('chai-as-promised');
var expect = chai.expect;
var should = chai.should();

chai.use(chaiAsPromise);

describe('Comments Controller Tests', function() {
    var aComment, Comment, req, res, commentsController;

    beforeEach(function() {
        var dummy = function() {};
        aComment = {
            'name': 'Guest User',
            email: 'guest@abc.com',
            subject: 'Test',
            message: 'Testing test'
        };
        Comment = {
            create: dummy,
            findOne: dummy,
            findAll: dummy,
            then: dummy,
            catch: dummy,
        }
        sinon.stub(Comment);
        Comment.create.returns(Comment);
        Comment.findOne.returns(Comment);
        Comment.findAll.returns(Comment);
        Comment.then.returns(Comment);

        req = {};
        res = {
            status: dummy,
            send: dummy,
            json: dummy
        };

        sinon.stub(res);
        res.status.returns(res);
        commentsController = require('../controllers/commentsController')(Comment);
    });

    afterEach(function() {
        Comment = null;
    });

    it('should be possible to save a comment to the DBMS', function() {
        req.body = aComment;
        commentsController.save(req, res);
        expect(Comment.create.called).to.be.true;
        expect(Comment.then.called).to.be.true;
        expect(Comment.catch.called).to.be.true;
    });

    it('should be possible to retrieve all comments from the DBMS', function() {
        req.body = {};
        commentsController.get(req, res);
        expect(Comment.findAll.called).to.be.true;
        expect(Comment.then.called).to.be.true;
        expect(Comment.catch.called).to.be.true;
    });

});
