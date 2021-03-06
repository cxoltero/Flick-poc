'use strict';

(function (angular) {

  angular
    .module('flickrPOC')
    .directive('imagesList', imagesList);

  imagesList.$inject = ['$log'];

  function imagesList($log) {
    return {
      scope: {},
      restrict: 'EA',
      template: '<ul class="list-unstyled"></ul>',
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
        _generateListItems();

      }

      scope.$watch(function() {
        return controller.images;
      }, function(newVal, oldVal) {

        if (newVal !== oldVal) {
          _generateListItems();
        }

      });

      function _generateListItems() {

        angular.forEach(controller.images, function (url) {

          if (!angular.isString(url)) {
            $log.error('Images List Failed! Invalid image URL.');
            return;
          } else {
            var imageTag = '<img class="img-responsive single-img" src="' + url + '"/>';
            iElem.find('ul').append('<li class="col-float-fix col-xs-6 col-md-3 col-lg-1"><a data-lightbox="image-set" href="' + url + '" >' + imageTag + '</a></li>');

          }
        });
      }

    }
  }

  ImagesListController.$inject = [];

  function ImagesListController() {

  }

})(angular);