'use strict';

const Hapi = require('hapi');
const path = require('path');

var plugins = [
    require('vision'),
    require('inert')
];

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'dist')
            }
        }
    }
});

server.connection({
    port: (process.env.PORT || 5000),
    routes: {
        cors: true
    }
});


server.register(plugins, (err) => {

    if (err) {
        console.log("Failed to load plugins.");
    }

    server.views({
        engines: {jade: require('jade')},
        path: 'routes/views',
        relativeTo: __dirname,
        compileOptions: {
            pretty: true
        }
    });

    server.route(require('./routes/index'));
    server.route(require('./routes/dist'));
    server.route(require('./routes/docs'));

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });

});


