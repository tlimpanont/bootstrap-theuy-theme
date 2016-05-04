var path = require('path');

module.exports = {
    themeDirectoryNames: [
        'darkly',
        'flatly',
        'default',
        'ugly'
    ],
    getThemeSrcFile(theme) {
        return path.resolve(__dirname , 'themes/_' + theme + '.scss');
    },
    getThemeFontFiles(theme) {
        return path.resolve(__dirname, 'themes/' + theme + '/fonts/**/*');
    },
    getThemeDestPath(theme) {
        return path.resolve(__dirname, 'dist/' + theme + '/');
    },
    getBootstrapFontFiles() {
        return path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/fonts/**/*');
    },
    getThemeFontDest(theme) {
        return path.resolve(__dirname, 'dist/' + theme + '/fonts/');
    },
    getDistFolderSrc() {
        return path.resolve(__dirname, 'dist');
    },
    getThemeSassWatch() {
        return path.resolve(__dirname,'themes/**/*.scss');
    },
    getRouteViewsWatch() {
        return path.resolve(__dirname, 'routes/views/**/*.jade');
    }
};
