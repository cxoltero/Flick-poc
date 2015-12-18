(function() {
    function loadPics() {
        var api_key, method, user_id, format, url, xmlhttp;

        api_key = '74e47a159e15cbcb6139ba9c9df64c13';
        method = "flickr.photos.search";
        user_id = "138698049@N03";
        format = '&format=json';
        url = "https://api.flickr.com/services/rest?method="+method+"&api_key="+api_key+"&user_id="+user_id+format+'&nojsoncallback=1';
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            var items;
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var pics = [];
                var myResp = JSON.parse(xmlhttp.response);
                photoData(pics, myResp);
                pupulate(pics);
                items = document.getElementById('img0');
                removeActiveAddCurrent(items);
                getCarousel();
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
    };
    function photoData(pics, myResp){
        var farm, server, id, secret, picUrl;

        for(var i=0; i< myResp.photos.photo.length; i++){
            farm = myResp.photos.photo[i].farm;
            server = myResp.photos.photo[i].server;
            id = myResp.photos.photo[i].id;
            secret = myResp.photos.photo[i].secret;
            picUrl = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_z.jpg";
            pics.push(picUrl);
        };
    }
    function pupulate(pics){
        for(var j=0; j<pics.length; j++){
            list = document.getElementById('list');
            for(var j = 0; j<pics.length; j++){
                list.innerHTML = list.innerHTML + "<li class= 'active' id='img"+[j]+"'><img src='" + pics[j] + "' /></li>";
            }
        }
    }
    function removeActiveAddCurrent(items){
        items.classList.remove('active');
        items.classList.add('current');
    };
    function removeCurrentAddActive(items){
        items.classList.remove('current');
        items.classList.add('active');
    }
    window.onload = loadPics();
})();