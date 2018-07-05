const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Athelete = require('../models/athelete_model');

//validator
const {check, validationResult} = require('express-validator/check');

//errors

let get_error = function(msg){
	return {
				"field" : {
					"msg" : msg
			}
		};
}

router.post('/add', 
	[
	check('name').isLength({min :5 , max : 20}).withMessage('Please provide your name (5-20 characters)'),
	check('gender').isIn(['Male','Female','male','female']).withMessage('Please provide gender properly'),
	check('nationality').isLength({min : 1}).withMessage('Please provide nationality'),
	check('sports').custom((item) =>  item.length > 0).withMessage('Please provide at least one sport'),
	check('team').isLength({min : 1}).withMessage('Please provide team association')
	], 

	function(req, res, next){

		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.json({success : false, errors : errors.mapped()});
		}

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
			married : req.body.married
		//image : req.body.image
	});
		Athelete.addAthelete(newAthelete, (err, athelete) => {
			if(err){
				console.log('err in creating athelete : '+ err);
				res.json({success : false, "errors" : get_error('Failed to create a new athelete')});
			} else{
				res.json({success : true, "errors" : get_error('Successfully added an athele')});
			}
		});
	});

router.get('/getAll', function(req, res, next) {
	Athelete.getListOfAtheletes((err, result) => {
		if(err){
			res.json({success : false, "errors" : get_error('Failed to fetch the database')});
		} else{
			res.json({success : true, "errors" : get_error(result)});
		}
	});
});

router.put('/update', 
	[
	check('name').isLength({min :5 , max : 20}).withMessage('Please provide your name (5-20 characters)'),
	check('gender').isIn(['Male','Female','male','female']).withMessage('Please provide gender properly'),
	check('nationality').isLength({min : 1}).withMessage('Please provide nationality'),
	check('sports').custom((item) => _.isArray(item) && item.length > 0).withMessage('Please provide at least one sport'),
	check('team').isLength({min : 1}).withMessage('Please provide team association')
	], 

	function(req, res, next) {

		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.json({errors : errors.mapped()});
		}	

		Athelete.getAtheleteById(req, (err, athelete) => {
			if(err){
				res.json({success : false, "errors" : get_error('Failed to retrieve athelete details')});
			} else{
				athelete.name = req.body.name;
				athelete.dateOfBirth = req.body.dateOfBirth;
				athelete.gender = req.body.gender;
				athelete.nationality = req.body.req.body.nationality;
				athelete.location = req.body.req.body.location;
				athelete.sports = req.body.req.body.sports;
				athelete.association = req.body.req.body.association;
				athelete.team = req.body.req.body.team;
				athelete.about = req.body.req.body.about;
				athelete.interests = req.body.req.body.interests;
				athelete.smm_handles = req.body.req.body.smm_handles;
				athelete.pets = req.body.req.body.pets;
				athelete.alchohol = req.body.req.body.alchohol;
				athelete.married = req.body.req.body.married;
			//athelete.image = req.body.req.body.image;
			
			Athelete.addAthelete(athelete, (err, athelete) => {
				if(err){
					res.json({success : false, "errors" : get_error('Failed to update athelete details')});
				} else{
					res.json({success : true, "errors" : get_error('Successfully updated details')});
				}
			});
		}
	});
	});

module.exports = router;