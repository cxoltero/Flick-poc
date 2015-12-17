(function(){
    (function loadPics(){
        var api_key, method, user_id, format, url;

        api_key = '74e47a159e15cbcb6139ba9c9df64c13';
        method = "flickr.photos.search";
        user_id = "138698049@N03";
        format = '&format=json';
        url = "https://api.flickr.com/services/rest"+"?method="+method+"&api_key="+api_key+"&user_id="+user_id+format+'&nojsoncallback=1';

        $.getJSON(url, function(data){
            var farm, server, id, title, secret, picUrl, img;
            if (data) {
                createDomElm(data);
                addActiveclass();
            }
        });

        function createDomElm(data){
            for(var i=0; i< data.photos.photo.length; i++){
                farm = data.photos.photo[i].farm;
                server = data.photos.photo[i].server;
                id = data.photos.photo[i].id;
                title = data.photos.photo[i].title;
                secret = data.photos.photo[i].secret;
                picUrl = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_z.jpg";
                $('.carousel-inner').append("<div class='item' ><img src='" +picUrl+"'/></div>");
            }
        }
        function addActiveclass(){
            $('.carousel').carousel({
                interval:3000
            });
            $(".item:first-child").addClass('active');
        };
    })();

})();