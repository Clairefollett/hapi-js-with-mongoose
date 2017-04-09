const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const dogSchema = new Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: String, required: true } 
});

module.exports = Mongoose.model('Dog', dogSchema);