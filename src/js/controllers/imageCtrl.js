(function (angular) {
    angular
        .module('flickrPOC')
        .controller('imagesCtrl', imagesCtrl);

    imagesCtrl.$inject = ['images'];

    function imagesCtrl(images) {
        var vm = this;// jshint ignore:line

        vm.getImages = function () {
            images.loadPics()
                .then(function (res) {
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