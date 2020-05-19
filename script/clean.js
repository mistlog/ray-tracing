const del = require('delete');

del.sync([
    'src/**/*.js.js',
    'src/**/*.js.ts',
    'src/**/*.js',
    'src/**/*.jsx'
]);

del.sync([
    "docs/css",
    "docs/js",
    "docs/src",
    "docs/illustrations/**/build",
    "docs/illustrations/**/*.png",
    "docs/dependencies.json",
    "docs/README.html"
], { force: true });