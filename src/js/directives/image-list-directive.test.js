'use strict';

describe('Image List Directive', function () {

  var $rootScope;
  var scope;
  var $compile;
  var $log;

  var defaultTemplate = '<div data-images-list data-images="mockImages"></div>';
  var badArrayTemplate = '<div data-images-list data-images="mockErrorArray"></div>';
  var errorTemplate = '<div data-images-list></div>';
  var noArrayTemplate = '<div data-images-list data-images="\'myimages\'"></div>';

  beforeEach(module('flickrPOC'));

  beforeEach(inject(function (_$rootScope_, _$compile_, _$log_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;

    $log = _$log_;

    scope = $rootScope.$new();

    scope.mockImages = [
        "https://farm6.staticflickr.com/5764/23780914905_0eb2a77a55_z.jpg",
        "https://farm2.staticflickr.com/5734/23780344905_0eb2a77a55_z.jpg",
        "https://farm3.staticflickr.com/5724/12345664905_0eb2a77a55_z.jpg"
    ];

    scope.mockErrorArray = [{}, {}];

  }));

  function compileDirective(template, scope) {
      var elm = angular.element(template);
      $compile(elm)(scope);
      scope.$apply();
      return elm;
  }

  describe('Error Handling', function () {
      var spy, elm;

      beforeEach(function () {
          spy = sinon.spy($log, 'error');
      });

      it('should throw a "Images List Failed! No images provided." error when no data is provided', function () {
          elm = compileDirective(errorTemplate, scope);
          expect(spy).to.have.been.calledWith('Images List Failed! No images provided.');
      });

      it('should throw a "Images List Failed! Please provide an array." when NOT provided an array', function () {
          elm = compileDirective(noArrayTemplate, scope);
          expect(spy).to.have.been.calledWith('Images List Failed! Please provide an array.');
      });

      it('should throw an error if array does NOT contain all strings', function () {
          elm = compileDirective(badArrayTemplate, scope);
          expect($log.error).to.have.been.calledWith('Images List Failed! Invalid image URL.');
      });
  });

  describe('DOM Output', function () {

      it('should create a UL tag', function () {
          var elm = compileDirective(defaultTemplate, scope);
          expect(elm.find('ul').length).to.equal(1);
      });

      it('should create a LI for each image in the images array', function () {
          var elm = compileDirective(defaultTemplate, scope);
          expect(elm.find('ul li').length).to.equal(scope.mockImages.length);
      });

      it('should create a A within the LI for each image', function () {
          var elm = compileDirective(defaultTemplate, scope);
          expect(elm.find('ul li a').length).to.equal(scope.mockImages.length);
      });

      it('should set a HREF attribute for each a that matches the path in the array', function () {
          var elm = compileDirective(defaultTemplate, scope);
          var imgUrl;

          angular.forEach(scope.mockImages, function(url, index){
            imgUrl = elm.find('ul li a').eq(index);
            expect(imgUrl.attr('href')).to.equal(url);
          });

      });

      it('should set a lightbox1 databox attribute for each a that matches the path in the array', function () {
          var elm = compileDirective(defaultTemplate, scope);
          var ligthbox;

          angular.forEach(scope.mockImages, function(url, index){
            ligthbox = elm.find('ul li a').eq(index);
            expect(ligthbox.attr('data-lightbox')).to.equal('image-set');
          });

      });

      it('should create a IMG within the A for each image', function () {
          var elm = compileDirective(defaultTemplate, scope);
          expect(elm.find('ul li img').length).to.equal(scope.mockImages.length);
      });

      it('should set a SRC attribute for each IMG that matches the path in the array', function () {
          var elm = compileDirective(defaultTemplate, scope);
          var img;

          angular.forEach(scope.mockImages, function(url, index){
            img = elm.find('ul li img').eq(index);
            expect(img.attr('src')).to.equal(url);
          });

      });

      it('should set a class of img-responsive for each IMG that matches the path in the array', function () {
          var elm = compileDirective(defaultTemplate, scope);
          var imgClass;

          angular.forEach(scope.mockImages, function(url, index){
            imgClass = elm.find('ul li img').eq(index);
            expect(imgClass.attr('class')).to.equal('img-responsive');
          });

      });

  });

});
