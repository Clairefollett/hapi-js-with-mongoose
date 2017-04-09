const Boom = require('boom');
const Joi = require('joi');
const Dog = require('../models/dogs');

module.exports = exports = function (server) {
    console.log('loading event routes');
    exports.create(server)
};

//creates new event in the datastore
exports.create = function (server) {
    var dog;

    server.route({
        method: 'POST',
        path: '/dogs',
        handler: function (request, reply) {

            dog = new Dog();
            dog.name = request.payload.name;
            dog.breed = request.payload.breed;
            dog.age = request.payload.age;

            dog.save(function (err) {
                if (!err) {
                    reply(dog).created('/dogs/' + dog._id)
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err)))
                }
            });

        }
    });
};

function getErrorMessageFrom(err) {
    const errorMessage = '';

    if (err.errors) {
        for (var prop in err.erros) {
            if(err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }
    } else {
        errorMessage = err.message;
    }
    return errorMessage;
}