var expect = chai.expect;

describe('Test Suite', function(){
    it('should pass', function(){
        expect(true).to.equal(true);
    })

    //var spy;
    //beforeEach(function(){
    //    spy = sinon.spy(jQuery, 'getJSON');
    //});
    //afterEach(function(){
    //    spy.restore();
    //});
    //
    //it('should pass', function(){
    //    expect(true).to.equal(true);
    //});
    //
    //describe("getImages", function(){
    //    it("should connect to flickr api", function(done){
    //        loadPics(), function(html){
    //            console.log("this is the spy "+spy)
    //            expect(html).to.be.ok;
    //        };
    //        done();
    //    })
    //});
    //
    //describe('formUrl', function(){
    //    var url, api_key, method, user_id, format;
    //
    //    it('will return a string', function(){
    //        url = formUrl();
    //        expect(typeof(url)).to.equal('string');
    //    });
    //    it('will not be empty', function(){
    //        expect(url).to.not.be.empty;
    //    });
    //    it('should concatenate all the values inside', function(){
    //        expect(url).to.equal('https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=74e47a159e15cbcb6139ba9c9df64c13&user_id=138698049@N03&format=json&nojsoncallback=1')
    //    });
    //});
    //
    //describe('addImgtoObject', function(){
    //
    //    it('will append a passed url into the images div element',function(){
    //        var imgElement = $('#images');
    //
    //    })
    //})

});
