'use strict';

let webpack = require(webpack),
    path = require(path);

module.exports = {
    "entry": "./src/scripts/main",
    "output": {
        "filename": "bundle.js",
        "path": path.resolve(__dirname, "dist"),
        "publicPath": "/assets/"
    }
};