(function() {
    function loadPics() {
        var api_key = '74e47a159e15cbcb6139ba9c9df64c13';
        var secret = 'c73c5dcbac8e4a96';
        var method = "flickr.photos.search";
        var user_id = "138698049@N03";
        var format = '&format=json';
        var url = "https://api.flickr.com/services/rest"+"?method="+method+"&api_key="+api_key+"&user_id="+user_id+format+'&nojsoncallback=1';

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            var farm, server, id, title, secret, picUrl, list, img, items;

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var pics = [];
                var myResp = JSON.parse(xmlhttp.response);

                for(var i=0; i< myResp.photos.photo.length; i++){
                    farm = myResp.photos.photo[i].farm;
                    server = myResp.photos.photo[i].server;
                    id = myResp.photos.photo[i].id;
                    title = myResp.photos.photo[i].title;
                    secret = myResp.photos.photo[i].secret;
                    picUrl = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_z.jpg";
                    pics.push(picUrl);
                }
                populate(pics);

                items = document.getElementById('img0');
                items.classList.remove('active');
                items.classList.add('current');

                getCarousel();
            }
        };
        xmlhttp.open("Get", url, true);
        xmlhttp.send();
    }


    function populate(pics){
        for(var i=0; i<pics.length; i++){
            list = document.getElementById('list');
            img = '';
            for(var i = 0; i<pics.length; i++){
                list.innerHTML = list.innerHTML + '<li class='+'active'+ ' id=img'+[i]+'><img src=' + pics[i] + ' /></li>';
            }
        }
    }

    function getCarousel(){
        var box = document.getElementsByClassName('image-slider-wrapper');
        var next = document.getElementById('next');
        var counter = 0;
        var prev = document.getElementById('prev');
        var items = document.getElementsByTagName('img');
        var amount = items.length;
        var current = document.getElementsByClassName('current');

        function navigate(direction){
            if(direction === 1){
                items = document.getElementById('img'+counter);
                current = document.getElementsByClassName('current');
                items.classList.remove('current');
                items.classList.add('active');
            }

        }
        next.addEventListener("click", function(event){
            items = document.getElementById('img'+counter);
            counter = counter+1;

            if(counter <= amount-1){
                items.classList.remove('current');
                items.classList.add('active');
                items.nextSibling.classList.remove('active');
                items.nextSibling.classList.add('current');
            }else if(counter === amount){
                items.classList.remove('current');
                items.classList.add('active');
                items = document.getElementById('img0');
                items.classList.remove('active');
                items.classList.add('current');
                counter=0;
            }
            navigate(0);
        });
        prev.addEventListener("click", function(event){
            items = document.getElementById('img'+counter);

            if(counter < 0){
                counter = counter-1;
                items.classList.remove('current');
                items.classList.add('active');
                items.previousSibling.classList.remove('active');
                items.previousSibling.classList.add('current');
            }else if(counter === 0){
                items = document.getElementById('img'+counter);
                items.classList.remove('current');
                items.classList.add('active');
                counter = amount-1;
                items = document.getElementById('img'+counter);
                items.classList.remove('active');
                items.classList.add('current');
            }
            navigate(0);
        });
    };

    window.onload = function execute(){
        loadPics();
    };
})();