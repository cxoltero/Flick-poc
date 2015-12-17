
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

            if(counter <= amount-1){
                removeCurrentAddActive(items);
                removeActiveAddCurrent(items.nextSibling);
            }else if(counter === amount){
                removeCurrentAddActive(items);
                items = document.getElementById('img0');
                removeActiveAddCurrent(items);
                counter=0;
            }
            navigate(0);
        });
        prev.addEventListener("click", function(){
            items = document.getElementById('img'+counter);

            if(counter > 0){
                counter = counter-1;
                removeCurrentAddActive(items);
                removeActiveAddCurrent(items.previousSibling);
            }else if(counter === 0){
                items = document.getElementById('img'+counter);
                removeCurrentAddActive(items);
                counter = amount-1;
                items = document.getElementById('img'+counter);
                removeActiveAddCurrent(items);
            }
            navigate(-1);
        });
    }
    function photoData(pics, myResp){
        /**
         * @param myResp          Information about the object.
         * @param myResp.photos   Information about the object's members.
         * @param myResp.photos.photo   Information about the object's members.
         * @param myResp.photos.photo.farm   Information about the object's members.
         * @param myResp.photos.photo.server   Information about the object's members.
         * @param myResp.photos.photo.secret   Information about the object's members.
         */
        var farm, server, id, secret, picUrl;

        for(var i=0; i< myResp.photos.photo.length; i++){
            farm = myResp.photos.photo[i].farm;
            server = myResp.photos.photo[i].server;
            id = myResp.photos.photo[i].id;
            secret = myResp.photos.photo[i].secret;
            picUrl = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_z.jpg";
            pics.push(picUrl);
        }
    }
    function pupulate(pics){
        for(var j=0; j<pics.length; j++){
            var list = document.getElementById('list');
            for(j = 0; j<pics.length; j++){
                list.innerHTML = list.innerHTML + "<li class= 'active' id='img"+[j]+"'><img src='" + pics[j] + "' /></li>";
            }
        }
    }
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