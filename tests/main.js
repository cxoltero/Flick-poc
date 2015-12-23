//Pseudocode for entire app

//one function will put together the url to connect to api
function formUrl(){
    var api_key = '74e47a159e15cbcb6139ba9c9df64c13';
    var method = "flickr.photos.search";
    var user_id = "138698049@N03";
    var format = '&format=json';
    return = "https://api.flickr.com/services/rest"+"?method="+method+"&api_key="+api_key+"&user_id="+user_id+format+'&nojsoncallback=1';
}