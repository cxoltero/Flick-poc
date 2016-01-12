# Flick-poc
This application is intended to be a slideshow to pull images from Flickr and display them as a slideshow to the user.

# Setup
1. Install npm - https://www.npmjs.com/
2. Install bower - http://bower.io/
3. Install a node webserver - `npm install -g http-server`

# Development
1. Clone this repo
2. Run `npm install`
3. Run `bower install`
4. `cd src`
5. Run `http-server` from the root of the project.

# Testing
Run `npm test` to start the Karma test runner and watch the source files.

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
## Phase 5
1. Convert the application to AngularJS, leaving jQuery as a dependency leveraged by Angular.
2. Create AngularJS constructs using a TDD procedure:
 - Service to handle the data retrieval from Flickr
 - Controller to handle view logic
 - Directive for the slide show and slides

**Note:** It's considered best practice to build the app in pieces/components. Meaning that, ideally, we create a service to retrieve the data. Then, create a controller that uses that service to access the data. Finally, a directive is created, which excepts the data now present in the controller, and outputs the appropriate HTML. Each of these pieces should be tested and reviewed before the next is built.

## Phase 6
This phase will introduce the concept of build automation, by using Gulp to add JS / CSS linting.
1. Add [pipeline-validate-js][] and a introduce a `gulp js:lint` task to lint all JS in `src/`
2. Add [pipeline-validate-css][] and a introduce a `gulp css:lint` task to lint all CSS in `src/`
3. Add a third task that runs both tasks, called `gulp build`

[pipeline-validate-js]: https://www.npmjs.com/package/pipeline-validate-js
[pipeline-validate-css]: https://www.npmjs.com/package/pipeline-validate-css
