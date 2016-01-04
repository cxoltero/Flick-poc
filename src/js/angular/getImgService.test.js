describe('getImagesService', function(){
    'use strict';

    var $http;
    var ImgService;

    beforeEach(module('flickrPock'));

    beforeEach(inject(function(_$http_, _images_){
        $http = _$http_;
        ImgService = _images_;
    }));

    describe('loadPics', function(){
        describe('stub service call', function(){
            it('should exist', function(){
                expect(ImgService.loadPics).to.exist();
            });
            it('should use $http to retrieve data', function(){
                var spy = sinon.spy($http, 'get'); /*global describe:true*/
                var method = "flickr.photos.search";
                var api_key = '74e47a159e15cbcb6139ba9c9df64c13';
                var user_id = "138698049@N03";
                var mockUrl = 'https://api.flickr.com/services/rest?method=' + method + '&api_key='+ api_key + '&user_id=' + user_id + '&format=json&nojsoncallback=1';

                ImgService.loadPics();
                expect(spy).to.have.been.calledWith(mockUrl);
            });

            it('should return a promise', function(){
               expect(ImgService.loadPics().then).to.exist();
            });
        });
    });
    describe('createImagesArray', function(){
        var sampleJSON = {contentType: "text/json",
            status: "success",

            photos: {
                photo: [
                    {
                        farm: 6,
                        id: "23780914905",
                        isfamily: 0,
                        isfriend: 0,
                        ispublic: 1,
                        owner: "138698049@N03",
                        secret: "0eb2a77a55",
                        server: "5764",
                        title: ""
                    },
                    {
                        farm: 1,
                        id: "23698470321",
                        isfamily: 0,
                        isfriend: 0,
                        ispublic: 1,
                        owner: "138698049@N03",
                        secret: "1d4dc255d0",
                        server: "693",
                        title: ""
                    }
                ]
            }


    };

        describe('should check the data taken by createdDomElm', function(){
            var getImages = function(){
                return ImgService.createImagesArray(sampleJSON);
            };

            it('should exist', function(){
                expect(ImgService.createImagesArray).to.exist();
            });
            it('should return an array', function(){
                assert(Array.isArray(getImages()));
            });
            it('should not be undefined', function(){
                expect(getImages()).should.not.be.undefined();
            });
            it('should not be null', function(){
                expect(typeof(getImages())).should.not.be.null();
            });
            it('should get the length of the object', function(){
                expect(getImages().length).to.equal(2);
            });
        });

        describe('should create an array with urls inside of it', function(){
            it('should return something', function(){
                expect(typeof(ImgService.createImagesArray(sampleJSON))).to.not.be.null();
            });
            it('should get each url as a string', function(){
                var picsArray = ImgService.createImagesArray(sampleJSON);
                for(var i = 0; i < picsArray.length; i++) {
                    assert(typeof(picsArray[i], "string"), 'URL is a string');
                }
            });
            it('should concatenate the contents of the given object', function() {
                var createImagesArray = function (data) {
                    var farm, server, id, title, secret, picUrl, currentPhoto;
                    var images = [];

                    for (var i = 0; i < data.photos.photo.length; i++) {
                        currentPhoto = data.photos.photo[i];
                        farm = currentPhoto.farm;
                        server = currentPhoto.server;
                        id = currentPhoto.id;
                        title = currentPhoto.title;
                        secret = currentPhoto.secret;
                        picUrl = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_z.jpg";
                        images.push(picUrl);
                        assert(images[i], "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_z.jpg");
                    }
                };
                createImagesArray(sampleJSON);
            });
        });

    });
});


/*
DIRECTIVE
Accept a list of photos
Generate URL for each photo
Create a UL to house list
Create a LI for each photo
Each photo has click event
** When photo clicked, open lightbox (check if lightbox class is applied)**
 */