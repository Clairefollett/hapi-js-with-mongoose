const Boom = require('boom');
const Joi = require('joi');
const Dog = require('../models/dogs');

module.exports = exports = function (server) {
    console.log('loading event routes');
    exports.create(server)
<<<<<<< HEAD

    exports.index(server)
    // exports.show(server)
};

//GET all doggies
exports.index = function (server) {
    
    server.route({
        method: 'GET',
        path: '/dogs',
        handler: function (request, reply) {
            Dog.find({}, function (err, dogs) {
                if (!err) {
                    reply(dogs);
                } else {
                    reply(Boom.badImplementation(err));
                }
            });
        }
    });

=======
>>>>>>> parent of f69b5e0... post and get all working! and it is returning a list with a __v and _id
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