(function(){
    (function loadPics(){
        //supplied values from flickr
        var api_key = '74e47a159e15cbcb6139ba9c9df64c13';
        var secret = 'c73c5dcbac8e4a96';
        var method = "flickr.photos.search";
        var user_id = "138698049@N03";
        var format = '&format=json';
        var url = "https://api.flickr.com/services/rest"+"?method="+method+"&api_key="+api_key+"&user_id="+user_id+format+'&nojsoncallback=1';




        $.getJSON(url, function(data){
            var items = [];
            var farm, server, id, title, secret, picUrl, list, img, items;

            if (data) {
                for(var i=0; i< data.photos.photo.length; i++){
                    farm = data.photos.photo[i].farm;
                    server = data.photos.photo[i].server;
                    id = data.photos.photo[i].id;
                    title = data.photos.photo[i].title;
                    secret = data.photos.photo[i].secret;
                    picUrl = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_z.jpg";
                    $('.image-slider-wrapper ul').append("<li class='active' ><a class='lightbox' data-lightbox=image-set"+" href='" + picUrl + "'><img class='active' "+ " src='" +picUrl+"'/></a></li>");
                }
            }
        });
    })();
    function removeActiveAddCurrent(items){
        items.classList.remove('active');
        items.classList.add('current');
    }
    function removeCurrentAddActive(items){
        items.classList.remove('current');
        items.classList.add('active');
    }
    window.onload = loadPics();
})();