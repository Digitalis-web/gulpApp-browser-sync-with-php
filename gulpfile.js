//import everything
var g               = require('gulp');
var httpProxy       = require('http-proxy');
var browserSync     = require('browser-sync');
var connect         = require('gulp-connect-php');

//browserSync (reload browser then changes are made in app folder)
g.task('default', function () {
    connect.server({
        port: 8079,
        base: 'app',
        open: false
    });

    var proxy   = httpProxy.createProxyServer({});
    var reload  = browserSync.reload;

    browserSync({
        notify: false,
        port  : 8079,
        server: {
            baseDir   : ['app'],
            middleware: function (req, res, next) {
                var url = req.url;

                if (!url.match(/^\/(styles)\//)) {
                    proxy.web(req, res, { target: 'http://localhost:8079' });
                } else {
                    next();
                }
            }
        }
    });

    g.watch([
        'app/*.html',
        'app/*.php',
        'app/js/**/*.js',
        'app/img/**/*'
    ]).on('change', reload);

});