<<<<<<< 3d07bc1e12eaafafd63a7796b73f74b7a7c7e6e6
$(document).ready(function(){
=======
<<<<<<< 2ba1bdaef0ed92a4ff25c0dd63c3b6f017251ce5

(function(){
>>>>>>> cleaned code, just need to figure out how to style original pictures
    "use strict";
=======
(function(){
    function loadPics(){
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
        };
        xmlhttp.open("Get", url, true);
        xmlhttp.send();
    }
    function getCarousel(){
        var next, counter, prev, items, amount, current;

        next = document.getElementById('next');
        counter = 0;
        prev = document.getElementById('prev');
        items = document.getElementsByTagName('img');
        amount = items.length;
        current = document.getElementsByClassName('current');

        function navigate(direction){
            if(direction === 1){
                items = document.getElementById('img'+counter);
                current = document.getElementsByClassName('current');
                removeCurrentAddActive(items);
            }
        }
        next.addEventListener("click", function(){
            items = document.getElementById('img'+counter);
            counter = counter+1;
>>>>>>> cleaned code, just need to figure out how to style original pictures

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
});
