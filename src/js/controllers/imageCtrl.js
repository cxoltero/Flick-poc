'use strict';

(function (angular) {
    angular
        .module('flickrPOC')
        .controller('imagesCtrl', imagesCtrl);

    imagesCtrl.$inject = ['images', '$log'];

    function imagesCtrl(images, $log) {
        var vm = this;// jshint ignore:line

        function activate(){
            images.loadPics()
                .then(function (res) {
                    vm.images = images.createImagesArray(res.data);
                    //return vm.images;
                })
                .catch(function(err){
                    $log.error('Error loading images ', err.status, err.data);
                });
        }

        activate();
    }

})(angular);