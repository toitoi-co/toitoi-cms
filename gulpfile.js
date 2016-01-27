var path = require("path");
var http = require("http");
var st = require("st");

var gulp = require("gulp");
var rename = require("gulp-rename");

var sass = require("gulp-sass");
var webpackStream = require("webpack-stream");
var webpack = require("webpack");

var livereload = require("gulp-livereload");
var plumber = require("gulp-plumber");

function getPostCSSPlugins() {
	/* To add PostCSS plugins:
	 * 1. `npm install --save-dev $PLUGIN_NAME` (the --save-dev flag is important!)
	 * 2. Add `require("$PLUGIN_NAME")` to the array below.
	 * 3. Double-check plugin documentation to see whether anything needs to be configured.
	 *    The `createWebpackTask` function below is where all Webpack configuration goes.
	 */
	return [
		require("autoprefixer")
	];
}

function startLocalServer() {
	var documentRoot = path.join(__dirname, "./public");
	var port = 4000;

	var middleware = st({
		path: documentRoot,
		index: "index.html",
		cache: false // for some reason, this broke stuff.
	});

	return http.createServer(middleware)
		.listen(port)
		.on("listening", function() {
			console.log("Static server listening on port " + port.toString());
		});
}

function createWebpackTask(options) {
	var options = (options != null) ? options : {};

	return function() {
		var plugins = [];

		if (options.production) {
			var targetFilename = "bundle.min.js";
			plugins.push(new webpack.optimize.UglifyJsPlugin({}))
		} else {
			var targetFilename = "bundle.js";
		}

		// return gulp.src("./src/index.jsx")
		return gulp.src("./src/app.jsx")
			.pipe(plumber())
			.pipe(webpackStream({
				watch: !(options.production),
				module: {
					loaders: [{
						test: /\.jsx?$/,
						exclude: /(node_modules|bower_components)/,
						loader: "babel",
						query: {
							presets: ["react", "es2015"]
						}
					}, {
						test: /\.scss$/,
						exclude: /(node_modules|bower_components)/,
						loader: "style!css!postcss!sass"
					}]
				},
				resolve: {
					extensions: [
						"",
						".web.js", ".js",
						".web.jsx", ".jsx"
					]
				},
				plugins: plugins,
				postcss: getPostCSSPlugins()
			}))
			.pipe(rename(targetFilename))
			.pipe(gulp.dest("./public/js/"));
	}
}

function createSassTask(options) {
	var options = (options != null) ? options : {};

	return function() {
		return gulp.src("./src/scss/**/*")
			.pipe(plumber())
			.pipe(sass({
				outputStyle: (options.production) ? "compressed" : "nested"
			}))
			.pipe(rename(function(path) {
				if (options.production) {
					path.basename += ".min";
				}
			}))
			.pipe(gulp.dest("./public/css/"))
	}
}

gulp.task("serve", function() {
	startLocalServer();
})

gulp.task("webpack", createWebpackTask());

gulp.task("webpack-production", createWebpackTask({
	production: true
}));

gulp.task("sass", createSassTask());

gulp.task("sass-production", createSassTask({
	production: true
}));

gulp.task("watch", function() {
	livereload.listen();
	gulp.watch(["./src/scss/**/*"], ["sass"]);
	gulp.watch(["./public/**/*"], livereload.changed);

	startLocalServer().on("listening", function() {
		livereload.changed("*");
	});
})

gulp.task("default", ["webpack", "watch", "sass"])
gulp.task("build", ["webpack-production", "sass-production"])
