(function() {

    function loadPics() {
        //supplied values from flickr
        var api_key = '74e47a159e15cbcb6139ba9c9df64c13';
        var secret = 'c73c5dcbac8e4a96';
        var method = "flickr.photos.search";
        var user_id = "138698049@N03";
        var format = '&format=json';
        var url = "https://api.flickr.com/services/rest"+"?method="+method+"&api_key="+api_key+"&user_id="+user_id+format+'&nojsoncallback=1';

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //make an empty array
                var pics = [];

                //parse request to json
                var myResp = JSON.parse(xmlhttp.response);
                //console.log(myResp);

                for(var i=0; i< myResp.photos.photo.length; i++){
                    var farm = myResp.photos.photo[i].farm;
                    var server = myResp.photos.photo[i].server;
                    var id = myResp.photos.photo[i].id;
                    var title = myResp.photos.photo[i].title;
                    var secret = myResp.photos.photo[i].secret;
                    var picUrl = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_z.jpg";

                    //add each picture url to the pics array
                    pics.push(picUrl);

                }
                for(var i=0; i<pics.length; i++){
                    var list = document.getElementById('list');
                    var img = '';
                    for(var i = 0; i<pics.length; i++){
                        list.innerHTML = list.innerHTML + '<li class='+'active'+ ' id=img'+[i]+'><img src=' + pics[i] + ' /></li>';
                    }
                }
                var items = document.getElementById('img0');
                items.classList.remove('active');
                items.classList.add('current');

                getCarousel();
            }
        };

        xmlhttp.open("Get", url, true);
        xmlhttp.send();



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
            alert(direction);
            //counter = counter + counter;
            //console.log(direction);
            //if(direction === -1 && counter < 0) {
            //    counter = amount -1;
            //}
            //else if(direction === 1 && !items[counter]){
            //    counter = 0;
            //    console.log(counter);
            //}
            //current = items[counter];
            //current.classList.add('current');
        }
        next.addEventListener("click", function(event){
            navigate(1);
        });
        prev.addEventListener("click", function(event){
            navigate(0);
        });
        navigate(0);
    };

    function execute(){
        loadPics();
    }
    execute();

})();