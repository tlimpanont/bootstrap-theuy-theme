const path = require('path');
const url = require('url');
const glob = require("glob");
const _ = require('lodash');

function getCurrentUrl(request) {
    return request.connection.info.protocol + '://' + request.info.host + request.url.path;
}

module.exports = {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        var distFolder = 'dist';
        var themesConfig = require('../themes.config');

        var promises = [];

        themesConfig.themeDirectoryNames.forEach((themeDir) => {
            promises.push(new Promise((resolve, reject) => {
                glob("**/*", {cwd: path.resolve(__dirname, '../dist', themeDir)}, (er, files) => {
                    if (er) {
                        reject(er);
                    } else {
                        var urls = files.map((file) => getCurrentUrl(request) + distFolder  + '/' + themeDir + '/' + file );
                        var theme = {};
                        theme.name = themeDir;
                        var onlyCSSUrls = urls.filter((url) => {
                            return (path.extname(url) === '.css')
                        });

                        onlyCSSUrls.forEach((url) => {
                            var cssKey = path.extname(url).replace('.', '');
                            theme[cssKey] = url;
                            var folderUrl = url.replace(/\w+\.css/, '');
                            theme['folder'] = folderUrl;
                        });

                        resolve(theme);
                    }
                });
            }));
        });


        Promise.all(promises).then((themes) => {
            var npmInfo = require('../package.json');
            reply({
                version: npmInfo.version,
                repository: npmInfo.repository,
                dist: getCurrentUrl(request) + distFolder,
                themes: themes
            });
        });
    }
};
