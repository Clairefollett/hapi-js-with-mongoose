const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 5006 });
const Mongoose = require('mongoose');
const routes = require('./routes');

Mongoose.connect('mongodb://localhost/hapi-with-mongoose');

const rootHandler = function(request, reply) {
    reply({ message: 'Welcome to my hapi REST API!'})
}

//setting the root route:
server.route({
    method: 'GET',
    path: '/',
    handler: rootHandler
});

routes.init(server);


server.start(function () {
    console.log('server is running at: ', server.info.url)
});