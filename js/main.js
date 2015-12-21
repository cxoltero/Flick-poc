
(function(){
    "use strict";

    (function loadPics(){
        var api_key = '74e47a159e15cbcb6139ba9c9df64c13';
        var method = "flickr.photos.search";
        var user_id = "138698049@N03";
        var format = '&format=json';
        var url = "https://api.flickr.com/services/rest"+"?method="+method+"&api_key="+api_key+"&user_id="+user_id+format+'&nojsoncallback=1';

        $.getJSON(url, function(data){
            if (data) {
                createDomElm(data);
            }
        });
        function createDomElm(data){
            var farm, server, id, title, secret, picUrl, img;

            for(var i=0; i< data.photos.photo.length; i++){
                farm = data.photos.photo[i].farm;
                server = data.photos.photo[i].server;
                id = data.photos.photo[i].id;
                title = data.photos.photo[i].title;
                secret = data.photos.photo[i].secret;
                picUrl = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_z.jpg";
                $('.image-slider-wrapper ul').append("<li class='active imgArray' ><a data-lightbox='image-set'" + " href='" + picUrl + "'><img class='active' "+ " src='" +picUrl+"'/></a></li>");
            }
        }
    })();
})();