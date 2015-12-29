 QUnit.test("jQuery should exist", function (assert) {
     assert.ok(jQuery, "there is jquery inside the code");
 });

 QUnit.test("jQuery.getJSON should be called", function (assert) {
     var spy = sinon.spy(jQuery, 'getJSON');

     assert.ok(spy.called, "getJSON has been called at least once in the code");
 });

 QUnit.test("getJSON should be called only once within the code", function (assert) {
     var spy = sinon.spy(jQuery, 'getJSON');

     assert.equal(spy.callCount, 1, 'there must be only one call to getJSON')
     console.log(spy.callCount);
     assertTrue(spy);
 });

 QUnit.test("jQuery.getJSON should be called with the correct URL", function (assert) {

        assert.equal(spy.callCount, 1, "ajax has been called exactly once in the document");

        loadPics();

        var spyUrl = spy1.args[0][0]['url'];


        assert.ok(spy1, "there is at least one ajax call inside the code");
        assert.equal(typeof(spy1.args), 'object', "the function must return an object")
        assert.equal(spy1.callCount, 1, "function  has been called exactly once in the document");
        assert.equal(spyUrl, formUrl(), "must call with correct url")
});


QUnit.test("formUrl should not return empty", function(assert) {
    expect(3);
    var url = formUrl();

    assert.notEqual(url, undefined,  "url should not be undefined");
    assert.notEqual(url, null, "should not be null");
    assert.notEqual(url, '', "should not be empty");

    assert.jQuery.getJSON.hasBeenCalledWith('flickr.url.here');
});

QUnit.test("url inside formUrl should  be a string from the sum of the provided values", function(assert){
    expect(2);
    var api_key = '74e47a159e15cbcb6139ba9c9df64c13';
    var method = "flickr.photos.search";
    var user_id = "138698049@N03";
    var format = '&format=json';
    var url = formUrl();

    assert.equal($.type(url), 'string', "url should be a string");
    assert.equal(url,
        "https://api.flickr.com/services/rest"+"?method="+method+"&api_key="+api_key+"&user_id="+user_id+format+'&nojsoncallback=1',
        "it should concatenate the url"
    )
});

QUnit.test("function should attach imageurl to images div", function(assert){
    expect(3);
    var fixture = $("#qunit-fixture");
    fixture.append('<div id="images"></div>');

    var images = $("#images");
    var img1 = "image1";
    var img2 = "image2";
    var img3 = "image3";

    addImgtoObject(img1);
    assert.equal(images.children().length, 1, "image one has been added");
    addImgtoObject(img2);
    assert.equal(images.children().length, 2, "image 2 has been added, now there ar two img elements");
    addImgtoObject(img3);
    assert.equal(images.children().length, 3, "image 3 has been added, now there ar three img elements");
});

QUnit.asyncTest("test should call api for object", function(assert){
    expect(5);

    var sampleJSON = {contentType: "text/json",
        status: "success",

        photos: {
            photo: [
                {
                    farm: 6,
                    id: "23780914905",
                    isfamily: 0,
                    isfriend: 0,
                    ispublic: 1,
                    owner: "138698049@N03",
                    secret: "0eb2a77a55",
                    server: "5764",
                    title: ""
                },
                {
                    farm: 1,
                    id: "23698470321",
                    isfamily: 0,
                    isfriend: 0,
                    ispublic: 1,
                    owner: "138698049@N03",
                    secret: "1d4dc255d0",
                    server: "693",
                    title: ""
                }
            ]
        }
    }

    $.mockjax({
        url: "/api/data",
        responseText : sampleJSON
    });

    $.getJSON('/api/data', function(res){
        if(res.status == "success"){

            createDomElm(res)

            assert.notEqual(res, undefined,  "response should not be undefined");
            assert.notEqual(res, null, "response should not be null");
            assert.notEqual(res, '', "response should not be empty");
            assert.equal(typeof(res),  "object", "the call returns an object");
            assert.ok(!$.isEmptyObject(res), "response is not empty");
        }else{
            console.log("There was an error loging your data;")
        }
    });
});