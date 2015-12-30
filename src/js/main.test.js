var expect = chai.expect;

describe('Test Suite', function(){
    var spy;
    beforeEach(function(){
        spy = sinon.spy(jQuery, 'getJSON');
    });
    afterEach(function(){
        spy.restore();
    });

    it('should pass', function(){
        expect(true).to.equal(true);
    });
});
