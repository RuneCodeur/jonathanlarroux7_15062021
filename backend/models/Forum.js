const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
   nom_sujet:{type: String, required: true}
});

module.exports = mongoose.model('sauce', sauceSchema);