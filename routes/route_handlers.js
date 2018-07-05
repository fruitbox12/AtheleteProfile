const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Athelete = require('../models/athelete_model');

router.post('/add', function(req, res, next){
	console.log(req.body.name +" : "+req.body.gender);
	let newAthelete = new Athelete({
		name : req.body.name,
		dateOfBirth : req.body.dateOfBirth,
		gender : req.body.gender,
		nationality : req.body.nationality,
		location : req.body.location,
		sports : req.body.sports,
		association : req.body.association,
		team : req.body.team,
		about : req.body.about,
		interests : req.body.interests,
		smm_handles : req.body.smm_handles,
		pets : req.body.pets,
		alchohol : req.body.alchohol,
		mrried : req.body.married
		//image : req.body.image
	});
	Athelete.addAthelete(newAthelete, (err, athelete) => {
		if(err){
			console.log('err in creating athelete : '+ err);
			res.json({success : false, msg : 'Failed to create a new athelete'});
		} else{
			res.json({success : true, msg : 'Successfully added an athele'});
		}
	});
});

router.get('/getAll', function(req, res, next) {
	 Athelete.getListOfAtheletes((err, result) => {
	 	if(err){
	 		res.json({success : false, msg : 'Failed to fetch the database'});
	 	} else{
	 		res.json({success : true, msg : result});
	 	}
	 });
});

router.put('/update', function(req, res, next) {
	Athelete.getAtheleteById(req, (err, athelete) => {
		if(err){
			res.json({success : false, msg : 'Failed to retrieve athelete details'});
		} else{
			athelete.name = req.body.name;
			athelete.dateOfBirth = req.dateOfBirth;
			athelete.gender = req.body.gender;
			athelete.nationality = req.nationality;
			athelete.location = req.location;
			athelete.sports = req.sports;
			athelete.association = req.association;
			athelete.team = req.team;
			athelete.about = req.about;
			athelete.interests = req.interests;
			athelete.smm_handles = req.smm_handles;
			athelete.pets = req.pets;
			athelete.alchohol = req.alchohol;
			athelete.married = req.married;
			//athelete.image = req.image;
			
			Athelete.addAthelete(athelete, (err, athelete) => {
				if(err){
					res.json({success : false, msg : 'Failed to update athelete details'});
				} else{
					res.json({success : true, msg : 'Successfully updated details'});
				}
			});
		}
	});
});

module.exports = router;