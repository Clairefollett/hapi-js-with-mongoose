const Boom = require('boom');
const Joi = require('joi');
const Dog = require('../models/dogs');

module.exports = exports = function (server) {
    console.log('loading event routes');
    exports.index(server)
    exports.create(server)
    exports.show(server)
    exports.remove(server)
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

//GET by _id
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/dogs/{id}',
        config: {
            validate: {
                params: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            const filter = {}

            if (request.params.id) {
                filter.id = request.params.id
            }

            Dog.findById(filter, function (err, dog) {
                if (err) {
                    console.log(err)
                    reply(Boom.notFound());
                } else {
                    if (dog.id === filter && dog) {
                        reply(dog)
                    }
                }
            });
        }
    })
};

// exports.remove = function (server) {
    
//     server.route({
//         method: 'DELETE',
//         path: '/dogs/{id}',
//         config: {
//             validate: {
//                 params: {
//                     id: Joi.string().alphanum().min(5).required()
//                 }
//             }
//         },
//         handler: function (request, reply) {
//             Dog.findById(request.params.id, function(err, dog) {
//                 if(!err && dog) {
//                     dog.remove();
//                     reply({ message: "Dog deleted successfully"});
//                 } else if(!err) {
//                     reply(Boom.notFound());
//                 } else {
//                     console.log(err);
//                     reply(Boom.badRequest("Could not delete dog"));
//                 }
//             });
//         }
//     })
// };

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