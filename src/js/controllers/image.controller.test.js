'use strict';

describe('imagesCtrl', function () {
  var $rootScope, $controller, images, vm, $q, mockImageArray, $log, sampleJSON;

  sampleJSON = {
    contentType: 'text/json',
    status: 'success',
    photos: {
      photo: [
        {
          farm: 6,
          id: '23780914905',
          isfamily: 0,
          isfriend: 0,
          ispublic: 1,
          owner: '138698049@N03',
          secret: '0eb2a77a55',
          server: '5764',
          title: ''
        },
        {
          farm: 1,
          id: '23698470321',
          isfamily: 0,
          isfriend: 0,
          ispublic: 1,
          owner: '138698049@N03',
          secret: '1d4dc255d0',
          server: '693',
          title: ''
        }
      ]
    }
  };
  mockImageArray = ['https://farm6.staticflickr.com/5764/23780914905_0eb2a77a55_z.jpg', 'https://farm1.staticflickr.com/693/23698470321_1d4dc255d0_z.jpg'];

  beforeEach(module('flickrPOC'));

  beforeEach(module(function ($provide) {
    $provide.service('images', function ($q) {
      this.loadPics = sinon.stub().returns($q.resolve(sampleJSON));
      this.createImagesArray = sinon.stub().returns($q.resolve(mockImageArray));
    });

  }));

  beforeEach(inject(function (_$rootScope_, _$controller_, _images_, _$q_, _$log_) {
    $rootScope = _$rootScope_.$new();
    $controller = _$controller_;
    images = _images_;
    $q = _$q_;
    $log = _$log_;
    vm = $controller('imagesCtrl');

    $rootScope.$apply();

  }));

  describe('imagesCtrl', function () {
    describe('Sucessful call to api', function () {
      describe('return flickr images from object from http call', function () {
        var imageArray;

        beforeEach(function () {
          imageArray = vm.images.$$state.value;
        });

        it('should return an array of images', function () {
          expect(angular.isArray(imageArray)).to.equal(true);
        });

        it('Should have all strings', function () {
          angular.forEach(imageArray, function (value) {
            expect(angular.isString(value)).to.equal(true);
          });
        });

        it('Each strings must have an http address', function () {
          angular.forEach(imageArray, function (value) {
            expect(value.substr(0, 8)).to.equal('https://');
          });
        });

        it('Each strings must have an flickr address', function () {
          angular.forEach(imageArray, function (value) {
            expect(value).to.contain('.staticflickr.com');
          });
        });

        it('Each strings must have an flickr address', function () {
          angular.forEach(imageArray, function (value) {
            expect(value.substr(-4, 4)).to.match(/^\.|\.jpg$|\.gif$|.png$/);
          });
        });

      });

    });

    describe('Error from connecting to api', function () {
      var errorObject = {'stat': 'fail', 'code': 2, 'message': 'Unknown user'};

      beforeEach(function () {
        images.loadPics
            .returns($q.reject(errorObject));
      });

      it('Register a log error', function () {
        var spy = sinon.spy($log, 'error');
        vm = $controller('imagesCtrl');

        $rootScope.$apply();

        expect(spy).to.have.been.called();
      });

    });
  });
});

