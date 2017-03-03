var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var app = express();

var compiler = webpack(config);

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(9000, '127.0.0.1', function(err) {
    err && console.log(err);
});