'use strict';

(function (angular) {

  angular
      .module('flickrPOC')
      .directive('imagesList', imagesList);

  imagesList.$inject = ['$log', '$compile'];

  function imagesList($log, $compile) {
    return {
      scope: {},
      restrict: 'EA',
      template: '<ul></ul>',
      controller: ImagesListController,
      controllerAs: 'ImagesList',
      link: linkFunction,
      bindToController: {
        images: '='
      }
    };

    function linkFunction(scope, iElem, iAttrs, controller) {

      if (!controller.images) {
        $log.error('Images List Failed! No images provided.');

      } else if (!angular.isArray(controller.images)) {
        $log.error('Images List Failed! Please provide an array.');

      } else {

        for (var i = 0; i < controller.images.length; i++) {

          if (!angular.isString(controller.images[i])) {
            $log.error('Images List Failed! Invalid image URL.');
            return;
          } else {
            iElem.find('ul').append('<li><a data-lightbox="image-set" href="' + controller.images[i] + '" ><img class="img-responsive" src="' + controller.images[i] + '"/></a></li>');
          }
        }

      }

    }
  }

  ImagesListController.$inject = [];

  function ImagesListController() {
  }

})(angular);