const mongoose = require('mongoose');
/////////////// à suprimer ///////////////////////
const sauceSchema = mongoose.Schema({
   id_user:{type: Number, required: true},
   name_user:{type: String, required: true},
   message:{type: String, required: false, default: ' '},
   media:{type: String, required: false, default: ' '},
   date:{type: String, required: true},
   position_sujet:{type: Number, required: true},
   position_forum:{type: Number, required: true},
});

module.exports = mongoose.model('sauce', sauceSchema);