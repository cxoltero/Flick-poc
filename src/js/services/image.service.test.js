'use strict';
describe('getImagesService', function() {
  var $http;
  var ImgService;

  beforeEach(module('flickrPOC'));

  beforeEach(inject(function(_$http_, _images_) {
    $http = _$http_;
    ImgService = _images_;

  }));

  describe('loadPics', function() {
    describe('stub service call', function() {

      it('should exist', function() {
        expect(ImgService.loadPics).to.exist();
      });

      it('should return a promise', function() {
        expect(ImgService.loadPics().then).to.exist();
      });

      it('should use $http to retrieve data', function() {
        var spy = sinon.spy($http, 'get');
        var method = 'flickr.photos.search';
        var apiKey = '74e47a159e15cbcb6139ba9c9df64c13';
        var userId = '138698049@N03';
        var mockUrl = 'https://api.flickr.com/services/rest?method=' + method + '&api_key=' + apiKey + '&user_id=' + userId + '&format=json&nojsoncallback=1';

        ImgService.loadPics();
        expect(spy).to.have.been.calledWith(mockUrl);
      });

    });
  });

  describe('createImagesArray', function() {
    var sampleJSON = {
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
    var getImages;

    beforeEach(function() {
      getImages = ImgService.createImagesArray(sampleJSON);

    });

    describe('should check the data taken by createdDomElm', function() {
      it('should exist', function() {
        expect(ImgService.createImagesArray).to.exist();
      });

      it('should return an array', function() {
        expect(angular.isArray(getImages)).to.be.true();
      });

      it('should not be undefined', function() {
        expect(getImages).should.not.be.undefined();
      });

      it('should not be null', function() {
        expect(typeof(getImages)).should.not.be.null();
      });

      it('should get the length of the object', function() {
        expect(getImages.length).to.equal(2);
      });

    });

    describe('should create an array with urls inside of it', function() {
      it('should return something', function() {
        expect(typeof(getImages)).to.not.be.null();
      });

      it('should get each url as a string', function() {
        angular.forEach(getImages, function(imgUrl) {
          expect(angular.isString(imgUrl)).to.equal(true);
        });
      });

      it('should concatenate the contents of the given object', function() {

        var farm, server, id, title, secret, picUrl;

        angular.forEach(getImages, function (photoURL, index) {
          var currentPhoto = sampleJSON.photos.photo[index];

          farm = currentPhoto.farm;
          server = currentPhoto.server;
          id = currentPhoto.id;
          title = currentPhoto.title;
          secret = currentPhoto.secret;

          picUrl = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_z.jpg';

          expect(photoURL).to.equal(picUrl);

        });

      });
    });
  });
});
