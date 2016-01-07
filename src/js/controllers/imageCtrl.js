'use strict';

(function (angular) {
    angular
        .module('flickrPOC')
        .controller('imagesCtrl', imagesCtrl);

    imagesCtrl.$inject = ['images'];

    function imagesCtrl(images) {
        /* jshint validthis: true */
        var vm = this;

        vm.getImages = function () {
            images.loadPics()
                .then(function (res) {
                    //console.log('this is not from test '+ res);
                    vm.images = res;
                    return vm.images;
                })
                .catch(
                    function(err){
                        console.error('Error loading images ', err.status, err.data);
                    })
                .finally(function () {
                    console.log("finally finished");
                });

        };
        function activate(){
            vm.getImages();
        }

        //activate();
    }

})(angular);