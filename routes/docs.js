module.exports = {
    method: 'GET',
    path: '/docs',
    handler: (request, reply) => {
        reply.view('index');
    }
};