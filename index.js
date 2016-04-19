'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

// Create a server with a host and port
const server = new Hapi.Server({
  connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'dist')
            }
        }
    }
});

server.register(Inert, () => {});

server.connection({
  port: (process.env.PORT || 5000)
});

// Add the route
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
