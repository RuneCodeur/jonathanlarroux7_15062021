const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true},
    status: {type: String, required: true},
    mail: { type: String, required: true, unique: true},
    mdp: { type: String, required: true}
 //model utilisateur
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);