# Flick-poc
This application is intended to be a slideshow to pull images from Flickr and display them as a slideshow to the user.

# Setup
1. Install npm - https://www.npmjs.com/
2. Install bower - http://bower.io/
3. Install a node webserver - `npm install -g http-server`

# Development
Run `http-server` from the root of the project

# Objectives
## Phase 1
1. Create a flickr account and upload 5 images
2. Setup an AJAX request to get those images from Flickr
3. Display images on the page, with left and right arrows to go previous / next

## Phase 2
1. Use bower to install jQuery
2. Replace all DOM interaction / event handling / Ajax / etc with jQuery 
3. Use a lightbox plugin to display the slideshow

## Phase 3
1. Use bower to install Bootstrap
2. Style the app using Bootstrap CSS
3. Use Bootstrap classes to create three different display styles:
 - 2 columns for mobile
 - 4 columns for desktop
 - 12 columns for wide screens

## ~~Phase 4~~ Abandoned*
1. ~~Install and configure the [QUnit Testing framework](https://qunitjs.com/)~~
2. ~~Create a separate HTML file (`tests.html`) to display test results~~
3. ~~Write unit tests for the jQuery logic~~

*This Phase was abandoned due to QUnit shortcomings. Moving to a Karma/Mocha/Chai setup

## Phase 4
1. Use npm to install [Karma](http://karma-runner.github.io/0.13/index.html), [Mocha](https://mochajs.org/), and [Chai](http://chaijs.com/)
2. Create the basic test infrastructure
3. Use `package.json` to implement a `npm test` task which will run the Karma tests. See the [npm-scripts docs](https://docs.npmjs.com/misc/scripts) for details
4. Create a simple test to verify the suite runs properly.
Example:
```
it('should pass', function(){
  expect(true).to.equal(true);
});
```

