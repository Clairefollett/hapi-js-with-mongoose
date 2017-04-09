exports.init = function(server) {
    console.log('loading');

    require('./dogs')(server);
}