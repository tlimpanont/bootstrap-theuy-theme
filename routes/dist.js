module.exports = {
    method: 'GET',
    path: '/dist/{param*}',
    handler: {
        directory: {
            path: '.',
            listing: true
        }
    }
};