'use strict';

const hapi = require('hapi');
const inert = require('inert');
const path = require('path');
const url = require('url');
const glob = require("glob");
const _ = require('lodash');
var exec = require('child_process').exec;

// Create a server with a host and port
const server = new hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'dist')
            }
        }
    }
});

server.register(inert);


server.connection({
    port: (process.env.PORT || 5000),
    routes: {
        cors: true
    }
});

function getCurrentUrl(request) {
    return request.connection.info.protocol + '://' + request.info.host + request.url.path;
}

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        var distFolder = 'dist';
        var themesConfig = require('./themes.config.json');

        var promises = [];

        themesConfig.themeDirectories.forEach((themeDir) => {
            promises.push(new Promise((resolve, reject) => {
                glob("**/*", {cwd: path.resolve(__dirname, distFolder, themeDir)}, (er, files) => {
                    if (er) {
                        reject(er);
                    } else {

                        var urls = files.map((file) => getCurrentUrl(request) + distFolder  + '/' + themeDir + '/' + file );
                        var theme = {};
                        theme.name = themeDir;
                        var onlyExtensionUrls = urls.filter((url) => {
                            return (path.extname(url))
                        });
                        onlyExtensionUrls.forEach((url) => {
                            theme[path.extname(url).replace('.', '')] = url
                        });
                        resolve(theme);
                    }
                });
            }));
        });


        Promise.all(promises).then((themes) => {
            exec('npm info --json', function (err, out) {
                var npmInfo = JSON.parse(out);
                reply({
                    version: _.last(npmInfo.versions),
                    repository: npmInfo.repository,
                    dist: getCurrentUrl(request) + distFolder,
                    themes: themes
                })
            });

        });
    }
});


server.route({
    method: 'GET',
    path: '/dist/{param*}',
    handler: {
        directory: {
            path: '.',
            listing: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
