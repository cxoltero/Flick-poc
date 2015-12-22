(function($){
    "use strict";

    $(document).ready(function(){
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
                var farm, server, id, title, secret, picUrl, img, currentPhoto;

                for(var i=0; i< data.photos.photo.length; i++){
                    currentPhoto = data.photos.photo[i];

                    farm = currentPhoto.farm;
                    server = currentPhoto.server;
                    id = currentPhoto.id;
                    title = currentPhoto.title;
                    secret = currentPhoto.secret;
                    picUrl = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_z.jpg";
                    $('.image-slider-wrapper ul').append("<li class='active imgArray' ><a data-lightbox='image-set'" + " href='" + picUrl + "'><img class='active' "+ " src='" +picUrl+"'/></a></li>");
                }
            }
        })();
    });
})(jQuery);