const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Table = require('../../models/Table');

//.@route ->-> POST api/admin/createTimetable 
//.@description ->-> Put Timetable
//.@access ->->Public

router.post('/createTimetable', async (req, res) => {
	const table = new Table({
    sectionName: req.body.sectionName,
    timeTable: [{
    	dayName: req.body.dayName,
    	slots: [{
    		subject: req.body.subject,
    		teacherTeaching: req.body.teacherTeaching,
    		startTime: req.body.startTime,
    		endTime: req.body.endTime
    	}]
    	}]
	});
	try{
		const saveTable = await table.save()
		res.json(saveTable);
	}
	catch(err){
		res.json({message: err});
	}
});

//.@route ->-> POST api/admin/createTimetable/section 
//.@description ->-> Put Timetable
//.@access ->->Public

router.post('/createTimetable/:sectionName', async (res, req) => {
	try{
		const table = await Table.findById(req.params.sectionName);
		res.json(table);
	}
	catch(err){
		res.json({message: err});
	}
});

//.@route ->-> GET  api/admin/Timetable
//.@description ->-> View Timetable
//.@access ->-> Public

router.get('/Timetable', async (req, res) => {
	try{
		const table = await Table.find();
		res.json(tables);
	}
	catch(err){
		res.status(404).json({message: err});
	}
})

//.@route ->-> GET  api/admin/Timetable/:day
//.@description ->-> View Timetable
//.@access ->-> Public

router.get('/Timetable/:id', async (req, res) => {
	try{
		const table = await Table.findById(req.params.id);
		res.json(table);
	}
	catch(err){
		res.json({message: err});
	}
});

//.@route ->-> DELETE api/admin/deleteTimetable
//.@description ->-> Delete Timetable
//.@access ->-> Public


router.delete('/deleteTimetable/:id', async (res, req) => {
	try{
		const removeSection = await Table.remove({_id: req.params.id});
		res.json(removeSection);
	}
	catch(err){
		res.json({message: err});
	}
});

//.@route ->-> POST api/admin/updateTimetable
//.@description ->-> Update Timetable
//.@access ->-> Public


router.patch('/updateTimetable/:id', async (res, req) => {
	try{
		const updatedTable = await Table.updateOne(
			{_id: req.params.id},
			{$set: {timeTable: req.body.timeTable}}
		);
		res.json(updatedTable);
	}
	catch(err){
		res.json({message: err});
	}
});


module.exports = router;
