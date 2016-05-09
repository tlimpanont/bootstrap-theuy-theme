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
                relativeTo: path.join(__dirname)
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
        engines: {
            'html': {
                module: require('handlebars'),
                compileMode: 'sync'
            }
        },
        relativeTo: __dirname,
        path: 'routes/views',
        layoutPath: 'routes/views/layout',
        partialsPath: 'routes/views/partials',
        compileOptions: { pretty: true },
        layout: 'layout'
    });

    server.route(require('./routes/index'));
    server.route(require('./routes/dist'));
    server.route(require('./routes/showcase'));

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });

});


