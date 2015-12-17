(function(){
function loadPics(){
        //supplied values from flickr
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
