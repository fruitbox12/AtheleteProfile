const mongoose = require('mongoose');
const config = require('../config/database');

const athleteSchema = mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: false },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  location: { type: String, required: false},
  sports:  [{ type: String, required: true }],
  association: { type: String, required: false},
  team: { type: String, required: true},
  about: { type: String, required: false},
  interests: [{ type: String, required: false}],
  smm_handles: [{ type: String, required: false}],
  pets: { type: Boolean, required: false},
  alchohol: { type: Boolean, required: false},
  married: { type: Boolean, required: false}
  //image: { type: String, required: false}
});

const Athelete = module.exports = mongoose.model('Athelete', athleteSchema);

/*module.exports = {
  Athlete: mongoose.model('Athlete', athleteSchema)
}*/

module.exports.addAthelete = function(athelete, cb){
	athelete.save(cb);
}

module.exports.getListOfAtheletes = function(cb){
	Athelete.find(cb);
}

module.exports.getAtheleteById = function(req, cb){
	Athelete.findById({_id : req.body._id} ,cb);
}