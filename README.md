# toitoi-cms

Client facing standalone SPA of the CMS

## Use of ES6 features

The following features should be __avoided__, *including* in React code:

* __ES6 Modules:__ No loader specification exists yet, thus nothing implements them yet, and they don't really exist. Babel just compiles them down to CommonJS modules - which, at best, is incomplete and misleading, and at worst will break the entire codebase once ES6 Modules are fully specified. Just use CommonJS modules.
* __ES6 Classes:__ These are just syntactic sugar over the prototypical inheritance in Javascript - JS does not have classes, and this syntactic sugar is both limiting and misleading to developers coming from classical languages, as methods are not bound and classes are not immutable. Just use factory functions (eg. `createElement`) instead, when not using JSX. Prototypical inheritance can be accomplished [using Object.create](https://hughfdjackson.com/javascript/prototypes%3A-the-short%28est-possible%29-story/).

## Development setup

You will need to have Node.js and NPM installed. If you don't have those yet, the easiest way is to use `nvm`:

1. Follow the installation instructions [here](https://github.com/creationix/nvm/blob/master/README.markdown).
2. Run `nvm install stable` to install the latest version of Node.js.
3. Run `nvm alias default stable` to set the newly installed Node.js version as your default.

You will also need to install the LiveReload extension for your browser. The instructions for that can be found [here](http://livereload.com/extensions/).

You'll then need to install `gulp` globally:

```
npm install -g gulp
```

And finally, install all dependencies for the project, including development dependencies:

```
npm install
```

To modify the build setup (eg. to add PostCSS plugins), you'll want to edit `gulpfile.js`. It contains further instructions in the comments.

## Development tools

Once you've set it all up, you only need the following two commands:

* __Development mode:__ Run `gulp` - it will automatically watch any changes to the project, recompile where necessary, and reload things in your browser (assuming you have the LiveReload plugin set up). A HTTP server will automatically be started on port 4000, so you can simply navigate to http://localhost:4000/ in your browser.
* __Build mode:__ Run `gulp build` - it will produce minified JS and CSS files in the `public/css/` and `public/js/` folders, then exit.