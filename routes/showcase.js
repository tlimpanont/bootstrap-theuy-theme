module.exports = {
    method: 'GET',
    path: '/showcase',
    handler: (request, reply) => {
        reply.view('showcase');
    }
};