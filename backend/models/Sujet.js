const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
   nom_sujet:{type: String, required: true},
   position_forum:{type: Number, required: true},
   creator:{type: String, required: true},
});

module.exports = mongoose.model('sauce', sauceSchema);