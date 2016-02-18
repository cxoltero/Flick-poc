'use strict';
(function (angular) {
  angular
    .module('flickrPOC')
    .service('images', images);

  images.$inject = ['$http'];

  function images($http) {
    return {
      loadPics: loadPics,
      createImagesArray: createImagesArray
    };

    function loadPics() {
      return $http.get(_formUrl());
      function _formUrl() {
        var apiKey = '74e47a159e15cbcb6139ba9c9df64c13';
        var method = 'flickr.photos.search';
        var userId = '138698049@N03';
        var format = '&format=json';

        return 'https://api.flickr.com/services/rest' + '?method=' + method + '&api_key=' + apiKey + '&user_id=' + userId + format + '&nojsoncallback=1';
      }
    }

    function createImagesArray(data) {
      var farm, server, id, title, secret, picUrl;
      var images = [];

      angular.forEach(data.photos.photo, function (photo) {

        farm = photo.farm;
        server = photo.server;
        id = photo.id;
        title = photo.title;
        secret = photo.secret;
        picUrl = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_z.jpg';

        images.push(picUrl);
      });

      return images;
    }
  }
})(angular);

