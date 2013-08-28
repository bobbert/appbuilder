var mongoose = require('mongoose');

module.exports = function (app) {

    var MarkerSchema = new mongoose.Schema({
        name:     {type: String},                          // user-defined name of map marker
        visible:  {type: Boolean},                         // is marker visible on map?
        userId:   {type: mongoose.Schema.Types.ObjectId},  // the user this marker belongs to
        iconType: {type: String},                          // the marker icon type
        lat:      {type: Number, min:-80.0, max:80.0},     // latitude coordinate
        lon:      {type: Number, min:-180.0, max:180.0}    // longitude coordinate
    });

    return mongoose.model('Marker', MarkerSchema);
}
