(function() {
    //supplied values from flickr
    var api_key = '74e47a159e15cbcb6139ba9c9df64c13';
    var secret = 'c73c5dcbac8e4a96';
    var method = "flickr.photos.search";
    var user_id = "138698049@N03";
    var format = '&format=json';
    var url = "https://api.flickr.com/services/rest"+"?method="+method+"&api_key="+api_key+"&user_id="+user_id+format+'&nojsoncallback=1';

    //required values for oauth
    //var oauth_nonce = makeNonce();
    //var oauth_timestamp = Math.round((new Date()).getTime() / 1000);
    //var oauth_consumer_key = api_key;
    //var oauth_signature_method= "HMAC-SHA1";
    //var oauth_signature = '';



    function loadPics() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //make an empty array
                var pics = [];

                //parse request to json
                var myResp = JSON.parse(xmlhttp.response);

                //console.log(myResp);

                for(var i=0; i< myResp.photos.photo.length; i++){
                    pics.push(myResp.photos.photo[i]);
                }
                console.log(pics);
            }
            return pics;
        };

        xmlhttp.open("Get", url, true);
        xmlhttp.send();

    }
    loadPics();

    //function to create an oauth_nounce
    //function makeNonce()
    //{
    //    var text = "";
    //    var possible = "0123456789";
    //
    //    for( var i=0; i < 8; i++ )
    //        text += possible.charAt(Math.floor(Math.random() * possible.length));
    //
    //    return text;
    //}
})();