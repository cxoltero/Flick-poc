(function (angular) {
    'use strict';

    var app = angular.module('flickrPock', []);
    app.service('images', function ($http) {

        this.loadPics = function () {
            return $http.get(_formUrl());

            function _formUrl() {
                var api_key = '74e47a159e15cbcb6139ba9c9df64c13';
                var method = "flickr.photos.search";
                var user_id = "138698049@N03";
                var format = '&format=json';
                var url = "https://api.flickr.com/services/rest" + "?method=" + method + "&api_key=" + api_key + "&user_id=" + user_id + format + '&nojsoncallback=1';
                return url;
            }

        };
        this.createImagesArray = function(data){

            var farm, server, id, title, secret, picUrl, currentPhoto;
            var images = [];

            for(var i = 0; i < data.photos.photo.length; i++) {
                currentPhoto = data.photos.photo[i];
                farm = currentPhoto.farm;
                server = currentPhoto.server;
                id = currentPhoto.id;
                title = currentPhoto.title;
                secret = currentPhoto.secret;
                picUrl = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_z.jpg";
                images.push(picUrl);
            }
            return images;
        };
    });
})(angular);
