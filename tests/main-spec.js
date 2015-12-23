QUnit.test("form should not return empty", function(assert) {
    var url = formUrl();

    assert.notEqual(url, undefined,  "url should not be undefined");
    assert.notEqual(url, null, "should not be null");
    assert.notEqual(url, '', "should not be empty");
})

//QUnit.test('get imgUrl should not be empty', function(assert){
//    var url = formUrl();
//    $.getJSON(url, function(data){
//        if (data) {
//            imgUrl(data);
//        }
//    });
//    console.log()
//
//    assert.notEqual(url, undefined,  "url should not be undefined");
//    assert.notEqual(url, null, "should not be null");
//    assert.notEqual(url, '', "should not be empty");
//})