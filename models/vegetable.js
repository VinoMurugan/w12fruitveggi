//IMPORT MONGOOSE
const mongoose = require('mongoose');
//CREATE DATA
const vegetableSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});
//CREATE YOUR MODEL
const Vegetable = mongoose.model('Vegetable', vegetableSchema);
///EXPORT 
module.exports = Vegetable;