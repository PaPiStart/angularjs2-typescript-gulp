(function(global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:core/bundles/core.umd.js',
            '@angular/common': 'npm:common/bundles/common.umd.js',
            '@angular/compiler': 'npm:compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:http/bundles/http.umd.js',
            '@angular/router': 'npm:router/bundles/router.umd.js',
            '@angular/forms': 'npm:forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);