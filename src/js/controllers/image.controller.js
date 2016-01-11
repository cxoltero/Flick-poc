'use strict';

(function (angular) {
    angular
        .module('flickrPOC')
        .controller('imagesCtrl', imagesCtrl);

    imagesCtrl.$inject = ['images', '$log'];

    function imagesCtrl(images, $log) {
        var vm = this;// jshint ignore:line
        vm.images = [];
        vm.name = 'FlickrPOC';

        function activate(){
            images.loadPics()
                .then(function (res) {
                    vm.images = images.createImagesArray(res.data);

                })
                .catch(function(err){
                    $log.error(err.message, err.stat, err.code);

                });
        }

        activate();
    }

})(angular);