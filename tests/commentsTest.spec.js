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
            destroy: dummy,
            findOne: dummy,
            findAll: dummy,
            then: dummy,
            catch: dummy,
            update: dummy
        }
        sinon.stub(Comment);
        Comment.create.returns(Comment);
        Comment.findOne.returns(Comment);
        Comment.findAll.returns(Comment);
        Comment.then.returns(Comment);
        Comment.destroy.returns(Comment);
        Comment.update.returns(Comment);

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
        commentsController.commentsPost(req, res);
        expect(Comment.create.called).to.be.true;
        expect(Comment.then.called).to.be.true;
        expect(Comment.catch.called).to.be.true;
        expect(Comment.destroy.called).to.be.false;
        expect(Comment.update.called).to.be.false;
    });

    it('should be possible to retrieve one comment from the DBMS', function() {
        req.params = { id: 1 };
        commentsController.commentsGet(req, res);
        expect(Comment.findOne.called).to.be.true;
        expect(Comment.then.called).to.be.true;
        expect(Comment.catch.called).to.be.true;
        expect(Comment.destroy.called).to.be.false;
        expect(Comment.update.called).to.be.false;
    });

    it('should be possible to retrieve all comments from the DBMS', function() {
        req.params = { id: null };
        commentsController.commentsGetAll(req, res);
        expect(Comment.findAll.called).to.be.true;
        expect(Comment.then.called).to.be.true;
        expect(Comment.catch.called).to.be.true;
        expect(Comment.destroy.called).to.be.false;
        expect(Comment.update.called).to.be.false;
    });

    it('should be possible to update a comment to the DBMS', function() {
        aComment.id = 1;
        req.body = aComment;
        commentsController.commentsPut(req, res);
        expect(Comment.create.called).to.be.false;
        expect(Comment.then.called).to.be.true;
        expect(Comment.catch.called).to.be.true;
        expect(Comment.destroy.called).to.be.false;
        expect(Comment.update.called).to.be.true;
    });

    it('should be possible to delete a comment from the DBMS', function() {
        req.params = { id: 1 };
        commentsController.commentsDelete(req, res);
        expect(Comment.findAll.called).to.be.false;
        expect(Comment.then.called).to.be.true;
        expect(Comment.catch.called).to.be.true;
        expect(Comment.destroy.called).to.be.true;
        expect(Comment.update.called).to.be.false;
    });
});
