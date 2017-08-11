const gulp = require("gulp"),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    yargs = require('yargs').argv,
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    ts = require("gulp-typescript"),
    // browserify = require("browserify"),
    // source = require('vinyl-source-stream'),
    // tsify = require("tsify"),
    gulpStreamToPromise = require('gulp-stream-to-promise');


var paths = {
    html: ['src/**/*.html'],
    css: ['src/**/*.css'],
    less: ['src/**/*.css'],
    images: ['src/images/**/*'],
    ts: ['src/**/*.ts'],
    scripts: ['src/**/*.js'],
    lib: [
        'node_modules/core-js/client/shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/zone.js/dist/zone.min.js',
        'node_modules/@angular/**/bundles/**'
    ]
}
var option = {
    base: 'src'
}
var dist = 'dist' // 根目录
gulp.task("clean", () => {
    return gulp.src('dist/*', {
            read: false
        })
        .pipe(clean())
});

//是否压缩
var isMini = yargs.m ? true : false;

gulp.task("html", () => {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        ignoreCustomFragments: [
            /\{\%[\s\S]*?\%\}/g,
            /\{\{[\s\S]*?\}\}/g
        ]
    };
    gulp.src(paths.html, option)
        .pipe(changed(dist))
        .pipe(gulpIf(isMini, htmlmin(options)))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('less', () => {
    gulp.src(paths.less, option)
        .pipe(changed(dist))
        .pipe(less())
        .pipe(autoprefixer())
        .on('error', (e) => {
            console.log(e)
        })
        .pipe(gulpIf(isMini, minifycss()))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', () => {
    gulp.src(paths.css, option)
        .pipe(changed(dist))
        .pipe(gulpIf(isMini, minifycss()))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('images', () => {
    gulp.src(paths.images, option)
        .pipe(changed(dist))
        .pipe(gulpIf(isMini, imagemin()))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function() {
    gulp.src(paths.scripts, option)
        .pipe(changed(dist))
        .on('error', function(e) {
            console.log(e)
        })
        .pipe(gulpIf(isMini, uglify()))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('lib', () => {
    var stream1 = gulp.src('node_modules/rxjs/**/*.js')
        .pipe(gulp.dest(`${dist}/lib/rxjs`));

    var stream2 = gulp.src(paths.lib)
        .pipe(gulp.dest(`${dist}/lib`));

    return Promise.all([
        gulpStreamToPromise(stream1),
        gulpStreamToPromise(stream2)
    ]);
});

gulp.task('ts', () => {
    return gulp.src(paths.ts)
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(gulpIf(isMini, uglify()))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserify', () => {
    // return browserify({
    //         basedir: '.',
    //         debug: true,
    //         entries: ['src/app/main.ts'],
    //         cache: {},
    //         packageCache: {}
    //     })
    //     .plugin(tsify)
    //     .bundle()
    //     .pipe(source('main.js'))
    //     .pipe(gulp.dest(dist));
});

gulp.task('compile', ['lib', 'less', 'css', 'images', 'html', 'browserify', 'scripts', 'ts']);

gulp.task('watchServer', () => {
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.scripts, ['scripts']);
})

gulp.task('webserver', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        ui: false,
        port: 3000
    });
    if (yargs.w) {
        gulp.start('watchServer');
    }
});



gulp.task("default", ['compile'], () => {
    if (yargs.s) {
        gulp.start('webserver');
    }
    console.log('defalut')
});